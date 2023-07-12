const Joi = require('joi');
const express = require('express');
const router = require('./router/router')
const app = express();

app.use(express.json());
app.use('/api/genera', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));