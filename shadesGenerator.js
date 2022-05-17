const fs = require('fs');
const { error, log } = console;
const { createTag, attributes, link } = require('./tools.js');
const MAX_RGB = 255;
const MIN_RGB = 0;
const MAX_ALPHA = 1;

const bg = ({ rgb, alpha }) => {
  const color = rgb.join(',');
  return 'background-color: rgba(' + color + ',' + alpha + ')';
};

const shade = (color) => {
  const attrs = [
    { attr: 'class', value: 'shade' },
    { attr: 'style', value: bg(color) }
  ];
  return createTag('div', attributes(attrs), '');
};

const shadesBgs = (rgb) => {
  let alpha = 0.15;
  const bgColors = [];

  do {
    const inc = 0.10;
    const fractionDigits = 2;

    bgColors.unshift({ rgb, alpha });
    alpha += inc;
    alpha = Number(alpha.toFixed(fractionDigits));
  } while (alpha < MAX_ALPHA);

  return bgColors;
};

const shades = (color) => {
  const colorShades = shadesBgs(color).map(shade).join('');
  const containerAttrs = attributes([{
    'attr': 'class',
    'value': 'shades_container'
  }]);
  return createTag('div', containerAttrs, colorShades);
};

const heading = color => createTag('h1', '', 'Shades of rgb(' + color + ')');

const createPage = function (color) {
  const headContent = createTag('title', '', 'Color Shades') + link();
  const head = createTag('head', '', headContent);

  const header = createTag('header', '', heading(color));
  const body = createTag('body', '', header + shades(color));

  return createTag('html', '', head + body);
};

const shadesGenerator = (color) => {
  try {
    fs.writeFileSync('./index.html', createPage(color), 'utf8');
  } catch (error) {
    const er = error.name + ':' + error.message;
    throw er;
  }
};

const isValidRgb = (rgbValue) => rgbValue >= MIN_RGB && rgbValue <= MAX_RGB;

const isValid = rgb => {
  if (rgb.length < 3) {
    return false;
  }

  return rgb.every(isValidRgb);
};

const main = (colorAsString) => {
  const color = colorAsString.map(Number);

  if (isValid(color)) {
    shadesGenerator(color);
    error(0);
    return;
  }
  log(1);
};

main(process.argv.slice(2));
