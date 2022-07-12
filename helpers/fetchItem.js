const fetchItem = async (id) => {
  try {
    const data = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const response = await data.json(); 
    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
