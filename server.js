const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const requestIp = require('request-ip');

// Get user's IP address
app.use(requestIp.mw())

// Routes file
const routes = require('./routes/index');

app.use(cors());

app.use(bodyParser.json());

app.use('/', routes);
app.use(express.static(path.join(__dirname)));

app.listen(8080, () => console.log('Listening on port 8080'));
