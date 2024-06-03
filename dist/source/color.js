import { cross } from './utils';
const multConst = (k, [a, b, c]) => [k * a, k * b, k * c];
export const rgbToGrayscale = ([r, g, b]) => r * 0.299 + g * 0.587 + b * 0.114;
export const rgbToHSL = (rgb) => {
    const [r, g, b] = multConst(1 / 255, rgb), v = Math.max(r, g, b), c = v - Math.min(r, g, b), f = 1 - Math.abs(v + v - c - 1), h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
    return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2];
};
export const rgbToHSV = (rgb) => {
    const [r, g, b] = multConst(1 / 255, rgb), v = Math.max(r, g, b), c = v - Math.min(r, g, b), h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
    return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
};
export const hsvToRGB = ([h, s, v]) => {
    const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return multConst(255, [f(5), f(3), f(1)]);
};
export const hslToRGB = ([h, s, l]) => {
    const a = s * cross(l), f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return multConst(255, [f(0), f(8), f(4)]);
};
export const hslToHSV = ([h, s, l], v = s * cross(l) + l) => [
    h,
    v ? 2 - (2 * l) / v : 0,
    v,
];
export const hsvToHSL = ([h, s, v], l = v - (v * s) / 2, m = cross(l)) => [h, m ? (v - l) / m : 0, l];
export const hslToStyle = ([h, s, l]) => `hsl(${h} ${100 * s}%${100 * l}%)`;
export const hsvToStyle = (hsv) => hslToStyle(hsvToHSL(hsv));
export const rgbToStyle = (rgb) => `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
export const rgbToHash = (rgb) => `#${rgb.map((c) => Math.floor(c).toString(16).padStart(2, '0')).join('')}`;
export const luminance = (rgb) => {
    const [r, g, b] = rgb
        .map((c) => c / 255)
        .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2));
    return r * 0.2126 + g * 0.7152 + b * 0.0722;
};
export const contrast = (rgb1, rgb2) => {
    const l1 = luminance(rgb1), l2 = luminance(rgb2);
    return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};
