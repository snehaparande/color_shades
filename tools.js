const openingTag = (tag, attributes) => '<' + tag + ' ' + attributes + '>';

const closingTag = tag => '</' + tag + '>';

const createTag = function (tag, attributes, content) {
  return openingTag(tag, attributes) + content + closingTag(tag);
};

const attribute = ({ attr, value }) => {
  return attr + '="' + value + '"';
};

const attributes = (attrs) => {
  return attrs.map(attr => attribute(attr)).join(' ');
};

const link = () => '<link rel="stylesheet" href="styles.css"/>';

exports.createTag = createTag;
exports.attributes = attributes;
exports.link = link;
