import { Component } from 'solid-js';
import { ColorBoard, ColorProps } from './ColorBoard';
import { styleWH100 } from './style';

const SVSquare: Component<ColorProps> = (props) => {
	const hue = () => props.hsv[0];
	return (
		<ColorBoard
			{...props}
			onPick={(x, y) => {
				props.onHSVChange?.([props.hsv[0], x, 1 - y]);
			}}
			colorToPos={([, s, v]) => {
				return [s, 1 - v];
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
