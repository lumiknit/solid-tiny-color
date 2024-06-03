import { ColorBoard } from './ColorBoard';
import { styleWH100 } from './style';
import { hslToHSV, hslToStyle, hsvToHSL, hsvToRGB, hsvToStyle, rgbToHSV, rgbToStyle, } from './color';
const Slider = (props) => {
    return (<ColorBoard {...props} onPick={(x) => {
            const hsv = props.colorMap(props.hsv, x)[1];
            props.onHSVChange?.(hsv);
        }} colorToPos={(hsv) => [props.inverseColorMap(hsv), 0.5]}>
			<div style={{
            ...styleWH100,
            'background-image': `linear-gradient(to right, ${[0, 0.25, 0.5, 0.75, 1].map((v) => props.colorMap(props.hsv, v)[0]).join(',')})`,
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
