const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'defaultSecret';


module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const findUsername = await User.findOne({ username });
    if (findUsername) {
      return res
        .status(400)
        .json({ error: "Username already exists", status: false });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res
        .status(400)
        .json({ error: "Email already exists", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json({ staus: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Invalid username or password", status: false });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(404)
        .json({ error: "Invalid username or password", status: false });
    }
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '2h', 
    });

    return res.json({ status: true, user, token });
  } catch (error) {
    next(error);
  }
};