import stillLife from '#/assets/magazine/artwork-still-life.webp';
import dogs from '#/assets/magazine/dogs-scene.webp';
import mHope02 from '#/assets/magazine/m-hope-02.webp';
import mHope04 from '#/assets/magazine/m-hope-04.webp';
import misterZion from '#/assets/magazine/mister-zion-01.webp';
import nina from '#/assets/magazine/nina-bruneau.webp';
import portrait from '#/assets/magazine/yoann-bonneville.webp';

/** Artist names come from supplied metadata. These are not artwork titles. */
export const HERO_ARTWORK = {
  image: portrait,
  caption: 'Yoann Bonneville · Peinture',
  alt: 'Portrait peint par Yoann Bonneville, traversé de bleu, de rose et de jaune, avec des yeux bleus et une matière en relief.',
} as const;

/** Scene captions describe photographs, without inventing attribution or stock. */
export const GALERIE_IMAGES = [
  {
    image: nina,
    caption: 'Nina Bruneau',
    detail: 'Peinture',
    alt: 'Peinture de Nina Bruneau : un personnage solaire multicolore, entouré de fleurs et de motifs sur fond sombre, bordé de violet.',
  },
  {
    image: stillLife,
    caption: 'Objets en conversation',
    detail: 'Scène photographiée',
    alt: 'Grande figurine peinte bleu nuit, bombes de peinture et pièce d’échecs dorée réunies sur une table.',
  },
  {
    image: dogs,
    caption: 'Deux sculptures et un vrai chien',
    detail: 'Scène photographiée',
    alt: 'Deux sculptures de chiens, l’une blanche et l’autre rouge, sur une table ; un vrai chien blanc les observe depuis un fauteuil.',
  },
] as const;

/** The five supplied prototype works, ordered so Bonneville closes the spiral. */
export const SPIRAL_ARTWORKS = [
  {
    image: mHope02,
    caption: 'M. Hope · Peinture',
    alt: 'Composition de M. Hope avec des chats noirs en relief, des personnages colorés et des motifs dessinés dans un cadre blanc.',
  },
  {
    image: mHope04,
    caption: 'M. Hope · Peinture',
    alt: 'Composition de M. Hope sur fond jaune, avec une figurine blanche, des étoiles et des nuages bleus dans un cadre blanc.',
  },
  {
    image: misterZion,
    caption: 'Mister Zion · Peinture',
    alt: 'Abeille jaune et noire de Mister Zion, avec des ailes blanches, sur un fond bleu et rose couvert de dessins et de lettres.',
  },
  {
    image: nina,
    caption: 'Nina Bruneau · Peinture',
    alt: GALERIE_IMAGES[0].alt,
  },
  HERO_ARTWORK,
] as const;
