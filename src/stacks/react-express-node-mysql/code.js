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
const db = require('./db/connection');

// database (uncomment when you have added your database details in .env file)
// db.query(\`SELECT * FROM USERS\`);

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

const connection = `const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});`;

const env = `DB_HOST=REPLACE_WITH_DB_HOST
DB_USER=REPLACE_WITH_DB_USER
DB_PASSWORD=REPLACE_WITH_DB_PASSWORD
DB_NAME=REPLACE_WITH_DB_NAME`;

module.exports = { indexJS, route, connection, env };
