// Logger: prints method and URL of every request
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

// requireAuth: protects routes with a header token
function requireAuth(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (token !== 'secret123') {
    return res.status(401).json({ error: 'Unauthorized: missing or invalid token' });
  }
  next();
}

// 404 handler for unknown URLs
function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.url}` });
}

// Error handler: must have 4 parameters
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
}

module.exports = { logger, requireAuth, notFound, errorHandler };