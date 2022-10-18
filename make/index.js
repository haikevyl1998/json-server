const fs = require('fs');
const path = require('path');
const { makeSlug } = require('./helpers');

const getJsonFile = (name) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, `../data/${name}.json`), 'utf8').toString());

const categories = getJsonFile('categories').map(({ id, name, image }) => ({
  id,
  name,
  image: `static/images/categories/${image}`,
  slug: makeSlug(name),
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}));

const products = getJsonFile('products').map(
  ({ name, price, salePrice, images, categoryId }, idx) => ({
    id: idx,
    name,
    price,
    salePrice,
    categoryId,
    images,
    slug: makeSlug(name),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  })
);

fs.writeFileSync('db.json', JSON.stringify({ categories, products }));
