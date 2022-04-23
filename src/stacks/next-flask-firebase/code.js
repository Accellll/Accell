const firebase = `from firebase_admin import credentials, firestore, initialize_app

def initialize_firebase():
	cred = credentials.Certificate('key.json')
	default_app = initialize_app(cred)
	db = firestore.client()
	return db`;

const appPy = `# IMPORT
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
from config.firebase import initialize_firebase

# loading environment variables
load_dotenv(find_dotenv())

# APP SETUP
app = Flask(__name__)
# enable resource sharing between frontend and server
CORS(app)

# initializing firebase
db = initialize_firebase()

# ROUTES
@app.route('/hello', methods=['GET'])
def hello():
	return 'Hello World!'

if __name__ == "__main__":
    app.run(debug=True)`;

const requirements = `firebase_admin==5.2.0
Flask==2.0.2
Flask_Cors==3.0.10
python-dotenv==0.20.0`;

module.exports = { firebase, appPy, requirements };
