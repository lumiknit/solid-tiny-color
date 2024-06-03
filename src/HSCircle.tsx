import { Component } from 'solid-js';
import { ColorBoard, ColorProps } from './ColorBoard';
import { gradHueConic, styleWH100 } from './style';
import { degToRad } from './utils';

const HSCircle: Component<ColorProps> = (props) => {
	const blackOverlay = () => `rgba(0,0,0,${1 - props.hsv[2]})`;
	return (
		<ColorBoard
			{...props}
			onPick={(x, y) => {
				// Get current value
				const dx = x * 2 - 1;
				const dy = y * 2 - 1;
				props.onHSVChange?.([
					(Math.atan2(dy, dx) / degToRad + 450) % 360,
					Math.min(Math.sqrt(dx * dx + dy * dy), 1),
					props.hsv[2],
				]);
			}}
			colorToPos={([h, s]) => {
				const angle = h * degToRad;
				return [(Math.sin(angle) * s + 1) / 2, (-Math.cos(angle) * s + 1) / 2];
			}}
		>
			<div
				style={{
					...styleWH100,
					'background-image': `linear-gradient(${blackOverlay()},${blackOverlay()}),radial-gradient(closest-side, #ffff, #fff0),${gradHueConic}`,
					'border-radius': '50%',
				}}
			/>
		</ColorBoard>
	);
};

export default HSCircle;
