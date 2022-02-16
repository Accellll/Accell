// importing packages
const welcome = require('cli-welcome');
const { Input, Select } = require('enquirer');
const pkgJSON = require('../package.json');

/* const frontend = ['--react', '--next', '--vue', '-r', '-n', '-v'];
const backend = ['--node', '--django', '--flask', '-no', '-d', '-f'];
const db = ['--mongodb', '--firesbase', '--mysql', '-m', '-f', '-s']; */

/**
 * get project name from the user
 *
 * @param {Array} - flags
 */
const getProjectName = async flags => {
	let projName;
	const projectFolder = new Input({
		name: 'projectName',
		message: 'What is your project name?'
	});
	projName = await projectFolder.run();
	console.log();
	return projName;
};

/**
 * get frontend tech from the user
 *
 * @param {Array} - flags
 */
const getFrontendTech = async flags => {
	let frontend;
	const feTech = new Select({
		name: 'Frontend',
		message: 'Select Your Desired Frontend Framework/Libary',
		choices: ['React.js', 'Next.js', 'Vue.js']
	});
	frontend = await feTech.run();
	return frontend;
};

/**
 * get backend tech from the user
 *
 * @param {Array} - flags
 */
const getBackendTech = async flags => {
	let backend;
	const beTech = new Select({
		name: 'Backend',
		message: 'Select Your Desired Backend Framework/Libary',
		choices: ['Node.js', 'Django', 'Flask']
	});
	backend = await beTech.run();
	return backend;
};

/**
 * get database from the user
 *
 * @param {Array} - flags
 */
const getDatabase = async flags => {
	let database;
	const db = new Select({
		name: 'Database',
		message: 'Select Your Desired Database',
		choices: ['MongoDB Atlas', 'Firebase', 'MySQL']
	});
	database = await db.run();
	return database;
};

/**
 *
 *
 * Get user input.
 */
const getInput = async () => {
	let projName, frontend, backend, database;
	try {
		projName = await getProjectName();
		frontend = await getFrontendTech();
		backend = await getBackendTech();
		database = await getDatabase();
	} catch (err) {
		console.error(err);
	}

	return { projName, frontend, backend, database };
};

module.exports = async flags => {
	welcome({
		title: `Accell`,
		tagLine: `by ${pkgJSON.author.name}`,
		description: `${pkgJSON.description}`,
		bgColor: `#00aeff`,
		color: `#FFFFFF`,
		bold: true,
		clear: true,
		version: `${pkgJSON.version}`
	});

	return getInput();
};
