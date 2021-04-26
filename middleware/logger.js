const logger = (req, res, next) => {
  console.log(`Handling ${req.method} request to ${req.path}`);
  next()
}

module.exports = logger