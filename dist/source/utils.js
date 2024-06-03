export const degToRad = Math.PI / 180;
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
export const cross = (v) => Math.min(v, 1 - v);
