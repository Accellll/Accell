const handleError = require('node-cli-handle-error');
const ora = require('ora');

// stacks
const renm = require('./stacks/react-express-node-mongodb');
const rfm = require('./stacks/react-flask-mongodb');
const rdm = require('./stacks/react-django-mongodb');
const nenm = require('./stacks/next-express-node-mongodb');
const nfm = require('./stacks/next-flask-mongodb');
const ndm = require('./stacks/next-django-mongodb');
const venm = require('./stacks/vue-express-node-mongodb');
const vfm = require('./stacks/vue-flask-mongodb');
const vdm = require('./stacks/vue-django-mongodb');
const renf = require('./stacks/react-express-node-firebase');
const rff = require('./stacks/react-flask-firebase');
const rdf = require('./stacks/react-django-firebase');
const nenf = require('./stacks/next-express-node-firebase');

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

		// react.js, flask, mongodb boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Flask' &&
			database === 'MongoDB'
		) {
			await rfm(projName, isWindows, path);
		}

		// react.js, django, mongodb boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Django' &&
			database === 'MongoDB'
		) {
			await rdm(projName, isWindows, path);
		}

		// next.js, node.js, express.js, mongodb boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Node.js' &&
			database === 'MongoDB'
		) {
			await nenm(projName, isWindows, path);
		}

		// next.js, flask, mongodb boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Flask' &&
			database === 'MongoDB'
		) {
			await nfm(projName, isWindows, path);
		}

		// next.js, django, mongodb boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Django' &&
			database === 'MongoDB'
		) {
			await ndm(projName, isWindows, path);
		}

		// vue.js, node.js, express.js, mongodb boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Node.js' &&
			database === 'MongoDB'
		) {
			await venm(projName, isWindows, path);
		}

		// vue.js, flask, mongodb boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Flask' &&
			database === 'MongoDB'
		) {
			await vfm(projName, isWindows, path);
		}

		// vue.js, django, mongodb boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Django' &&
			database === 'MongoDB'
		) {
			await vdm(projName, isWindows, path);
		}

		// react.js, node, express, firebase boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Node.js' &&
			database === 'Firebase'
		) {
			await renf(projName, isWindows, path);
		}

		// react.js, flask, firebase boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Flask' &&
			database === 'Firebase'
		) {
			await rff(projName, isWindows, path);
		}

		// react.js, django, firebase boilerplate
		if (
			frontend === 'React.js' &&
			backend === 'Django' &&
			database === 'Firebase'
		) {
			await rdf(projName, isWindows, path);
		}

		// next.js, node.js, express.js, firebase boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Node.js' &&
			database === 'Firebase'
		) {
			await nenf(projName, isWindows, path);
		}

		// next.js, flask, firebase boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Flask' &&
			database === 'Firebase'
		) {
		}

		// next.js, django, firebase boilerplate
		if (
			frontend === 'Next.js' &&
			backend === 'Django' &&
			database === 'Firebase'
		) {
		}

		// vue.js, node.js, express.js, firebase boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Node.js' &&
			database === 'Firebase'
		) {
		}

		// vue.js, flask, firebase boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Flask' &&
			database === 'Firebase'
		) {
		}

		// vue.js, django, firebase boilerplate
		if (
			frontend === 'Vue.js' &&
			backend === 'Django' &&
			database === 'Firebase'
		) {
		}

		console.log();
	} catch (err) {
		spinner.fail(`Couldn't create the project.`);
		console.log();
		handleError(`Failed while generating the boilerplate`, err);
	}
};
