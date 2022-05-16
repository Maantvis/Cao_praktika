const express = require('express');
const { PORT } = require('./config');
const userRoutes = require('./userRoutes/userRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/v1', userRoutes);

app.listen(PORT, () => console.log('serveris veikia', PORT));
