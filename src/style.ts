import { JSX } from 'solid-js';

export const styleWH100: JSX.CSSProperties = {
	width: '100%',
	height: '100%',
};

export const styleAbsLT0: JSX.CSSProperties = {
	position: 'absolute',
	left: '0',
	top: '0',
};

export const styleBgCheckerboard = (
	color1: string,
	color2: string,
	size = 16
): JSX.CSSProperties => ({
	background: `repeating-conic-gradient(${color1} 0% 25%, ${color2} 25% 50%)`,
	'background-size': `${size}px ${size}px`,
});

export const styleNoTouchAction: JSX.CSSProperties = {
	'touch-action': 'none',
	'-webkit-touch-callout': 'none',
	'-webkit-tap-highlight-color': 'transparent',
	'-webkit-user-select': 'none',
	'-khtml-user-select': 'none',
	'-moz-user-select': 'none',
	'-ms-user-select': 'none',
	'user-select': 'none',
};

const gd = (deg: number) => `hsl(${deg},100%,50%) ${deg}deg`;
export const gradHueConic: string = `conic-gradient(${[0, 120, 240, 360].map(gd).join()})`;
