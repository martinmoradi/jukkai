import stillLife from '#/assets/magazine/artwork-still-life.webp';
import bears from '#/assets/magazine/contrasting-bears.webp';
import portrait from '#/assets/magazine/yoann-bonneville.webp';

/** Descriptive captions, not invented artwork titles or a sales catalogue. */
export const GALERIE_IMAGES = [
  {
    image: portrait,
    caption: 'Yoann Bonneville',
    detail: 'Un visage, mille couleurs',
    alt: 'Portrait peint par Yoann Bonneville, traversé de bleu, de rose et de jaune.',
  },
  {
    image: stillLife,
    caption: 'Un dialogue d’objets',
    detail: 'Regards croisés à la Galerie',
    alt: 'Grande figurine peinte bleu nuit, bombes de peinture et pièce d’échecs dorée réunies sur une table.',
  },
  {
    image: bears,
    caption: 'Yoris & La Pointe',
    detail: 'La couleur prend du volume',
    alt: 'Deux sculptures d’ours : une œuvre multicolore de Yoris et une œuvre bleue et noire de La Pointe.',
  },
] as const;
