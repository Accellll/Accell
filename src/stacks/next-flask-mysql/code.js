const appPy = `# IMPORT
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
from flask_mysqldb import MySQL

# loading environment variables
load_dotenv(find_dotenv())

# APP SETUP
app = Flask(__name__)
# enable resource sharing between frontend and server
CORS(app)

# initializing db (uncomment when added db config in .env)
""" app.config["MYSQL_HOST"] = os.getenv('DB_HOST')
app.config["MYSQL_USER"] = os.getenv('DB_USER')
app.config["MYSQL_PASSWORD"] = os.getenv('DB_PASSWORD')
app.config["MYSQL_DB"] = os.getenv('DB_NAME')
app.config["MYSQL_CURSORCLASS"] = "DictCursor"

mysql = MySQL(app)

@app.route('/')
def index():
	cur = mysql.connection.cursor()
	cur.execute('''CREATE DATABASE USER''')
	mysql.connection.commit()
	return 'DONE' """

# ROUTES
@app.route('/hello', methods=['GET'])
def hello():
	return 'Hello World!'

if __name__ == "__main__":
	app.run(debug=True)`;

const env = `DB_HOST=REPLACE_WITH_DB_HOST
DB_USER=REPLACE_WITH_DB_USER
DB_PASSWORD=REPLACE_WITH_DB_PASSWORD
DB_NAME=REPLACE_WITH_DB_NAME`;

const requirements = `Flask==2.0.2
Flask_Cors==3.0.10
Flask_MySQLdb==1.0.1
python-dotenv==0.20.0`;

module.exports = { appPy, requirements, env };
