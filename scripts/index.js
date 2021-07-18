const fetchProducts = () => {
  fetch('https://fedsa-project-1.herokuapp.com/project-1/products')
    .then((response) => response.json())
    .then((data) => data);
};

const products = fetchProducts();
