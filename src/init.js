// importing packages
const welcome = require('cli-welcome');
const { Input, Select } = require('enquirer');
const pkgJSON = require('../package.json');

/**
 *
 *
 * Get user input.
 */
const getInput = async () => {
	// choose project name
	const projectFolder = new Input({
		name: 'projectName',
		message: 'What is your project name?'
	});

	// choose frontend
	const feTech = new Select({
		name: 'Frontend',
		message: 'Select Your Desired Frontend Framework/Libary',
		choices: ['React.js', 'Next.js', 'Vue.js']
	});

	// choose backend
	const beTech = new Select({
		name: 'Backend',
		message: 'Select Your Desired Backend Framework/Libary',
		choices: ['Node.js', 'Django', 'Flask']
	});

	// choose database
	const db = new Select({
		name: 'Database',
		message: 'Select Your Desired Database',
		choices: ['MongoDB Atlas', 'Firestore', 'MySQL']
	});

	let projName, frontend, backend, database;

	try {
		projName = await projectFolder.run();
		console.log();
		frontend = await feTech.run();
		backend = await beTech.run();
		database = await db.run();
	} catch (err) {
		console.error(err);
	}

	return { projName, frontend, backend, database };
};

module.exports = async () => {
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
