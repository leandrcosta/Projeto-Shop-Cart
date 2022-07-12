require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {

  it('Teste se fetchItem é uma função', () => {
    expect( typeof(fetchItem)).toBe('function');
  });

  it('Teste se, quando chamada com o argumento do item "MLB1615760527", o fetch é chamado', async () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se , ao chamar a função fetchItem com o item "MLB1615760527", o fecth utiliza o endpoint correto ', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  });

  it('Teste se, o retorno da função fetchProducts como o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto "item".', async ()=> {
    const object = await fetchItem('MLB1615760527');
    expect(object).toEqual(item);
  });

  it('Teste se, ao chamar a função fetchItem sem arguemnto, retorna um erro com a mensagem: "You must provide an url" .', async () => {
    const objectItem = await fetchItem();
    expect(objectItem).toEqual(new Error('You must provide an url'));
  })
});
