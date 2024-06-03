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
	'background-image': `conic-gradient(${color1} 0, ${color2} 25%, ${color1} 25%, ${color1} 50%, ${color2} 50%, ${color2} 75%, ${color1} 75%, ${color1} 100%)`,
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

export const gradHueConic: string = `conic-gradient(hsl(0 100% 50%) 0,hsl(120 100% 50%) 120deg,hsl(240 100% 50%) 240deg,hsl(0 100% 50%) 360deg)`;
