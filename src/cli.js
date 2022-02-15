const execa = require('execa');
const exec = require('node-async-exec');
const ora = require('ora');
const chalk = require('chalk');

const cloneBoilerplate = async (url, projName, backend, spinner) => {
	// platform
	const isWindows = process.platform === 'win32' ? true : false;

	// current directory path
	let path;
	isWindows
		? (path = `${process.cwd()}\\${projName}`)
		: (path = `${process.cwd()}/${projName}`);

	spinner.start(`${chalk.bold.dim(`Generating project...`)}`);
	await execa.command(`git clone ${url}`);

	// get default name
	const urlParts = url.split('/');
	const defaultName = urlParts[urlParts.length - 1];

	if (!isWindows) {
		await execa.command(`mv ${defaultName} ${projName}`);
	} else {
		await execa.command(`rename ${defaultName} ${projName}`);
	}

	spinner.succeed(`Project created successfully.`);

	spinner.start(`${chalk.bold.dim(`Installing dependencies...`)}`);
	await exec({ path, cmd: `npm install` });
	if (backend === 'Node.js') {
		await exec({ path: `${path}/server`, cmd: `npm install` });
	}

	spinner.succeed(`Successfully installed dependency.`);
};

module.exports = async input => {
	const { projName, frontend, backend, database } = input;

	const spinner = ora();

	try {
		console.log();

		if (
			frontend === 'React.js' &&
			backend === 'Node.js' &&
			database === 'MongoDB Atlas'
		) {
			await cloneBoilerplate(
				`https://github.com/Accellll/react-express-node-mongodb`,
				projName,
				backend,
				spinner
			);
		}

		console.log();
	} catch (err) {
		spinner.fail(`Couldn't create the project.`);
		console.log();
		console.log(err);
	}
};
