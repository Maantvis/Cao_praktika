const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const articleRoutes = require('./userRoutes/articleRoutes');
const userRoutes = require('./userRoutes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/v1', userRoutes);
app.use('/v1', articleRoutes);

app.listen(PORT, () => console.log('serveris veikia', PORT));
