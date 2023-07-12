const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const corsOPtion = require('./config/corsOption')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const { threadId } = require("worker_threads");
const PORT = process.env.PORT || 3500;
//logger
app.use(logger);
//cors

app.use(cors(corsOPtion));
//express 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
//routh
app.use('/', require('./routh/root'))
app.use('/employees', require('./routh/api/employees.js'));
//error handler
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));