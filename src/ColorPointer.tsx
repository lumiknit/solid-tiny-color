import { Component, JSX } from 'solid-js';
import { HSV, hsvToRGB, rgbToGrayscale, rgbToStyle } from './color';

type Props = {
	pos: [number, number]; // 0.0 to 1.0

	/** Size of pointer */
	size?: string;

	/** Fill color */
	hsv: HSV;

	/** Override styles */
	style?: JSX.CSSProperties;

	/** Override class */
	class?: string;
};

const ColorPointer: Component<Props> = (props) => {
	const rgb = () => hsvToRGB(props.hsv);
	const size = () => props.size || '10px';
	return (
		<div
			class={props.class}
			style={{
				'pointer-events': 'none', // Prevent pointer event to this div
				position: 'absolute',
				left: `${props.pos[0] * 100}%`,
				top: `${props.pos[1] * 100}%`,
				width: size(),
				height: size(),
				border: `2px solid ${rgbToGrayscale(rgb()) > 127 ? 'black' : 'white'}`,
				'border-radius': '50%',
				transform: 'translate(-50%, -50%)',
				'background-color': rgbToStyle(rgb()),
				...props.style,
			}}
		/>
	);
};

export default ColorPointer;
