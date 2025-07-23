const { orderCreate, orderList, orderUpdate,userOrderList } = require('../controllers/orderController')

const routes = (data) => {
    data.post('/api/orders', orderCreate);
    data.get('/api/orders', orderList)
    data.patch('/api/orders/:id', orderUpdate);   
   data.get('/api/orders/user/:id', userOrderList)
}

module.exports = routes