const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  const items = '<ol><li>Item</li></ol>';

  it('Teste se, ao executar saveCArtItems com o argumento "<ol><li>Item</li></ol>", o metodo "localStorage.setItem" é chamado', () => {

    saveCartItems(items);
    expect(localStorage.setItem).toHaveBeenCalled();

  })
  it('Testa se, ao executar savecartItems com o argumento "<ol><li>Item</li></ol>", o metodo "localStorage.setItem" é chamado com dois parâmetros.',() => {

    saveCartItems(items);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', items);

  });

});
