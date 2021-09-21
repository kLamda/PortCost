const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const api = require('./router/api');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

const host = '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, () => {
    console.log(`Server is listening on ${host} at ${port}`);
});
