const { writeFileSync } = require('fs');

const generateTag = function(tag, content){
  return '<' + tag + '>' + content + '</' + tag + '>';
};

const link = function(){
  return '<link rel="stylesheet" href="styles.css"/>';
};

const createPage = function () {
  const headContent = generateTag('title', 'Color Shades') + link();
  const head = generateTag('head', headContent);
  const body = generateTag('body', '');
  return generateTag('html', head + body);
};

const shadesGenerator = function () {
  const htmlCode = createPage();
  writeFileSync('index.html', htmlCode, 'utf8');
};

shadesGenerator();
