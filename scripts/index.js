const products = fetch(
  'https://fedsa-project-1.herokuapp.com/project-1/products',
)
  .then((response) => response.json())
  .then((data) => data);

const render = () => {
  const rootElement = document.querySelector('#root');
  products.then((arr) => {
    arr.forEach((element) => {
      console.log(element);
    });
  });
};

render();
