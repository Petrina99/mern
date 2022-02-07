const { urlencoded } = require('body-parser');
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use('/api/tasks', require('./routes/taskRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

