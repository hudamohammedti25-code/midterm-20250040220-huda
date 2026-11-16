const express = require('express');
const menusRouter = require('./routes/menus');
const { logger, notFound, errorHandler } = require('./middleware');
const app = express();
const PORT = 3000;

app.use(logger);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Coffee Shop API by Huda Mohammed - Theme: Coffee Shop Menu');
});

app.use('/menus', menusRouter);

app.get('/files/*path', (req, res) => {
  res.json({ path: req.params.path });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});