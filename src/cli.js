const handleError = require('node-cli-handle-error');
const ora = require('ora');

// stacks
const renm = require('./stacks/react-express-node-mongodb');
const rfm = require('./stacks/react-flask-mongodb');
const rdm = require('./stacks/react-django-mongodb');
const nenm = require('./stacks/next-express-node-mongodb');

module.exports = async input => {
	const { projName, frontend, backend, database } = input;

	const spinner = ora();

	// platform
	const isWindows = process.platform === 'win32' ? true : false;

	// current directory path
	let path;
	isWindows
		? (path = `${process.cwd()}\\${projName}`)
		: (path = `${process.cwd()}/${projName}`);

	try {
		console.log();

		// react.js, node.js, express.js, mongodb boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Node.js' &&
			database === 'MongoDB'
		) {
			await renm(projName, isWindows, path);
		}

		// react.js, django, mongodb boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Django' &&
			database === 'MongoDB'
		) {
			await rdm(projName, isWindows, path);
		}

		// react.js, flask, mongodb boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Flask' &&
			database === 'MongoDB'
		) {
			await rfm(projName, isWindows, path);
		}

		// next.js, node.js, express.js, mongodb boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Node.js' &&
			database === 'MongoDB'
		) {
			await nenm(projName, isWindows, path);
		}

		// next.js, django, mongodb boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Django' &&
			database === 'MongoDB'
		) {
		}

		// next.js, flask, mongodb boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Flask' &&
			database === 'MongoDB'
		) {
		}

		// vue.js, node.js, express.js, mongodb boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Node.js' &&
			database === 'MongoDB'
		) {
		}

		// vue.js, django, mongodb boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Django' &&
			database === 'MongoDB'
		) {
		}

		// vue.js, flask, mongodb boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Flask' &&
			database === 'MongoDB'
		) {
		}

		console.log();
	} catch (err) {
		spinner.fail(`Couldn't create the project.`);
		console.log();
		handleError(`Failed while generating the boilerplate`, err);
	}
};
