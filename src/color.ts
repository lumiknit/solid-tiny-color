type Num3 = [number, number, number];

export type RGB = Num3; // r, g, b: 0-255
export type HSL = Num3; // h: 0-360, s, l: 0-100
export type HSV = Num3; // h: 0-360, s, v: 0-100

export const rgbToGrayscale = (rgb: RGB): number => {
	return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
};

export const rgbToHsl = (rgb: RGB): HSL => {
	const r = rgb[0] / 255,
		g = rgb[1] / 255,
		b = rgb[2] / 255,
		max = Math.max(r, g, b),
		min = Math.min(r, g, b),
		l = (max + min) / 2,
		delta = max - min;
	const h = delta
		? max === r
			? (g - b) / delta + (g < b ? 6 : 0)
			: max === g
				? (b - r) / delta + 2
				: (r - g) / delta + 4
		: 0;
		return [
			(h + 6) % 6 * 60,
			50 * (l > 0.5 ? delta / (1 - l) : delta / l),
			100 * l,
		];
};

export const hslToRgb = (hsl: HSL): RGB => {
	const h = hsl[0],
		s = hsl[1] / 100,
		l = hsl[2] / 100,
		k = (n: number) => (n + h / 30) % 12,
		a = s * Math.min(l, 1 - l),
		f = (n: number) =>
    	l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

export const hslToHSV = (hsl: HSL): HSV => {
	const s = hsl[1] / 100,
		l = hsl[2] / 100,
		v = l + s * Math.min(l, 1 - l),
		sv = v ? 2 - 2 * l / v : 0;
	return [hsl[0], 100 * sv, 100 * v];
};

export const hsvToHsl = (hsv: HSV): HSL => {
	const s = hsv[1] / 100,
		v = hsv[2] / 100,
		l = v * (2 - s) / 2;
	return [hsv[0], 100 * (l ? (v - l) / Math.min(l, 1 - l) : 0), 100 * l];
};

export const luminance = (rgb: RGB): number => {
	const [r, g, b] = rgb.map((c) => c / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2));
	return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

export const contrast = (rgb1: RGB, rgb2: RGB): number => {
	const l1 = luminance(rgb1),
		l2 = luminance(rgb2);
	return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};
