const {createPayment,verifyPayment} = require('../controllers/paymentController');


const routes =(data)=>{
    data.post('/api/payment',createPayment);
    data.get('/api/payment/verify/:orderId',verifyPayment);
}


module.exports = routes