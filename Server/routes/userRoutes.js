const { userCreate,userList,userLogin } = require('../controllers/userController')

const routes = (data) => {
    data.post('/api/user', userCreate);
    data.post('/api/auth',userLogin)
    data.get('/api/user',userList);
}

module.exports = routes