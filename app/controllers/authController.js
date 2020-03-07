import jwt from 'jsonwebtoken';

import AUTH_CONSTANTS from '../constants/auth';

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === 'ferreiradev' && password === 'ferreiradev') {
    const token = jwt.sign(
      { username: 'ferreiradev' },
      AUTH_CONSTANTS.JWT_SECRET,
      {
        expiresIn: 120,
      }
    ); // 2 min token
    // return it back
    res.status(200).send({ token });
  }

  res.status(401).send({ error: 'User not found' });
};

const ping = (req, res) => {
  res.status(200).send({ msg: 'pong' });
};

export default {
  login,
  ping,
};
