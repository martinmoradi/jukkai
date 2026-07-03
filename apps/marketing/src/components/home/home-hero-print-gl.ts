// Optional WebGL material layer for the hero print stream.
//
// The DOM stream stays the source of truth: GSAP animates the figures, and
// every frame this module reads each print's live rect and opacity, then
// paints the texture at that exact spot on one full-hero canvas. The shader
// adds two distortions on top:
//   - speed smear: prints bend like fabric when the stream rushes or reverses
//   - cursor bulge: the image liquefies away from the pointer
//
// Fail-open contract: if anything in init fails, this module returns null (or
// throws) and the caller keeps the plain DOM images. Deleting this file and
// its call site removes the effect cleanly.

const VERT = `
attribute vec2 a_pos;
uniform vec4 u_rect;
uniform vec2 u_view;
varying vec2 v_uv;
varying vec2 v_px;
void main() {
  v_uv = a_pos;
  vec2 px = u_rect.xy + a_pos * u_rect.zw;
  v_px = px;
  vec2 clip = (px / u_view) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 v_uv;
varying vec2 v_px;
uniform sampler2D u_tex;
uniform float u_alpha;
uniform vec2 u_mouse;
uniform float u_speed;
uniform float u_drag;
uniform vec3 u_fx;
void main() {
  vec2 uv = v_uv;
  uv.y += sin(uv.x * 3.14159) * u_speed;
  uv.x += sin(uv.y * 3.14159) * u_drag;
  float dist = distance(v_px, u_mouse);
  float inf = 1.0 - smoothstep(0.0, u_fx.x, dist);
  vec2 dir = (v_px - u_mouse) / max(u_fx.z, 1.0);
  uv -= dir * inf * inf * u_fx.y;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    discard;
  }
  vec4 c = texture2D(u_tex, uv);
  gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`;

export interface HeroPrintGlItem {
  el: HTMLElement;
  inner: HTMLElement;
  img: HTMLImageElement;
  depth: number;
}

export interface HeroPrintGlFx {
  rippleRadius: number;
  rippleStrength: number;
  smear: number;
  drag: number;
  dragMax: number;
}

type HeroPrintGlPlane = HeroPrintGlItem & {
  tex: WebGLTexture | null;
  baseAlpha: number;
  prevLeft: number;
  vx: number;
};

interface DrawArgs {
  mouse: { x: number; y: number };
  speed: number;
  getAlpha: (plane: HeroPrintGlPlane) => number;
}

export interface HeroPrintGlLayer {
  draw: (args: DrawArgs) => void;
  resize: () => void;
  destroy: () => void;
}

function compile(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
  return shader;
}

export function initHeroPrintGl({
  host,
  items,
  fx,
  canvasClass,
}: {
  host: HTMLElement;
  items: HeroPrintGlItem[];
  fx: HeroPrintGlFx;
  canvasClass: string;
}): HeroPrintGlLayer | null {
  const canvas = document.createElement('canvas');
  canvas.className = canvasClass;
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
  const vert = gl && compile(gl, gl.VERTEX_SHADER, VERT);
  const frag = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const prog = gl && gl.createProgram();
  if (!gl || !vert || !frag || !prog) {
    canvas.remove();
    return null;
  }
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    canvas.remove();
    return null;
  }
  gl.useProgram(prog);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // One unit quad per print, subdivided vertically so the bend stays smooth.
  const ROWS = 24;
  const verts: number[] = [];
  for (let row = 0; row < ROWS; row++) {
    const y0 = row / ROWS;
    const y1 = (row + 1) / ROWS;
    verts.push(0, y0, 1, y0, 0, y1, 1, y0, 1, y1, 0, y1);
  }
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  const vertCount = verts.length / 2;

  const uniform = (name: string) => gl.getUniformLocation(prog, name);
  const U = {
    rect: uniform('u_rect'),
    view: uniform('u_view'),
    alpha: uniform('u_alpha'),
    mouse: uniform('u_mouse'),
    speed: uniform('u_speed'),
    drag: uniform('u_drag'),
    fx: uniform('u_fx'),
  };

  const makeTexture = (img: HTMLImageElement): WebGLTexture | null => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const upload = () =>
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    if (img.complete && img.naturalWidth > 0) {
      upload();
    } else {
      img.addEventListener(
        'load',
        () => {
          gl.bindTexture(gl.TEXTURE_2D, tex);
          upload();
        },
        { once: true },
      );
    }
    return tex;
  };

  // Draw far prints first so near ones paint over them, matching the DOM
  // source order the static frame uses.
  const planes: HeroPrintGlPlane[] = [...items]
    .sort((a, b) => a.depth - b.depth)
    .map((item) => ({
      ...item,
      tex: makeTexture(item.img),
      baseAlpha: parseFloat(getComputedStyle(item.el).opacity) || 1,
      prevLeft: 0,
      vx: 0,
    }));

  let hostRect = host.getBoundingClientRect();
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    hostRect = host.getBoundingClientRect();
    canvas.width = Math.round(hostRect.width * dpr);
    canvas.height = Math.round(hostRect.height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  window.addEventListener('resize', resize);

  const draw = ({ mouse, speed, getAlpha }: DrawArgs) => {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    hostRect = host.getBoundingClientRect();
    gl.uniform2f(U.view, hostRect.width, hostRect.height);
    gl.uniform2f(U.mouse, mouse.x - hostRect.left, mouse.y - hostRect.top);

    for (const plane of planes) {
      const rect = plane.img.getBoundingClientRect();
      if (rect.bottom < hostRect.top || rect.top > hostRect.bottom) continue;
      const alpha = plane.baseAlpha * getAlpha(plane);
      if (alpha <= 0.01) continue;
      gl.uniform4f(
        U.rect,
        rect.left - hostRect.left,
        rect.top - hostRect.top,
        rect.width,
        rect.height,
      );
      // Horizontal flex from the print's own cursor-parallax drag, the same
      // material law as the vertical scroll bend, damped with depth.
      const depthScale = 0.4 + 0.6 * plane.depth;
      plane.vx += (rect.left - (plane.prevLeft || rect.left) - plane.vx) * 0.18;
      plane.prevLeft = rect.left;
      const drag = Math.max(
        -fx.dragMax,
        Math.min(fx.dragMax, plane.vx * fx.drag * depthScale),
      );
      gl.uniform1f(U.alpha, alpha);
      gl.uniform3f(U.fx, fx.rippleRadius, fx.rippleStrength, rect.width);
      gl.uniform1f(U.speed, speed * fx.smear * depthScale);
      gl.uniform1f(U.drag, drag);
      gl.bindTexture(gl.TEXTURE_2D, plane.tex);
      gl.drawArrays(gl.TRIANGLES, 0, vertCount);
    }
  };

  const destroy = () => {
    window.removeEventListener('resize', resize);
    canvas.remove();
  };

  return { draw, resize, destroy };
}
