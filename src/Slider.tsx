import { Component, JSX, mergeProps, Show, splitProps } from 'solid-js';
import { ColorBoard, ColorProps } from './ColorBoard';
import { styleAbsLT0, styleBgCheckerboard, styleWH100 } from './style';
import {
	hslToHSV,
	hslToStyle,
	HSV,
	hsvToHSL,
	hsvToRGB,
	hsvToStyle,
	RGB,
	rgbToHSV,
	rgbToStyle,
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

	/** Background image */
	backgorundStyle?: JSX.CSSProperties;
} & ColorProps;

const Slider: Component<Props> = (props) => {
	const [locals, colorProps] = splitProps(props, [
		'colorMap',
		'inverseColorMap',
		'backgorundStyle',
	]);
	return (
		<ColorBoard
			{...colorProps}
			onPick={(x) => {
				const hsv = locals.colorMap(colorProps.hsv, x)[1];
				colorProps.onHSVChange?.(hsv);
			}}
			colorToPos={(hsv) => [locals.inverseColorMap(hsv), 0.5]}
		>
			<Show when={locals.backgorundStyle}>
				<div
					style={{
						...styleAbsLT0,
						...styleWH100,
						...locals.backgorundStyle,
					}}
				/>
			</Show>
			<div
				style={{
					...styleAbsLT0,
					...styleWH100,
					'background-image': `linear-gradient(to right, ${[0, 0.25, 0.5, 0.75, 1].map((v) => props.colorMap(props.hsv, v)[0]).join()})`,
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
					return [rgbToStyle(rgb), rgbToHSV(rgb)];
				}}
				inverseColorMap={(hsv) => hsvToRGB(hsv)[idx] / 255}
			/>
		);
	};

export const RGBSliderR = RGBSlider(0);
export const RGBSliderG = RGBSlider(1);
export const RGBSliderB = RGBSlider(2);

const hMaxs = [360, 1, 1];

const HSVSlider =
	(idx: 0 | 1 | 2): Component<ColorProps> =>
	(props) => {
		return (
			<Slider
				{...props}
				colorMap={(hsv, p) => {
					const z: HSV = [...hsv];
					z[idx] = p * hMaxs[idx];
					return [hsvToStyle(z), z];
				}}
				inverseColorMap={(hsv) => hsv[idx] / hMaxs[idx]}
			/>
		);
	};

export const HSVSliderH = HSVSlider(0);
export const HSVSliderS = HSVSlider(1);
export const HSVSliderV = HSVSlider(2);

const HSLSlider =
	(idx: 0 | 1 | 2): Component<ColorProps> =>
	(props) => {
		return (
			<Slider
				{...props}
				colorMap={(hsv, p) => {
					const hsl = hsvToHSL(hsv);
					hsl[idx] = p * hMaxs[idx];
					return [hslToStyle(hsl), hslToHSV(hsl)];
				}}
				inverseColorMap={(hsv) => hsvToHSL(hsv)[idx] / hMaxs[idx]}
			/>
		);
	};

export const HSLSliderH = HSLSlider(0);
export const HSLSliderS = HSLSlider(1);
export const HSLSliderL = HSLSlider(2);

type AlphaSliderProps = {
	bgColor1?: string;
	bgColor2?: string;

	alpha: number;
	onAlphaChange?: (alpha: number) => void;
} & ColorProps;

export const AlphaSlider: Component<AlphaSliderProps> = (props_) => {
	const props = mergeProps(
		{ bgColor1: 'darkgray', bgColor2: 'lightgray' },
		props_
	);
	const [locals, colorProps] = splitProps(props, [
		'bgColor1',
		'bgColor2',
		'alpha',
		'onAlphaChange',
		'hsv',
		'onHSVChange',
	]);
	return (
		<Slider
			{...colorProps}
			hsv={[0, locals.alpha, 0]}
			onHSVChange={(hsv) => {
				props.onAlphaChange?.(hsv[1]);
			}}
			colorMap={(_, p) => [
				`rgba(${hsvToRGB(locals.hsv).join()},${p})`,
				[0, p, 0],
			]}
			inverseColorMap={(hsv) => hsv[1]}
			backgorundStyle={styleBgCheckerboard(locals.bgColor1, locals.bgColor2)}
		/>
	);
};
