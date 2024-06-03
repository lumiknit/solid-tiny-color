import { mergeProps, Show, splitProps } from 'solid-js';
import { ColorBoard } from './ColorBoard';
import { styleAbsLT0, styleBgCheckerboard, styleWH100 } from './style';
import { hslToHSV, hslToStyle, hsvToHSL, hsvToRGB, hsvToStyle, rgbToHSV, rgbToStyle, } from './color';
const Slider = (props) => {
    const [locals, colorProps] = splitProps(props, [
        'colorMap',
        'inverseColorMap',
        'backgorundStyle',
    ]);
    return (<ColorBoard {...colorProps} onPick={(x) => {
            const hsv = locals.colorMap(colorProps.hsv, x)[1];
            colorProps.onHSVChange?.(hsv);
        }} colorToPos={(hsv) => [locals.inverseColorMap(hsv), 0.5]}>
			<Show when={locals.backgorundStyle}>
				<div style={{
            ...styleAbsLT0,
            ...styleWH100,
            ...locals.backgorundStyle,
        }}/>
			</Show>
			<div style={{
            ...styleAbsLT0,
            ...styleWH100,
            'background-image': `linear-gradient(to right, ${[0, 0.25, 0.5, 0.75, 1].map((v) => props.colorMap(props.hsv, v)[0]).join()})`,
        }}/>
		</ColorBoard>);
};
export default Slider;
// Derived sliders
const RGBSlider = (idx) => (props) => {
    const rgbUpd = (rgb, v) => {
        rgb[idx] = v * 255;
        return rgb;
    };
    return (<Slider {...props} colorMap={(hsv, p) => {
            const rgb = rgbUpd(hsvToRGB(hsv), p);
            return [rgbToStyle(rgb), rgbToHSV(rgb)];
        }} inverseColorMap={(hsv) => hsvToRGB(hsv)[idx] / 255}/>);
};
export const RGBSliderR = RGBSlider(0);
export const RGBSliderG = RGBSlider(1);
export const RGBSliderB = RGBSlider(2);
const hMaxs = [360, 1, 1];
const HSVSlider = (idx) => (props) => {
    return (<Slider {...props} colorMap={(hsv, p) => {
            const z = [...hsv];
            z[idx] = p * hMaxs[idx];
            return [hsvToStyle(z), z];
        }} inverseColorMap={(hsv) => hsv[idx] / hMaxs[idx]}/>);
};
export const HSVSliderH = HSVSlider(0);
export const HSVSliderS = HSVSlider(1);
export const HSVSliderV = HSVSlider(2);
const HSLSlider = (idx) => (props) => {
    return (<Slider {...props} colorMap={(hsv, p) => {
            const hsl = hsvToHSL(hsv);
            hsl[idx] = p * hMaxs[idx];
            return [hslToStyle(hsl), hslToHSV(hsl)];
        }} inverseColorMap={(hsv) => hsvToHSL(hsv)[idx] / hMaxs[idx]}/>);
};
export const HSLSliderH = HSLSlider(0);
export const HSLSliderS = HSLSlider(1);
export const HSLSliderL = HSLSlider(2);
export const AlphaSlider = (props_) => {
    const props = mergeProps({ bgColor1: 'darkgray', bgColor2: 'lightgray' }, props_);
    const [locals, colorProps] = splitProps(props, [
        'bgColor1',
        'bgColor2',
        'alpha',
        'onAlphaChange',
        'hsv',
        'onHSVChange',
    ]);
    return (<Slider {...colorProps} hsv={[0, locals.alpha, 0]} onHSVChange={(hsv) => {
            props.onAlphaChange?.(hsv[1]);
        }} colorMap={(_, p) => [
            `rgba(${hsvToRGB(locals.hsv).join()},${p})`,
            [0, p, 0],
        ]} inverseColorMap={(hsv) => hsv[1]} backgorundStyle={styleBgCheckerboard(locals.bgColor1, locals.bgColor2)}/>);
};
