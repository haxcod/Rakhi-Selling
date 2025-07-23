const { orderCreate, orderList, orderUpdate } = require('../controllers/orderController')

const routes = (data) => {
    data.post('/api/orders', orderCreate);
    data.get('/api/orders', orderList)
    data.patch('/api/orders/:id', orderUpdate);    
}

module.exports = routes