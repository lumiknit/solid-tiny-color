import { Component, createSignal } from 'solid-js';

import {
	HSCircle,
	HueWheel,
	Slider,
	SVSquare,
	RGB,
	rgbToHSL,
	SVTriangle,
	rgbToHSV,
} from '../../src';

const App: Component = () => {
	const [rgb, setRGB] = createSignal<RGB>([0, 0, 0]);

	const hsl = () => rgbToHSL(rgb());
	const hsv = () => rgbToHSV(rgb());

	return (
		<>
			R: {Math.floor(rgb()[0])}, G: {Math.floor(rgb()[1])}, B:{' '}
			{Math.floor(rgb()[2])} <br />
			H: {Math.floor(hsv()[0])}, S: {Math.floor(100 * hsv()[1])}, V:{' '}
			{Math.floor(100 * hsv()[2])} <br />
			H: {Math.floor(hsl()[0])}, S: {Math.floor(100 * hsl()[1])}, L:{' '}
			{Math.floor(100 * hsl()[2])} <br />
			<h1> Slider </h1>
			<Slider class="h-bar" rgb={rgb()} minColor="blue" maxColor="green" />
			<SVSquare class="sq" rgb={rgb()} onRGBChange={setRGB} />
			<SVTriangle class="sq" rgb={rgb()} onRGBChange={setRGB} />
			<HSCircle class="sq" rgb={rgb()} onRGBChange={setRGB} />
			<HueWheel class="sq" rgb={rgb()} onRGBChange={setRGB} strokeWidth={20} />
		</>
	);
};

export default App;
