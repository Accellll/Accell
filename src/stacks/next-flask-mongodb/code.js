const appPy = `# IMPORT
import os
from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv, find_dotenv

# loading environment variables
load_dotenv(find_dotenv())

# APP SETUP
app = Flask(__name__)
# enable resource sharing between frontend and server
CORS(app)

# DB
mongo = PyMongo()
app.config['MONGO_URI'] = os.getenv('MONGODB_ATLAS_DB_LINK')

mongo.init_app(app)

# ROUTES
@app.route('/hello', methods=['GET'])
def hello():
	return 'Hello World!'

if __name__ == "__main__":
    app.run(debug=True)`;

const env = `MONGODB_ATLAS_DB_LINK=REPLACE_WITH_YOUR_MONGODB_ATLAS_DB_LINK`;

const requirements = `Flask==2.0.2
flask_cors==3.0.10
flask_pymongo==2.3.0
python-dotenv==0.19.2`;

module.exports = { appPy, env, requirements };
