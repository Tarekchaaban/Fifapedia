const ClientError = require('./client-error');

function errorMiddleware(err, req, res, next) {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else if (err.table === 'users') {
    console.error(err);
    res.status(401).json({
      error: 'Username is already in use'
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'An unexpected error has occured'
    });
  }
}

module.exports = errorMiddleware;
