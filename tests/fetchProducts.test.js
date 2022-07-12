require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  it('Teste se fetchProducts é uma função', () => {
    expect( typeof(fetchProducts)).toBe('function');
  });

  it('Teste se, quando chamada com o argumento "computador", o fetch é chamado', async () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se , ao chamar a função fetchProducts com o argumento "computador" , o fecth utiliza o endpoint correto ', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(url);
  });

  it('Teste se, o retorno da função fetchProducts como o argumento "computador" é uma estrutura de dados igual ao objeto "computadorSearch".', async ()=> {
    const object = await fetchProducts('computador');
    expect(object).toEqual(computadorSearch);
  });

  it('Teste se, ao chamar a função fetchProducts sem arguemnto, retorna um erro com a mensagem: "You must provide an url" .', async () => {
    const result = await fetchProducts();
    expect(result).toEqual(new Error('You must provide an url'));
  })
});
