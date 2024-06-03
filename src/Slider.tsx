import { Component } from 'solid-js';
import { ColorBoard, ColorProps } from './ColorBoard';
import { styleWH100 } from './style';

type Props = {
	/** Min color style (leftmost color of gradation) */
	minColor: string;

	/** Max color style (rightmost color of gradation) */
	maxColor: string;
} & ColorProps;

const Slider: Component<Props> = (props) => {
	return (
		<ColorBoard {...props} colorToPos={() => [0, 0.5]}>
			<div
				style={{
					...styleWH100,
					'background-image': `linear-gradient(to right, ${props.minColor}, ${props.maxColor})`,
				}}
			/>
		</ColorBoard>
	);
};

export default Slider;
