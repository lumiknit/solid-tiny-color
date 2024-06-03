import { Component, splitProps } from 'solid-js';
import { ColorProps } from './ColorBoard';
import SLTriangle from './SLTriangle';
import HueWheel from './HueWheel';

type Props = {
	/** Stroke width ratio, percent (0-100) */
	strokeWidth: number;

	/** Enable rotation */
	rotate?: boolean;
} & ColorProps;

const HSLWheel: Component<Props> = (props) => {
	const [local, divProps] = splitProps(props, [
		'rotate',
		'strokeWidth',
		'hsv',
		'onHSVChange',
		'children',
	]);

	const rad = () => (99 - props.strokeWidth) / 2;

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
					position: 'absolute',
					left: '0',
					top: '0',
					width: '100%',
					height: '100%',
				}}
			/>
			<SLTriangle
				{...local}
				style={{
					position: 'absolute',
					left: `${50 - rad() / 2}%`,
					top: `${50 - (rad() * Math.sqrt(3)) / 2}%`,
					width: `${rad() * 1.5}%`,
					height: `${rad() * Math.sqrt(3)}%`,
					transform: props.rotate
						? `
					translate(-16.7%, 0)
					rotate(${props.hsv[0] - 90}deg)
					translate(16.7%, 0)
				`
						: 'none',
				}}
			/>
		</div>
	);
};

export default HSLWheel;
