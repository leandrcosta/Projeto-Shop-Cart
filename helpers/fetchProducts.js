const fetchProducts = async (product) => {
  try {
    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    const response = await data.json();
    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
