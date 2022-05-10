const { writeFileSync } = require('fs');

const openingTag = (tag, attributes) => '<' + tag + attributes + '>';

const closingTag = tag => '</' + tag + '>';

const classAttribute = (value) => {
  return value ? ' class="' + value + '"' : '';
};

const generateTag = function(tag, attribute, content){
  return openingTag(tag, classAttribute(attribute)) + content + closingTag(tag);
};

const link = () => '<link rel="stylesheet" href="styles.css"/>';

const randomInt = (limit) => Math.round(Math.random() * limit);

const style = function (rgb, alpha) {
  const color = rgb.reduce((context, rgbValue) => rgbValue + ',' + context, '');
  return 'style= "background-color: rgba(' + color + alpha + ')"';
};

const shade = (rgb, alpha) => {
  const allAttributes = classAttribute('shade') + style(rgb, alpha);
  return openingTag('div', allAttributes) + closingTag('div');
};

const shades = function () {
  const maxRgb = 256;
  const inc = 0.10;
  const rgb = [randomInt(maxRgb), randomInt(maxRgb), randomInt(maxRgb)];
  let alpha = 0.15;
  let divs = '';
  do {
    divs = shade(rgb, alpha) + divs;
    alpha += inc;
    alpha = +alpha.toFixed(2);
  } while (alpha < 1);
  return divs;
};

const generateBody = function () {
  const container = generateTag('div', 'container', shades());
  return generateTag('body', '', container);
};

const createPage = function () {
  const headContent = generateTag('title', '', 'Color Shades') + link();
  const head = generateTag('head', '', headContent);
  const body = generateBody();

  return generateTag('html', '', head + body);
};

const shadesGenerator = function () {
  const htmlCode = createPage();
  writeFileSync('index.html', htmlCode, 'utf8');
};

shadesGenerator();
