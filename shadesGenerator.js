const { writeFileSync } = require('fs');
const MAX_RGB = 255;
const MAX_ALPHA = 1;

const randomInt = (limit) => Math.round(Math.random() * limit);

const openingTag = (tag, attributes) => '<' + tag + ' ' + attributes + '>';

const closingTag = tag => '</' + tag + '>';

const classAttribute = (value) => 'class="' + value + '"';

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
  // return openingTag('div', attributes(attrs)) + closingTag('div');
  return createTag('div', attributes(attrs), '');
};

const shadesBgs = () => {
  const rgb = [randomInt(MAX_RGB), randomInt(MAX_RGB), randomInt(MAX_RGB)];
  let alpha = 0.15;
  const inc = 0.10;
  const fractionDigits = 2;
  const bgColors = [];

  do {
    bgColors.unshift({ rgb, alpha });
    alpha += inc;
    alpha = Number(alpha.toFixed(fractionDigits));
  } while (alpha < MAX_ALPHA);
  return bgColors;
};

const shades = () => shadesBgs().map(bg => shade(bg)).join('');

const link = () => '<link rel="stylesheet" href="styles.css"/>';

const createPage = function () {
  const headContent = createTag('title', '', 'Color Shades') + link();
  const head = createTag('head', '', headContent);
  const containerAttrs = attributes([{
    'attr': 'class',
    'value': 'container'
  }]);
  const bodyContent = createTag('div', containerAttrs, shades());
  const body = createTag('body', '', bodyContent);

  return createTag('html', '', head + body);
};

const shadesGenerator = () => writeFileSync('index.html', createPage(), 'utf8');

shadesGenerator();
