import { Component, createSignal } from 'solid-js';

import {
	HSCircle,
	HueWheel,
	SVSquare,
	SLTriangle,
	HSV,
	hsvToRGB,
	hsvToHSL,
	RGBSliderB,
	RGBSliderG,
	RGBSliderR,
	HSVSliderH,
	HSVSliderS,
	HSVSliderV,
	HSLSliderH,
	HSLSliderS,
	HSLSliderL,
	rgbToHash,
	rgbToGrayscale,
	HSVWheel,
	HSLWheel,
} from '../../src';

const App: Component = () => {
	const [hsv, setHSV_] = createSignal<HSV>([0, 0, 0]);

	const setHSV = (hsv: HSV) => {
		setHSV_(hsv);
		document.body.style.backgroundColor = rgbToHash(hsvToRGB(hsv));
	};

	const [strokeWidth, setStrokeWidth] = createSignal(20);
	const [rotate, setRotate] = createSignal(true);

	setHSV([
		Math.random() * 360,
		0.2 + Math.random() * 0.3,
		0.5 + Math.random() * 0.4,
	]);

	const rgb = () => hsvToRGB(hsv());
	const hsl = () => hsvToHSL(hsv());

	const common = () => ({
		hsv: hsv(),
		onHSVChange: setHSV,
	});

	const StrokeWidthRange = () => {
		return (
			<label>
				Stroke Width:
				<input
					type="range"
					value={strokeWidth()}
					min={0}
					max={100}
					onInput={(e) => setStrokeWidth(parseInt(e.currentTarget.value))}
				/>
			</label>
		);
	};

	const RotateCheckbox = () => {
		return (
			<label>
				Rotate:
				<input
					type="checkbox"
					checked={rotate()}
					onChange={(e) => setRotate(e.currentTarget.checked)}
				/>
			</label>
		);
	};

	return (
		<main class="container">
			<h1> Solid Tiny Color </h1>
			<div>
				<a href="https://github.com/lumiknit/solid-tiny-color">
					<img
						class="badge"
						src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
					/>
				</a>
			</div>
			<p>
				Solid Tiny Color is a simple but essential color picker components for
				SolidJS.
				<a href="#install">See installation and usage!</a>
			</p>
			<h2> Demo </h2>
			<article class="narrow">
				<div class="c-hash-line">
					Hex:
					<span
						class="c-hash"
						style={{
							color: rgbToGrayscale(rgb()) > 127 ? 'black' : 'white',
							background: rgbToHash(rgb()),
						}}
					>
						{rgbToHash(rgb())}
					</span>
				</div>
				<hr />
				<div class="grid">
					<div> R: {Math.floor(rgb()[0])} </div>
					<div> G: {Math.floor(rgb()[1])} </div>
					<div> B: {Math.floor(rgb()[2])} </div>
				</div>
				<hr />
				<div class="grid">
					<div> H: {Math.floor(hsv()[0])} </div>
					<div> S: {Math.floor(100 * hsv()[1])}% </div>
					<div> V: {Math.floor(100 * hsv()[2])}% </div>
				</div>
				<hr />
				<div class="grid">
					<div> H: {Math.floor(hsl()[0])} </div>
					<div> S: {Math.floor(100 * hsl()[1])}% </div>
					<div> L: {Math.floor(100 * hsl()[2])}% </div>
				</div>
			</article>
			<h3> Wheel-Plane Composition </h3>
			<div class="grid">
				<article>
					<header>
						<b>HSVWheel</b>
					</header>
					<HSVWheel
						class="sq-large"
						{...common()}
						strokeWidth={strokeWidth()}
						rotate={rotate()}
					/>
					<StrokeWidthRange />
					<RotateCheckbox />
				</article>
				<article>
					<header>
						<b>HSLWheel</b>
					</header>
					<HSLWheel
						class="sq-large"
						{...common()}
						strokeWidth={strokeWidth()}
						rotate={rotate()}
					/>
					<StrokeWidthRange />
					<RotateCheckbox />
				</article>
			</div>
			<h3> Sliders </h3>
			<div class="grid">
				<article>
					<header>
						<b>RGB</b>
					</header>
					<RGBSliderR class="h-bar" {...common()} />
					<RGBSliderG class="h-bar" {...common()} />
					<RGBSliderB class="h-bar" {...common()} />
					{Math.floor(rgb()[0])}, {Math.floor(rgb()[1])}, {Math.floor(rgb()[2])}
				</article>
				<article>
					<header>
						<b>HSV</b>
					</header>
					<HSVSliderH class="h-bar" {...common()} />
					<HSVSliderS class="h-bar" {...common()} />
					<HSVSliderV class="h-bar" {...common()} />
					{Math.floor(hsv()[0])}, {Math.floor(100 * hsv()[1])},
					{Math.floor(100 * hsv()[2])}
				</article>
				<article>
					<header>
						<b>HSL</b>
					</header>
					<HSLSliderH class="h-bar" {...common()} />
					<HSLSliderS class="h-bar" {...common()} />
					<HSLSliderL class="h-bar" {...common()} />
					{Math.floor(hsl()[0])}, {Math.floor(100 * hsl()[1])},
					{Math.floor(100 * hsl()[2])}
				</article>
			</div>
			<h3> Hue Wheels </h3>
			<div class="grid">
				<article>
					<header>
						<b>HueWheel</b>
					</header>
					<HueWheel class="sq" {...common()} strokeWidth={strokeWidth()} />
					<StrokeWidthRange />
				</article>

				<article>
					<header>
						<b>HSCircle</b>
					</header>
					<HSCircle class="sq" {...common()} />
				</article>
			</div>
			<h3> SV/SL Planes </h3>
			<div class="grid">
				<article>
					<header>
						<b>SVSquare</b>
					</header>
					<SVSquare class="sq" {...common()} />
				</article>
				<article>
					<header>
						<b>SLTriangle</b>
					</header>
					<SLTriangle class="sq" {...common()} />
				</article>
			</div>
			<h2 id="install"> Installation and Usage </h2>
			<h3> Installation </h3>
			Install by the following command:
			<pre>pnpm add solid-tiny-color</pre>
			<h3> Usage </h3>
			In <code>solid-tiny-color</code>, the main color format is
			<code>HSV</code>
			(where hue is in degrees, and saturation and value are in the range of 0
			to 1).
			<pre>
				{`
import { HSV, hsvToRGB, SVSquare } from 'solid-tiny-color';

...

const [hsv, setHSV] = createSignal<HSV>([0, 0, 0]);

return <div>
	My color is {hsvToRGB(hsv()).join(', ')}

	<SVSquare class="color-sq"
		hsv={hsv()} onHSVChange={setHSV} />
</div>;
`.trim()}
			</pre>
			Since most of the components <b>do not</b> contain sizing style, you must
			provide the size by CSS. Also, most components will not work without
			<code>display: absolute</code>
			nor <code>position: relative</code> for itself, because of their pointers.
			Some component requires additional props. For example,
			<ul>
				<li>
					{' '}
					<code>HueWheel</code> requires <code>strokeWidth</code>{' '}
				</li>
				<li>
					{' '}
					<code>Slider</code> required <code>colorMap</code> and{' '}
					<code>inverseColorMap</code>
					which helps you to add any color gradient you want.
				</li>
			</ul>
		</main>
	);
};

export default App;
