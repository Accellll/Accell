const firebase = `from firebase_admin import credentials, firestore, initialize_app

def initialize_firebase():
	cred = credentials.Certificate('key.json')
	default_app = initialize_app(cred)
	db = firestore.client()
	return db`;

const requirements = `Django==4.0.1
firebase_admin==5.2.0`;

module.exports = { firebase, requirements };
