const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes file
const routes = require('./routes/index');

app.use(cors());

app.use(bodyParser.json());

app.use('/', routes);
app.use(express.static(path.join(__dirname)));

app.listen(8080, () => console.log('Listening on port 8080'));