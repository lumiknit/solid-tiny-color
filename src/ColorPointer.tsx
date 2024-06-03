import { HSV, hsvToRGB, RGB, rgbToGrayscale } from './color';

type Props = {
	x: number; // 0.0 to 1.0
	y: number; // 0.0 to 1.0

	/**  */
	size?: string;
	hsv: HSV;
};

const ColorPointer = (props: Props) => {
	const rgb = () => hsvToRGB(props.hsv);
	const size = () => props.size || '10px';
	return (
		<div
			style={{
				'pointer-events': 'none', // Prevent pointer event to this div
				position: 'absolute',
				left: `${props.x * 100}%`,
				top: `${props.y * 100}%`,
				width: size(),
				height: size(),
				border: `2px solid ${rgbToGrayscale(rgb()) > 127 ? 'black' : 'white'}`,
				'border-radius': '50%',
				transform: 'translate(-50%, -50%)',
				'background-color': `rgb(${rgb()[0]},${rgb()[1]},${rgb()[2]})`,
			}}
		/>
	);
};

export default ColorPointer;
