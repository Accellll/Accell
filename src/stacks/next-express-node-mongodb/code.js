const indexJS = `/**
*
* Author:
* GitHub:
*/

// importing packages
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const initDB = require('./db/connection');

// initialing database
initDB();

// importing routes
const hello = require('./routes/hello');

// middlewares
app.use(express.json());
app.use(cors());

// adding routes
app.use('/hello', hello);

// port
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(\`Listening on Port: \${port}\`));`;

const route = `const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).send('Hello World!');
});

module.exports = router;`;

const connection = `const mongoose = require('mongoose');

module.exports = () => {
    const db = process.env.MONGODB_ATLAS_DB_LINK;

    // initializing remote connection
    mongoose
        .connect(db, {
            useNewUrlParser: true,
        })
        .then(() => {
            console.log('Connection successful.');
        })
        .catch(err => {
            console.log('Connection failed.');
            console.log(err);
        });
};`;

const env = `MONGODB_ATLAS_DB_LINK=REPLACE_WITH_YOUR_MONGODB_ATLAS_DB_LINK`;

module.exports = { indexJS, route, connection, env };
