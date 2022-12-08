const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');
  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authentication denied' });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
    print('okay');
  }
};
//hshah
//export it as a function that takes in req, res and next
//then get the token from header
