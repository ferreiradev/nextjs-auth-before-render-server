import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const app = express();
const port = 3001;
const jwtSecret = 'MY_SECRET';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(function(req, res, next) {
  // Allow Origins
  res.header('Access-Control-Allow-Origin', '*');
  // Allow Methods
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  // Allow Headers
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Content-Type, Authorization'
  );
  // Handle preflight, it must return 200
  if (req.method === 'OPTIONS') {
    // Stop the middleware chain
    return res.status(200).end();
  }
  // Next middleware
  return next();
});

app.use((req, res, next) => {
  if (req.path === '/api/login') {
    // next middleware
    return next();
  }

  // get token from request header Authorization
  const token = req.headers.authorization;

  // Debug print
  console.log('');
  console.log(req.path);
  console.log('authorization:', token);

  // Token verification
  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log('decoded', decoded);
  } catch (err) {
    // Catch the JWT Expired or Invalid errors
    return res.status(401).json({ msg: err.message });
  }

  next();
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'ferreiradev' && password === 'ferreiradev') {
    const token = jwt.sign({ username: 'ferreiradev' }, jwtSecret, {
      expiresIn: 120,
    }); // 3 min token
    // return it back
    res.json({ token });
  }

  res.status(401).send({ error: 'User not found' });
});

app.get('/api/ping', (req, res) => {
  res.status(200).send({ msg: 'pong' });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
