const {
  createUser,
  getUsers,
  loginUser,
} = require('../services/userServices');

const userCreate = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const user = await createUser(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const userList = async (req, res) => {
  try {
    const users = await getUsers();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }

  try {
    const user = await loginUser(email, password);
    res.status(200).json({ success: true, message: 'Login successful', user });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
};

module.exports = { userCreate, userList, userLogin };
