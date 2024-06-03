import { Component } from 'solid-js';
import { ColorBoard, ColorProps } from './ColorBoard';
import { styleWH100 } from './style';
import { HSV, hsvToRGB, rgbToHSV } from './color';

const SVSquare: Component<ColorProps> = (props) => {
	const hue = () => rgbToHSV(props.rgb)[0];
	return (
		<ColorBoard
			{...props}
			onPick={(x, y) => {
				const oldHSV = rgbToHSV(props.rgb);
				const newHSV: HSV = [oldHSV[0], x, 1 - y];
				props.onRGBChange?.(hsvToRGB(newHSV));
			}}
			colorToPos={(rgb) => {
				const hsv = rgbToHSV(rgb);
				console.log(hsv);
				return [hsv[1], 1 - hsv[2]];
			}}
		>
			<div
				style={{
					...styleWH100,
					'background-color': `hsl(${hue()}, 100%, 50%)`,
					'background-image': `linear-gradient(to top, #000, rgba(0, 0, 0, 0)), linear-gradient(to right, #fff, rgba(255, 255, 255, 0))`,
				}}
			/>
		</ColorBoard>
	);
};

export default SVSquare;
