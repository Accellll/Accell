const execa = require('execa');
const exec = require('node-async-exec');
const handleError = require('node-cli-handle-error');
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

		// react.js, node.js, express.js, mongodb boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Node.js' &&
			database === 'MongoDB'
		) {
			await cloneBoilerplate(
				`https://github.com/Accellll/react-express-node-mongodb`,
				projName,
				backend,
				spinner
			);
		}

		// react.js, django, mongodb boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Django' &&
			database === 'MongoDB'
		) {
			await cloneBoilerplate(
				`https://github.com/Accellll/react-django-mongodb`,
				projName,
				backend,
				spinner
			);
		}

		// react.js, flask, mongodb boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Flask' &&
			database === 'MongoDB'
		) {
			await cloneBoilerplate(
				`https://github.com/Accellll/react-flask-mongodb`,
				projName,
				backend,
				spinner
			);
		}

		// next.js, node.js, express.js, mongodb boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Node.js' &&
			database === 'MongoDB'
		) {
			await cloneBoilerplate(
				`https://github.com/Accellll/next-node-express-mongodb`,
				projName,
				backend,
				spinner
			);
		}

		// next.js, django, mongodb boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Django' &&
			database === 'MongoDB'
		) {
			await cloneBoilerplate(
				`https://github.com/Accellll/next-django-mongodb`,
				projName,
				backend,
				spinner
			);
		}

		// next.js, flask, mongodb boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Flask' &&
			database === 'MongoDB'
		) {
			await cloneBoilerplate(
				`https://github.com/Accellll/next-flask-mongodb`,
				projName,
				backend,
				spinner
			);
		}

		// vue.js, node.js, express.js, mongodb boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Node.js' &&
			database === 'MongoDB'
		) {
			await cloneBoilerplate(
				`https://github.com/Accellll/vue-node-express-mongodb`,
				projName,
				backend,
				spinner
			);
		}

		// vue.js, django, mongodb boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Django' &&
			database === 'MongoDB'
		) {
			await cloneBoilerplate(
				`https://github.com/Accellll/vue-django-mongodb`,
				projName,
				backend,
				spinner
			);
		}

		// vue.js, flask, mongodb boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Flask' &&
			database === 'MongoDB'
		) {
			await cloneBoilerplate(
				`https://github.com/Accellll/vue-flask-mongodb`,
				projName,
				backend,
				spinner
			);
		}

		console.log();
	} catch (err) {
		spinner.fail(`Couldn't create the project.`);
		console.log();
		handleError(`Failed while generating the boilerplate`, err);
	}
};
