import express from 'express';
import bodyParser from 'body-parser';

import authMiddleware from './app/middlewares/authMiddleware';

// Controllers
import authController from './app/controllers/authController';

const app = express();
const port = 3001;

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

app.use(authMiddleware);

app.post('/api/login', authController.login);

app.get('/api/ping', authController.ping);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
