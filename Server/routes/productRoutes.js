const {productCreate,productDelete,productList,productUpdate} = require('../controllers/productConrtoller')

const routes = (data) => {
    data.post('/api/products', productCreate);
    data.get('/api/products', productList);
    data.patch('/api/products/:id', productUpdate);
    data.delete('/api/products/:id', productDelete);
}

module.exports = routes