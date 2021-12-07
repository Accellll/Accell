const execa = require('execa');
const ora = require('ora');
const chalk = require('chalk');

module.exports = async input => {
	const { projName, frontend, backend, database } = input;

	// platform
	const isWindows = process.platform === 'win32' ? true : false;

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
		}

		spinner.succeed(`Project created successfully.`);
		console.log();
	} catch (err) {
		spinner.fail(`Couldn't create the project.`);
		console.log();
		console.log(err);
	}
};
