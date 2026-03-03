const app = require('./server');

app.use((err, req, res, next) => {
  // If headers already sent, delegate to default Express handler
  if (res.headersSent) return next(err);

  console.error(err);

  const status = err.statusCode || err.status || 500;
  const message =
    status >= 500 ? "Internal server error" : err.message || "Request failed";

  return res.status(status).json({
    code: status,
    message,
    data: null,
  });
});

app.use((req, res) => {
  res.status(404).json({ code: 404, message: "Route not found", data: null });
});

app.listen(3000, () => {}); 