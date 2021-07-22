const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {
  try {
    const token = req.headers['x-access-token'];
    if (!token) throw new ClientError(401, 'authentication required');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authorizationMiddleware;
