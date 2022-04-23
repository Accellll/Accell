// packages
const { command } = require('execa');
const fs = require('fs');
const exec = require('node-async-exec');
const handleError = require('node-cli-handle-error');
const ora = require('ora');

// modules
const { requirements, firebase } = require('./code');
const { start, succeed, fail } = require('../../../functions/spinner');

module.exports = async (projName, isWindows, path) => {
	const spinner = ora();

	try {
		// creating frontend
		start(spinner, `Generating clientside code...`);

		await command(`npx create-react-app@latest ${projName}`);

		succeed(spinner, `Clientside code generated successfully.`);

		start(spinner, `Creating server files...`);

		// creating and writing in server files
		await exec({ path, cmd: `pip install django` });
		await exec({ path, cmd: `django-admin startproject server` });
		await exec({ path: `${path}/server`, cmd: `mkdir config` });
		await exec({ path: `${path}/server`, cmd: `virtualenv env` });
		await exec({ path: `${path}/server/config`, cmd: `touch firebase.py` });
		await exec({ path: `${path}/server/config`, cmd: `touch __init__.py` });
		await exec({ path: `${path}/server`, cmd: `touch requirements.txt` });

		fs.writeFile(`${path}/server/config/firebase.py`, firebase, err => {
			if (err !== null) {
				console.log(err);
			}
		});
		fs.writeFile(`${path}/server/requirements.txt`, requirements, err => {
			if (err !== null) {
				console.log(err);
			}
		});

		succeed(spinner, `Server files created successfully.`);
	} catch (err) {
		console.log(err);
		fail(spinner, `Couldn't create the project.`);
		console.log();
		handleError(err);
	}
};
