// packages
const { command } = require('execa');
const fs = require('fs');
const exec = require('node-async-exec');
const handleError = require('node-cli-handle-error');
const ora = require('ora');

// modules
const { indexJS, route, firebase, env } = require('./code');
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
		await exec({ path: `${path}/server`, cmd: `npm init -y` });
		await exec({ path: `${path}/server`, cmd: `touch index.js` });
		await exec({ path: `${path}/server`, cmd: `touch .env` });
		await exec({ path: `${path}/server`, cmd: `mkdir routes` });
		await exec({ path: `${path}/server`, cmd: `mkdir config` });
		await exec({ path: `${path}/server/routes`, cmd: `touch hello.js` });
		await exec({ path: `${path}/server/config`, cmd: `touch firebase.js` });

		fs.writeFile(`${path}/server/index.js`, indexJS, err => {
			if (err !== null) {
				console.log(err);
			}
		});
		fs.writeFile(`${path}/server/routes/hello.js`, route, err => {
			if (err !== null) {
				console.log(err);
			}
		});
		fs.writeFile(`${path}/server/config/firebase.js`, firebase, err => {
			if (err !== null) {
				console.log(err);
			}
		});
		fs.writeFile(`${path}/server/.env`, env, err => {
			if (err !== null) {
				console.log(err);
			}
		});

		succeed(spinner, `Server files created successfully.`);

		// installing all dependencies
		start(spinner, `Installing server dependencies...`);

		await exec({
			path: `${path}/server`,
			cmd: `npm install express cors dotenv firebase`
		});

		succeed(spinner, `Dependencies installed successfully.`);
	} catch (err) {
		fail(spinner, `Couldn't create the project.`);
		console.log();
		handleError(err);
	}
};
