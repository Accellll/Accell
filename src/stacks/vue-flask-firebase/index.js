// packages
const { command } = require('execa');
const fs = require('fs');
const exec = require('node-async-exec');
const handleError = require('node-cli-handle-error');
const ora = require('ora');

// modules
const { appPy, requirements, firebase } = require('./code');
const { start, succeed, fail } = require('../../../functions/spinner');

module.exports = async (projName, isWindows, path) => {
	const spinner = ora();

	try {
		// creating frontend
		start(spinner, `Generating clientside code...`);

		await command(`npm create vite@latest ${projName} -- --template vue`);

		await exec({
			path: `${path}`,
			cmd: `npm install`
		});

		succeed(spinner, `Clientside code generated successfully.`);

		start(spinner, `Creating server files...`);

		// creating and writing in server files
		await exec({ path, cmd: `mkdir server` });
		await exec({ path: `${path}/server`, cmd: `mkdir config` });
		await exec({ path: `${path}/server`, cmd: `virtualenv env` });
		await exec({ path: `${path}/server/config`, cmd: `touch firebase.py` });
		await exec({ path: `${path}/server/config`, cmd: `touch __init__.py` });
		await exec({ path: `${path}/server`, cmd: `touch app.py` });
		await exec({ path: `${path}/server`, cmd: `touch requirements.txt` });

		fs.writeFile(`${path}/server/app.py`, appPy, err => {
			if (err !== null) {
				console.log(err);
			}
		});
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
