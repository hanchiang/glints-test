
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  }
}

exports.notFound = (req, res, next) => {
  const err = new Error(`Oops! ${req.path} is not found.`);
  err.status = 404;
  next(err);
};

exports.errors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const error = {
    type: err.name,
    message: err.message
  };
  if (process.env.NODE_ENV !== 'production') {
    error.stack = err.stack
  }
  res.status(err.status || 500).json({ error });
};