export const degToRad: number = Math.PI / 180;
export const clamp = (value: number, min: number, max: number): number =>
	Math.min(Math.max(value, min), max);
export const cross = (v: number) => Math.min(v, 1 - v);
