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

// firebase packages
const db = require('./config/firebase');
const { setDoc, doc } = require('firebase/firestore');

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

const firebase = `const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: \`\${process.env.Firebase_API_Key}\`,
    authDomain: \`\${process.env.Auth_Domain}\`,
    projectId: \`\${process.env.Project_Id}\`,
    storageBucket: \`\${process.env.Storage_Bucket}\`,
    messagingSenderId: \`\${process.env.Message_Sender_Id}\`,
    appId: \`\${process.env.App_Id}\`,
};

initializeApp(firebaseConfig);

const db = getFirestore();

module.exports = db;`;

const route = `const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).send('Hello World!');
});

module.exports = router;`;

const env = `Firebase_API_Key=REPLACE_Firebase_API_Key
Auth_Domain=REPLACE_Auth_Domain
Project_Id=REPLACE_Project_Id
Storage_Bucket=REPLACE_Storage_Bucket
Message_Sender_Id=REPLACE_Message_Sender_Id
App_Id=REPLACE_App_Id`;

module.exports = { indexJS, route, firebase, env };
