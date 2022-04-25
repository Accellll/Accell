// packages
const { command } = require('execa');
const fs = require('fs');
const exec = require('node-async-exec');
const handleError = require('node-cli-handle-error');
const ora = require('ora');

// modules
const { appPy, requirements, env } = require('./code');
const { start, succeed, fail } = require('../../../functions/spinner');

module.exports = async (projName, isWindows, path) => {
	const spinner = ora();

	try {
		// creating frontend
		start(spinner, `Generating clientside code...`);

		await command(`npx create-next-app@latest ${projName}`);

		succeed(spinner, `Clientside code generated successfully.`);

		start(spinner, `Creating server files...`);

		// creating and writing in server files
		await exec({ path, cmd: `mkdir server` });
		await exec({ path: `${path}/server`, cmd: `touch app.py` });
		await exec({ path: `${path}/server`, cmd: `touch .env` });
		await exec({ path: `${path}/server`, cmd: `touch requirements.txt` });

		fs.writeFile(`${path}/server/app.py`, appPy, err => {
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
		console.log(err);
		fail(spinner, `Couldn't create the project.`);
		console.log();
		handleError(err);
	}
};
