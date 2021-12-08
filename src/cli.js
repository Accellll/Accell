const execa = require('execa');
const exec = require('node-async-exec');
const ora = require('ora');
const chalk = require('chalk');

module.exports = async input => {
	const { projName, frontend, backend, database } = input;

	// platform
	const isWindows = process.platform === 'win32' ? true : false;

	// current directory path
	let path;
	isWindows
		? (path = `${process.cwd()}\\${projName}`)
		: (path = `${process.cwd()}/${projName}`);

	const spinner = ora();

	try {
		console.log();
		spinner.start(`${chalk.bold.dim(`Generating project...`)}`);

		if (
			frontend === 'React.js' &&
			backend === 'Node.js' &&
			database === 'MongoDB Atlas'
		) {
			await execa.command(`git clone https://github.com/Accellll/MERN`);

			if (!isWindows) {
				await execa.command(`mv MERN ${projName}`);
			} else {
				await execa.command(`rename MERN ${projName}`);
			}

			spinner.succeed(`Project created successfully.`);

			spinner.start(`${chalk.bold.dim(`Installing dependencies...`)}`);
			await exec({ path, cmd: `npm install` });
			await exec({ path: `${path}/server`, cmd: `npm install` });
			spinner.succeed(`Successfully installed dependency.`);
		}

		console.log();
	} catch (err) {
		spinner.fail(`Couldn't create the project.`);
		console.log();
		console.log(err);
	}
};
