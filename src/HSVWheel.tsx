import { Component, splitProps } from 'solid-js';
import { ColorProps } from './ColorBoard';
import SVSquare from './SVSquare';
import HueWheel from './HueWheel';
import { styleAbsLT0, styleWH100 } from './style';

type Props = {
	/** Stroke width ratio, percent (0.0-1.0) */
	strokeWidth: number;

	/** Enable rotation */
	rotate?: boolean;
} & ColorProps;

const HSVWheel: Component<Props> = (props) => {
	const [local, divProps] = splitProps(props, [
		'rotate',
		'strokeWidth',
		'hsv',
		'onHSVChange',
		'children',
	]);

	const squareWidth = () => (100 * (0.99 - props.strokeWidth)) / Math.sqrt(2);

	return (
		<div
			{...divProps}
			style={{
				position: 'relative',
			}}
		>
			<HueWheel
				{...local}
				style={{
					...styleAbsLT0,
					...styleWH100,
				}}
			/>
			<SVSquare
				{...local}
				style={{
					position: 'absolute',
					left: `${(100 - squareWidth()) / 2}%`,
					top: `${(100 - squareWidth()) / 2}%`,
					width: `${squareWidth()}%`,
					height: `${squareWidth()}%`,
					transform: props.rotate ? `rotate(${props.hsv[0] - 45}deg)` : 'none',
				}}
			/>
		</div>
	);
};

export default HSVWheel;
