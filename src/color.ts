import { cross } from './utils';

type Num3 = [number, number, number];

export type RGB = Num3; // r, g, b: 0-255
export type HSL = Num3; // h: 0-360, s, l: 0.0-1.0
export type HSV = Num3; // h: 0-360, s, v: 0.0-1.0

const multConst = (k: number, [a, b, c]: Num3): Num3 => [k * a, k * b, k * c];

export const rgbToGrayscale = ([r, g, b]: RGB): number =>
	r * 0.299 + g * 0.587 + b * 0.114;

export const rgbToHSL = (rgb: RGB): HSL => {
	const [r, g, b] = multConst(1 / 255, rgb),
		v = Math.max(r, g, b),
		c = v - Math.min(r, g, b),
		f = 1 - Math.abs(v + v - c - 1),
		h =
			c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
	return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2];
};

export const rgbToHSV = (rgb: RGB): HSV => {
	const [r, g, b] = multConst(1 / 255, rgb),
		v = Math.max(r, g, b),
		c = v - Math.min(r, g, b),
		h =
			c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
	return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
};

export const hsvToRGB = ([h, s, v]: HSV): RGB => {
	const f = (n: number, k = (n + h / 60) % 6) =>
		v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
	return multConst(255, [f(5), f(3), f(1)]);
};

export const hslToRGB = ([h, s, l]: HSL): RGB => {
	const a = s * cross(l),
		f = (n: number, k = (n + h / 30) % 12) =>
			l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
	return multConst(255, [f(0), f(8), f(4)]);
};

export const hslToHSV = ([h, s, l]: HSL, v = s * cross(l) + l): HSV => [
	h,
	v ? 2 - (2 * l) / v : 0,
	v,
];

export const hsvToHSL = (
	[h, s, v]: HSV,
	l = v - (v * s) / 2,
	m = cross(l)
): HSL => [h, m ? (v - l) / m : 0, l];

export const hslToStyle = ([h, s, l]: HSL): string =>
	`hsl(${h} ${100 * s}%${100 * l}%)`;

export const hsvToStyle = (hsv: HSV): string => hslToStyle(hsvToHSL(hsv));

export const rgbToStyle = (rgb: RGB): string =>
	`rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

export const rgbToHash = (rgb: RGB): string =>
	`#${rgb.map((c) => Math.floor(c).toString(16).padStart(2, '0')).join('')}`;

export const luminance = (rgb: RGB): number => {
	const [r, g, b] = rgb
		.map((c) => c / 255)
		.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2));
	return r * 0.2126 + g * 0.7152 + b * 0.0722;
};

export const contrast = (rgb1: RGB, rgb2: RGB): number => {
	const l1 = luminance(rgb1),
		l2 = luminance(rgb2);
	return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};
