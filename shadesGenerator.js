const { writeFileSync } = require('fs');
const { log } = console;
const MAX_RGB = 255;
const MIN_RGB = 0;
const MAX_ALPHA = 1;

const openingTag = (tag, attributes) => '<' + tag + ' ' + attributes + '>';

const closingTag = tag => '</' + tag + '>';

const bg = ({ rgb, alpha }) => {
  const color = rgb.join(',');
  return 'background-color: rgba(' + color + ',' + alpha + ')';
};

const attribute = ({ attr, value }) => {
  return attr + '="' + value + '"';
};

const attributes = (attrs) => {
  return attrs.map(attr => attribute(attr)).join(' ');
};

const createTag = function (tag, attributes, content) {
  return openingTag(tag, attributes) + content + closingTag(tag);
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

const link = () => '<link rel="stylesheet" href="styles.css"/>';

const heading = color => createTag('h1', '', 'Shades of rgb(' + color + ')');

const createPage = function (color) {
  const headContent = createTag('title', '', 'Color Shades') + link();
  const head = createTag('head', '', headContent);

  const header = createTag('header', '', heading(color));
  const body = createTag('body', '', header + shades(color));

  return createTag('html', '', head + body);
};

const shadesGenerator = (color) => {
  writeFileSync('index.html', createPage(color), 'utf8');
};

const isValidRgb = (rgbValue) => rgbValue >= MIN_RGB && rgbValue <= MAX_RGB;

const isValid = rgb => {
  if (rgb.length < 3) {
    return false;
  }

  return rgb.every(isValidRgb);
};

const main = () => {
  const color = process.argv.slice(2).map(Number);

  if (isValid(color)) {
    shadesGenerator(color);
    log(0);
    return;
  }
  log(1);
};

main();
