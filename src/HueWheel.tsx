import { Component } from 'solid-js';
import { ColorBoard, ColorProps } from './ColorBoard';
import { styleWH100 } from './style';
import { hsvToRGB, rgbToHSV } from './color';

type Props = {
	/** Stroke width ratio, percent (0-100) */
	strokeWidth: number;
} & ColorProps;

const HueWheel: Component<Props> = (props) => {
	return (
		<ColorBoard
			{...props}
			onPick={(x, y) => {
				const angle = Math.atan2(y - 0.5, x - 0.5);
				const hue = ((angle / Math.PI / 2 + 1.25) % 1) * 360;
				const oldHSV = rgbToHSV(props.rgb);
				props.onRGBChange?.(hsvToRGB([hue, oldHSV[1], oldHSV[2]]));
			}}
			colorToPos={(rgb) => {
				const hsv = rgbToHSV(rgb);
				const angle = (hsv[0] / 360) * Math.PI * 2;
				const x = (Math.sin(angle) * (1 - props.strokeWidth / 200) + 1) / 2;
				const y = (-Math.cos(angle) * (1 - props.strokeWidth / 200) + 1) / 2;
				return [x, y];
			}}
		>
			<div
				style={{
					...styleWH100,
					'background-image':
						'conic-gradient(hsl(0,100%,50%) 0,hsl(120,100%,50%) 120deg,hsl(240,100%,50%) 240deg,hsl(0,100%,50%) 360deg)',
					'border-radius': '50%',
					'mask-image': `radial-gradient(closest-side circle at center,transparent ${99.5 - props.strokeWidth}%,black ${100 - props.strokeWidth}%)`,
				}}
			/>
		</ColorBoard>
	);
};

export default HueWheel;
