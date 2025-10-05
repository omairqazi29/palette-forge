const colorPicker = document.getElementById('colorPicker');
const colorText = document.getElementById('colorText');
const paletteType = document.getElementById('paletteType');
const generateBtn = document.getElementById('generateBtn');
const randomBtn = document.getElementById('randomBtn');
const paletteContainer = document.getElementById('palette');
const toast = document.getElementById('toast');

function hexToHSL(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generatePalette(baseColor, type) {
    const hsl = hexToHSL(baseColor);
    const colors = [];

    switch (type) {
        case 'complementary':
            colors.push(baseColor);
            colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
            colors.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 10)));
            colors.push(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 20, 90)));
            colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, Math.max(hsl.l - 20, 10)));
            break;

        case 'analogous':
            colors.push(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l));
            colors.push(baseColor);
            colors.push(hslToHex((hsl.h + 15) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
            break;

        case 'triadic':
            colors.push(baseColor);
            colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
            colors.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 15, 10)));
            colors.push(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 90)));
            break;

        case 'monochromatic':
            for (let i = 0; i < 5; i++) {
                const lightness = 20 + (i * 15);
                colors.push(hslToHex(hsl.h, hsl.s, lightness));
            }
            break;

        case 'split-complementary':
            colors.push(baseColor);
            colors.push(hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l));
            colors.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 10)));
            colors.push(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 20, 90)));
            break;
    }

    return colors;
}

function displayPalette(colors) {
    paletteContainer.innerHTML = '';
    colors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.style.backgroundColor = color;
        colorCard.innerHTML = `<div class="color-code">${color.toUpperCase()}</div>`;
        colorCard.addEventListener('click', () => copyToClipboard(color));
        paletteContainer.appendChild(colorCard);
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    });
}

function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function updateColor(color) {
    colorPicker.value = color;
    colorText.value = color.toUpperCase();
    const colors = generatePalette(color, paletteType.value);
    displayPalette(colors);
}

colorPicker.addEventListener('input', (e) => {
    updateColor(e.target.value);
});

colorText.addEventListener('input', (e) => {
    let value = e.target.value;
    if (!value.startsWith('#')) {
        value = '#' + value;
    }
    if (/^#[0-9A-F]{6}$/i.test(value)) {
        updateColor(value);
    }
});

paletteType.addEventListener('change', () => {
    updateColor(colorPicker.value);
});

generateBtn.addEventListener('click', () => {
    updateColor(colorPicker.value);
});

randomBtn.addEventListener('click', () => {
    const randomColor = getRandomColor();
    updateColor(randomColor);
});

updateColor(colorPicker.value);
