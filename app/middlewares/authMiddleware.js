import jwt from 'jsonwebtoken';

import AUTH_CONSTANTS from '../constants/auth';

const authMiddleware = (req, res, next) => {
  if (req.path === '/api/login') {
    // next middleware
    return next();
  }

  // get token from request header Authorization
  const token = req.headers.authorization;

  // Debug print
  // console.log('');
  // console.log(req.path);
  // console.log('authorization:', token);

  // Token verification
  try {
    const decoded = jwt.verify(token, AUTH_CONSTANTS.JWT_SECRET);
    console.log('decoded', decoded);
  } catch (err) {
    // Catch the JWT Expired or Invalid errors
    return res.status(401).json({ msg: err.message });
  }

  return next();
};

export default authMiddleware;
