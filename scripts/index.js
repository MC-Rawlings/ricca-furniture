const rootElement = document.querySelector('#root');
const products = fetch(
  'https://fedsa-project-1.herokuapp.com/project-1/products',
)
  .then((response) => response.json())
  .then((data) => data);

const generateProductCard = (element) => {
  const listItem = document.createElement('li');
  const image = document.createElement('img');
  const productInfo = document.createElement('div');
  const productHeading = document.createElement('div');
  const productName = document.createElement('h3');
  const productDescription = document.createElement('p');
  const productDetails = document.createElement('div');
  const productPrice = document.createElement('div');
  const oldPrice = document.createElement('p');
  const newPrice = document.createElement('p');
  const productActions = document.createElement('div');
  const favoriteIcon = document.createElement('button');
  const cartIcon = document.createElement('button');

  listItem.className = 'product';
  image.className = 'product-img';
  image.src = `${element.image}`;
  image.alt = 'image of chair';
  productInfo.className = 'product-info';
  productHeading.className = 'product-heading';
  productName.className = 'product-name';
  productName.textContent = `${element.title}`;
  productDescription.className = 'product-description';
  productDescription.textContent = `${element.description}`;
  productDetails.className = 'product-details';
  productPrice.className = 'product-price';
  oldPrice.className = 'old-price';
  oldPrice.textContent = `${element.price}`;
  newPrice.className = 'new-price';
  newPrice.textContent = `${element.discountedPrice}`;
  productActions.className = 'product-actions';
  favoriteIcon.className = 'favorite-icon';
  cartIcon.className = 'cart-icon';
  cartIcon.addEventListener('click', () => shoppingCart.addToCart(element));

  productHeading.appendChild(productName);
  productHeading.appendChild(productDescription);
  productPrice.appendChild(oldPrice);
  productPrice.appendChild(newPrice);
  productActions.appendChild(favoriteIcon);
  productActions.appendChild(cartIcon);
  productDetails.appendChild(productPrice);
  productDetails.appendChild(productActions);
  productInfo.appendChild(productHeading);
  productInfo.appendChild(productDetails);
  listItem.appendChild(image);
  listItem.appendChild(productInfo);

  return listItem;
};

const shoppingCart = (() => {
  const items = [];

  const getItems = () => items;

  const addToCart = (item) => {
    items.push(item);
  };

  return {
    getItems,
    addToCart,
  };
})();

console.log(shoppingCart.getItems());

const render = () => {
  products.then((arr) => {
    const list = document.createElement('ul');

    arr.forEach((element) => {
      list.appendChild(generateProductCard(element));
    });
    rootElement.appendChild(list);
  });
};

render();
