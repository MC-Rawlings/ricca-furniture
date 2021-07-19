const rootElement = document.querySelector('#root');
const cartTotal = document.querySelector('#cart-total');
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
  favoriteIcon.addEventListener('click', () => {
    likedItems.addToLiked(element);
    render();
  });
  const isLiked = likedItems.getLiked();
  isLiked.forEach((liked) => {
    if (liked.title === element.title) {
      favoriteIcon.style.background =
        'url(./styles/images/heart-active-icon.svg) no-repeat center';
    }
  });
  cartIcon.className = 'cart-icon';
  cartIcon.addEventListener('click', () => {
    shoppingCart.addToCart(element);
    render();
  });

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

const loadMore = (() => {
  let currentShowing = 3;
  const button = document.querySelector('#more-products');

  button.addEventListener('click', () => {
    currentShowing += 3;
    render(currentShowing);
  });
})();

const generateTotalContainer = () => {
  const totalInfo = document.createElement('p');
  totalInfo.textContent = `The total cost of your products is: R${shoppingCart.getTotalCost()}`;

  if (shoppingCart.getTotalCost() > 0) {
    cartTotal.style.position = 'fixed';
    cartTotal.style.bottom = '0';
  }

  return totalInfo;
};

const shoppingCart = (() => {
  const items = [];

  const getItems = () => items;

  const addToCart = (item) => {
    items.push(item);
    getTotalCost();
  };

  const getTotalCost = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.discountedPrice;
    });
    return total.toFixed(2);
  };

  return {
    getItems,
    addToCart,
    getTotalCost,
  };
})();

const likedItems = (() => {
  const liked = [];

  const getLiked = () => liked;

  const addToLiked = (item) => {
    if (liked.find((liked) => liked.title === item.title) === undefined) {
      liked.push(item);
    }
  };

  return {
    getLiked,
    addToLiked,
  };
})();

const styleLiked = () => {};

const clearDOM = () => {
  while (rootElement.firstChild) {
    rootElement.removeChild(rootElement.lastChild);
  }
  while (cartTotal.firstChild) {
    cartTotal.removeChild(cartTotal.firstChild);
  }
};

const render = (itemsToRender = 3) => {
  clearDOM();
  products.then((arr) => {
    const list = document.createElement('ul');

    arr.forEach((element, index) => {
      if (index < itemsToRender) {
        list.appendChild(generateProductCard(element));
      }
    });
    rootElement.appendChild(list);
    cartTotal.append(generateTotalContainer());
  });
};

render();
