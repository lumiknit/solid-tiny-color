import { luminance, RGB } from './color';

type Props = {
	x: number; // 0.0 to 1.0
	y: number; // 0.0 to 1.0
	rgb: RGB;
};

const ColorPointer = (props: Props) => {
	return (
		<div
			style={{
				'pointer-events': 'none', // Prevent pointer event to this div
				position: 'absolute',
				left: `${props.x * 100}%`,
				top: `${props.y * 100}%`,
				width: '10px',
				height: '10px',
				border: `2px solid ${luminance(props.rgb) > 0.5 ? 'black' : 'white'}`,
				'border-radius': '50%',
				transform: 'translate(-50%, -50%)',
				'background-color': `rgb(${props.rgb[0]},${props.rgb[1]},${props.rgb[2]})`,
			}}
		/>
	);
};

export default ColorPointer;
