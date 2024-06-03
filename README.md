# solid-tiny-color

A small library for color & color pickers for SolidJS.

## Features

- Small size (unzip size: 8kB, gzip size: ~4kB)

## Demo

- https://lumiknit.github.io/demo/solid-tiny-color

## Getting Started

```bash
pnpm install solid-tiny-color
```

```jsx
import { HSVWheel } from 'solid-tiny-color';

const YourComponent = () => {
	const [hsv, setHSV] = createSignal([0, 0, 0]);

	return <HSVWheel hsv={hsv} setHSV={setHSV} style={{
		width: '200px',
		height: '200px',
	}} />;
};
```

### Components

- `HueWheel` and `HSCircle`
- `HSVSquare` and `HSVWheel`
- `HSLTriangle` and `HSLWheel`
- `Slider`s (`RGBSlider`, `HSVSlider`, `HSLSlider`)

