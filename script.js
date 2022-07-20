const sectionProduct = document.querySelector('.items'); // section responsavél pelos items;
const listCart = document.querySelector('.cart__items'); // ol repnsavel pelos items d carrinho;
const emptyCar = document.querySelector('.empty-cart'); // Btn esvaziar carrinho;

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const mensagemLoadingApi = () => {
  const msgLoading = document.createElement('p');
  msgLoading.className = 'loading';
  msgLoading.innerText = 'carregando...';
  sectionProduct.appendChild(msgLoading);
};
const removeMessage = () => document.querySelector('.loading').remove();

// Retornar os produtos vindos da API do Mercado Livre:
const getProductoApi = async () => {
  mensagemLoadingApi();
  const apiProduct = await fetchProducts('computador');
  const { results } = apiProduct; // array de obj com o retorno da api para 'computador'
  results.forEach((element) => {
    const productObject = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    sectionProduct.appendChild(createProductItemElement(productObject));
  });
  removeMessage();
};

/* const getSkuFromProductItem = () => document.querySelector('span.item__sku').innerText; */

// Remove item do carrinho
const cartItemClickListener = (event) => { // requisito 5
  listCart.removeChild(event.target); // removendo filho do elemento 'Pai'
  saveCartItems(listCart.innerHTML);
};
// remove itens salvos
const removeItemSaved = () => {
  const ItemSavedCar = listCart.childNodes; // Retorna Nodelist com os nós filhos 
  ItemSavedCar.forEach((element) => element.addEventListener('click', cartItemClickListener));
};

// Remove Todos os items:
const removAllItems = () => {
  emptyCar.addEventListener('click', () => {
    listCart.innerHTML = '';
  });
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// As duas funções ( addProductTocart ) abaixo eu tive ajuda do colega Victor Matias. Que me ajudou a vizualizar o motivo de não estar funcionando.

// Outra maneira de resolver a questão 4.
const addProducTocart = async ({ target }) => {
  const clicked = target.parentElement.firstChild.innerText;
  const carItems = await fetchItem(clicked);
  const { id, title, price } = carItems;
  listCart.appendChild(createCartItemElement({
    sku: id,
    name: title,
    salePrice: price,
 }));
 saveCartItems(listCart.innerHTML);
};

// Adicionado itens ao carrinho
/* const addProducTocart = async () => {
  const cartItems = getSkuFromProductItem(); // retorna o id do produto que ser ausado em fechItem
  const clicked = await fetchItem(cartItems);
  const { id, title, price } = clicked;
  listCart.appendChild(createCartItemElement({
    sku: id,
    name: title,
    salePrice: price,
 }));
}; */

// Btão de click pra adicionar produtos no carrinho.
 const buttonAddCar = () => {
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((button) => button.addEventListener('click', addProducTocart));
  return addButtons;
};

window.onload = () => {
  getProductoApi().then(() => {
    buttonAddCar();
  });
  listCart.innerHTML = getSavedCartItems();
  removeItemSaved();
  removAllItems();
}; 
