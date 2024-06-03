import { Component, onMount } from 'solid-js';
import { ColorBoard, ColorProps } from './ColorBoard';
import { styleWH100 } from './style';
import { HSL, hslToRGB, rgbToHSL, rgbToHSV } from './color';

const renderSVTriangle = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number
) => {
	ctx.clearRect(0, 0, width, height);
	for (let sy = 0; sy < height; sy++) {
		const yr = sy / height;
		const w = Math.round(2 * width * Math.min(yr, 1 - yr));
		for (let sx = 0; sx < w; sx++) {
			const x = sx / width;
			const y = 1 - yr + x / 2;

			// Blend s
			const r = 255 * y;
			const gb = r * (1 - x / y);

			ctx.fillStyle = `rgb(${r},${gb},${gb})`;
			ctx.fillRect(sx, sy, 1, 1);
		}
		if (width - w > 0) ctx.fillRect(w, sy, width - w, 1);
	}
};

const SVTriangle: Component<ColorProps> = (props) => {
	let canvasRef: HTMLCanvasElement;

	const hue = () => rgbToHSV(props.rgb)[0];

	onMount(() => {
		// Render Red + SV Triangle
		const ctx = canvasRef.getContext('2d');
		if (ctx) renderSVTriangle(ctx, canvasRef.width, canvasRef.height);
	});

	return (
		<ColorBoard
			{...props}
			onPick={(x, y) => {
				const w = 2 * Math.min(y, 1 - y);
				x = Math.min(w, x);
				if (w > 0) x /= w;
				const oldHSL = rgbToHSL(props.rgb);
				const newHSL: HSL = [oldHSL[0], x, 1 - y];
				console.log(newHSL);
				props.onRGBChange?.(hslToRGB(newHSL));
			}}
			colorToPos={(rgb) => {
				const [, s, l] = rgbToHSL(rgb);
				const y = 1 - l;
				const w = 2 * Math.min(y, 1 - y);
				return [w * s, y];
			}}
		>
			<canvas
				ref={canvasRef!}
				width={100}
				height={100}
				style={{
					...styleWH100,
					'clip-path': 'polygon(0 0, 0 100%, 100% 50%)',
					filter: `hue-rotate(${hue()}deg)`,
				}}
			/>
		</ColorBoard>
	);
};

export default SVTriangle;
