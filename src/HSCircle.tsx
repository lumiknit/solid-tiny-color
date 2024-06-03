import { Component } from 'solid-js';
import { ColorBoard, ColorProps } from './ColorBoard';
import { styleWH100 } from './style';
import { hsvToRGB, rgbToHSV } from './color';

const HSCircle: Component<ColorProps> = (props) => {
	const value = () => rgbToHSV(props.rgb)[2];
	return (
		<ColorBoard
			{...props}
			onPick={(x, y) => {
				// Get current value
				const oldHSV = rgbToHSV(props.rgb);
				const dx = x * 2 - 1;
				const dy = y * 2 - 1;
				const angle = Math.atan2(dy, dx);
				const rad = Math.min(Math.sqrt(dx * dx + dy * dy), 1);
				const newHSV: [number, number, number] = [
					((angle / Math.PI / 2 + 1.25) % 1) * 360,
					rad,
					oldHSV[2],
				];
				props.onRGBChange?.(hsvToRGB(newHSV));
			}}
			colorToPos={(rgb) => {
				const hsv = rgbToHSV(rgb);
				const [h, s] = hsv;
				const angle = (h / 360) * Math.PI * 2;
				const rad = Math.min(s, 1);
				const x = (Math.sin(angle) * rad + 1) / 2;
				const y = (-Math.cos(angle) * rad + 1) / 2;
				return [x, y];
			}}
		>
			<div
				style={{
					...styleWH100,
					'background-image': `
					linear-gradient(rgba(0,0,0,${1 - value()}), rgb(0,0,0,${1 - value()})),
					radial-gradient(closest-side, #ffff, #fff0)
					,conic-gradient(
						hsl(0, 100%, 50%) 0,
						hsl(120, 100%, 50%) 120deg,
						hsl(240, 100%, 50%) 240deg,
						hsl(0, 100%, 50%) 360deg
					)
						`,
					'border-radius': '50%',
				}}
			/>
		</ColorBoard>
	);
};

export default HSCircle;
