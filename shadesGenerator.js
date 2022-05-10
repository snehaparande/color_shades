const { writeFileSync } = require('fs');
const MAX_RGB = 255;
const MAX_ALPHA = 1;

const randomInt = (limit) => Math.round(Math.random() * limit);

const openingTag = (tag, attributes) => '<' + tag + ' ' + attributes + '>';

const closingTag = tag => '</' + tag + '>';

const classAttribute = (value) => 'class="' + value + '"';

const style = function (rgb, alpha) {
  const color = rgb.join(',');
  return 'style= "background-color: rgba(' + color + ',' + alpha + ')"';
};

const link = () => '<link rel="stylesheet" href="styles.css"/>';

const createTag = function(tag, attribute, content){
  return openingTag(tag, classAttribute(attribute)) + content + closingTag(tag);
};

const shade = (rgb, alpha) => {
  const allAttributes = classAttribute('shade') + style(rgb, alpha);
  return openingTag('div', allAttributes) + closingTag('div');
};

const shades = function () {
  const rgb = [randomInt(MAX_RGB), randomInt(MAX_RGB), randomInt(MAX_RGB)];
  const inc = 0.10;
  const fractionDigits = 2;
  let alpha = 0.15;
  let divs = '';
  do {
    divs = shade(rgb, alpha) + divs;
    alpha += inc;
    alpha = +alpha.toFixed(fractionDigits);
  } while (alpha < MAX_ALPHA);
  return divs;
};

const createPage = function () {
  const headContent = createTag('title', '', 'Color Shades') + link();
  const head = createTag('head', '', headContent);
  const bodyContent = createTag('div', 'container', shades());
  const body = createTag('body', '', bodyContent);

  return createTag('html', '', head + body);
};

const shadesGenerator = () => writeFileSync('index.html', createPage(), 'utf8');

shadesGenerator();
