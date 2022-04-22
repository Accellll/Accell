// packages
const { command } = require('execa');
const fs = require('fs');
const exec = require('node-async-exec');
const handleError = require('node-cli-handle-error');
const ora = require('ora');

// modules
const { start, succeed, fail } = require('../../../functions/spinner');
const { settings, env, requirements } = require('./code');

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
		await exec({ path, cmd: `pip install django` });
		await exec({ path, cmd: `django-admin startproject server` });
		await exec({ path: `${path}/server`, cmd: `touch .env` });

		fs.writeFile(`${path}/server/server/settings.py`, settings, err => {
			if (err !== null) {
				console.log(err);
			}
		});
		fs.writeFile(`${path}/server/.env`, env, err => {
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
		fail(spinner, `Couldn't create the project.`);
		console.log(err);
		handleError(err);
	}
};
