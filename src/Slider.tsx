import { Component } from 'solid-js';
import { ColorBoard, ColorProps } from './ColorBoard';
import { styleWH100 } from './style';
import {
	hslToHSV,
	hslToStyle,
	HSV,
	hsvToHSL,
	hsvToRGB,
	hsvToStyle,
	RGB,
	rgbToHSV,
} from './color';

type Props = {
	/** Color map
	 * @param hsv Current color
	 * @param p Position. 0.0 is leftmost, 1.0 is rightmost.
	 * @returns [color for style, color in HSV]
	 */
	colorMap: (hsv: HSV, p: number) => [string, HSV];

	/** Inverse Color map
	 * @param color Color in HSV
	 * @returns Position. 0.0 is leftmost, 1.0 is rightmost.
	 */
	inverseColorMap: (color: HSV) => number;
} & ColorProps;

const Slider: Component<Props> = (props) => {
	return (
		<ColorBoard
			{...props}
			onPick={(x) => {
				const hsv = props.colorMap(props.hsv, x)[1];
				props.onHSVChange?.(hsv);
			}}
			colorToPos={(hsv) => [props.inverseColorMap(hsv), 0.5]}
		>
			<div
				style={{
					...styleWH100,
					'background-image': `linear-gradient(to right, ${[0, 0.25, 0.5, 0.75, 1].map((v) => props.colorMap(props.hsv, v)[0]).join(',')})`,
				}}
			/>
		</ColorBoard>
	);
};

export default Slider;

// Derived sliders

const RGBSlider =
	(idx: 0 | 1 | 2): Component<ColorProps> =>
	(props) => {
		const rgbUpd = (rgb: RGB, v: number) => {
			rgb[idx] = v * 255;
			return rgb;
		};
		return (
			<Slider
				{...props}
				colorMap={(hsv, p) => {
					const rgb = rgbUpd(hsvToRGB(hsv), p);
					return [`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`, rgbToHSV(rgb)];
				}}
				inverseColorMap={(hsv) => hsvToRGB(hsv)[idx] / 255}
			/>
		);
	};

export const RGBSliderR = RGBSlider(0);
export const RGBSliderG = RGBSlider(1);
export const RGBSliderB = RGBSlider(2);

const HSVSlider =
	(idx: 0 | 1 | 2): Component<ColorProps> =>
	(props) => {
		const maxs = [360, 1, 1];
		return (
			<Slider
				{...props}
				colorMap={(hsv, p) => {
					const z: HSV = [...hsv];
					z[idx] = p * maxs[idx];
					return [hsvToStyle(z), z];
				}}
				inverseColorMap={(hsv) => hsv[idx] / maxs[idx]}
			/>
		);
	};

export const HSVSliderH = HSVSlider(0);
export const HSVSliderS = HSVSlider(1);
export const HSVSliderV = HSVSlider(2);

const HSLSlider =
	(idx: 0 | 1 | 2): Component<ColorProps> =>
	(props) => {
		const maxs = [360, 1, 1];
		return (
			<Slider
				{...props}
				colorMap={(hsv, p) => {
					const hsl = hsvToHSL(hsv);
					hsl[idx] = p * maxs[idx];
					return [hslToStyle(hsl), hslToHSV(hsl)];
				}}
				inverseColorMap={(hsv) => hsvToHSL(hsv)[idx] / maxs[idx]}
			/>
		);
	};

export const HSLSliderH = HSLSlider(0);
export const HSLSliderS = HSLSlider(1);
export const HSLSliderL = HSLSlider(2);
