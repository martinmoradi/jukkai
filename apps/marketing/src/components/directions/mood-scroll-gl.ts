// Raw WebGL background for the /directions/mood-scroll/ comp.
//
// One fullscreen triangle, one fragment shader: ground color + two drifting
// soft blobs + static grain + a scroll-velocity brightness lift. No library:
// the effect needs a quad and six uniforms, so Three.js would be pure bundle
// weight (~170 KB gzip measured on the reference demo).
//
// Fail-open contract (same as home-hero-print-gl): if init fails this returns
// null and the page keeps its CSS fallback ground.

import type { Rgb } from './mood-scroll-config';

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// highp is required: the grain hash's dot product exceeds mediump's fp16
// range (sin(inf) = NaN poisons the frame black on GPUs with real fp16).
const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform vec3 u_ground;
uniform vec3 u_blob1;
uniform vec3 u_blob2;
uniform float u_radius1;
uniform float u_radius2;
uniform float u_strength;
uniform float u_noise;
uniform float u_time;
uniform float u_velocity;
uniform vec2 u_aspect;
uniform float u_roundness;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec3 color = u_ground;
  float t = u_time;

  vec2 c1 = vec2(
    0.50 + sin(t) * 0.13 + sin(t * 1.618) * 0.05,
    0.48 + cos(t * 0.794) * 0.09 + cos(t * 1.272) * 0.03
  );
  vec2 c2 = vec2(
    0.35 + cos(t * 0.927) * 0.11 + cos(t * 1.414) * 0.04,
    0.55 + sin(t * 1.175) * 0.07 + sin(t * 0.618) * 0.03
  );

  // roundness 0 keeps the reference-demo behavior: blobs stretch with the
  // viewport into wide soft washes and no circular rim is ever readable.
  // roundness 1 aspect-corrects them into true circles (denser, spottier).
  vec2 asp = vec2(mix(1.0, u_aspect.x, u_roundness), 1.0);
  float b1 = smoothstep(u_radius1, 0.0, length((v_uv - c1) * asp));
  float b2 = smoothstep(u_radius2, 0.0, length((v_uv - c2) * asp));

  color = mix(color, mix(u_blob1, u_ground, 0.35), b1 * u_strength);
  color = mix(color, mix(u_blob2, u_ground, 0.35), b2 * u_strength);

  color += u_velocity * 0.10;
  color += (hash(v_uv * vec2(1387.13, 947.91)) - 0.5) * u_noise;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

export interface MoodGlFrame {
  ground: Rgb;
  blob1: Rgb;
  blob2: Rgb;
  radius1: number;
  radius2: number;
  strength: number;
  noise: number;
  time: number;
  velocity: number;
  roundness: number;
}

export interface MoodGl {
  render(frame: MoodGlFrame): void;
  resize(): void;
  dispose(): void;
}

const MAX_DPR = 1.5;

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createMoodGl(canvas: HTMLCanvasElement): MoodGl | null {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  });
  if (!gl) return null;

  const vert = compile(gl, gl.VERTEX_SHADER, VERT);
  const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!vert || !frag || !program) return null;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(program, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const uGround = uniform('u_ground');
  const uBlob1 = uniform('u_blob1');
  const uBlob2 = uniform('u_blob2');
  const uRadius1 = uniform('u_radius1');
  const uRadius2 = uniform('u_radius2');
  const uStrength = uniform('u_strength');
  const uNoise = uniform('u_noise');
  const uTime = uniform('u_time');
  const uVelocity = uniform('u_velocity');
  const uAspect = uniform('u_aspect');
  const uRoundness = uniform('u_roundness');

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const width = Math.round(canvas.clientWidth * dpr);
    const height = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.uniform2f(uAspect, width / Math.max(height, 1), 1);
  };
  resize();

  return {
    render(frame) {
      gl.uniform3f(uGround, ...frame.ground);
      gl.uniform3f(uBlob1, ...frame.blob1);
      gl.uniform3f(uBlob2, ...frame.blob2);
      gl.uniform1f(uRadius1, frame.radius1);
      gl.uniform1f(uRadius2, frame.radius2);
      gl.uniform1f(uStrength, frame.strength);
      gl.uniform1f(uNoise, frame.noise);
      gl.uniform1f(uTime, frame.time);
      gl.uniform1f(uVelocity, frame.velocity);
      gl.uniform1f(uRoundness, frame.roundness);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    resize,
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    },
  };
}
