# 🎨 Palette Forge

A beautiful, interactive web app for generating harmonious color palettes from any base color.

**[Live Demo](https://omairqazi29.github.io/palette-forge/)**

## Features

- **Multiple Palette Types**: Generate complementary, analogous, triadic, monochromatic, and split-complementary color schemes
- **Interactive Color Picker**: Choose your base color using a visual picker or hex input
- **Random Color Generator**: Get instant inspiration with random color suggestions
- **One-Click Copy**: Click any color to copy its hex code to clipboard
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Preview**: See your palette update instantly as you change colors

## Usage

Simply open `index.html` in your browser, or use a local server:

```bash
npm start
```

Then navigate to `http://localhost:3000`

## How It Works

Palette Forge uses HSL (Hue, Saturation, Lightness) color space to generate harmonious color combinations:

- **Complementary**: Colors opposite on the color wheel (180° apart)
- **Analogous**: Colors adjacent on the color wheel (±30° apart)
- **Triadic**: Three colors evenly spaced on the color wheel (120° apart)
- **Monochromatic**: Variations of a single hue with different lightness
- **Split-Complementary**: Base color plus two colors adjacent to its complement

## Technologies

- Pure HTML, CSS, and JavaScript
- No dependencies or frameworks
- Modern CSS Grid and Flexbox layout
- HSL color manipulation algorithms

## License

MIT
