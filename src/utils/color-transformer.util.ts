type RGBAString = `rgba(${number},${number},${number},${number})`;

const rgbaToHex = (color: RGBAString) =>
  `#${color
    .replace(/[^\d,.]/g, '')
    .split(',')
    .map((val, i) =>
      i < 3
        ? (+val).toString(16).padStart(2, '0')
        : Math.round(+val * 255)
            .toString(16)
            .padStart(2, '0'),
    )
    .join('')}`;

export { rgbaToHex, type RGBAString };
