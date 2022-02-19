// importing packages
const welcome = require('cli-welcome');
const handleError = require('node-cli-handle-error');
const { Input, Select } = require('enquirer');
const pkgJSON = require('../package.json');

const frontendFlags = ['--react', '--next', '--vue'];
const backendFlags = ['--node', '--django', '--flask'];
const dbFlags = ['--mongodb', '--firebase', '--mysql'];

/**
 *
 *
 * get project name from the user
 */
const getProjectName = async flags => {
	let projName;
	const projectFolder = new Input({
		name: 'projectName',
		message: 'What is your project name?'
	});
	projName = await projectFolder.run();
	return projName;
};

/**
 *
 *
 * get frontend tech from the user
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
 *
 *
 * get backend tech from the user
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
 *
 *
 * get database from the user
 */
const getDatabase = async flags => {
	let database;
	const db = new Select({
		name: 'Database',
		message: 'Select Your Desired Database',
		choices: ['MongoDB', 'Firebase', 'MySQL']
	});
	database = await db.run();
	return database;
};

/**
 * Modify flag to uppercase
 *
 * @param {string} - flag
 */
const uppercaseFlag = flag => {
	flag = flag.slice(2);
	const uppercase = `${flag.charAt(0).toUpperCase()}`;
	flag = flag.slice(1);
	return `${uppercase}${flag}`;
};

/**
 *
 *
 * Get user input.
 */
const getInput = async flags => {
	let projName, frontend, backend, database;

	flags.map(flag => {
		if (frontendFlags.includes(flag)) {
			flag = `${uppercaseFlag(flag)}.js`;
			frontend = flag;
		}
	});

	flags.map(flag => {
		if (backendFlags.includes(flag)) {
			flag = uppercaseFlag(flag);
			if (flag === 'Node') {
				flag = `${flag}.js`;
			}
			backend = flag;
		}
	});

	flags.map(flag => {
		if (dbFlags.includes(flag)) {
			flag = uppercaseFlag(flag);
			flag === 'Mysql'
				? (database = 'MySQL')
				: flag === 'Mongodb'
				? (database = 'MongoDB')
				: (database = flag);
		}
	});

	flags.map(flag => {
		if (
			flag[0] !== '-' &&
			flag[1] !== '-' &&
			flag[flag.length - 1] !== '-'
		) {
			projName = flag;
		}
	});

	try {
		if (!projName) {
			projName = await getProjectName();
		}

		if (!frontend) {
			frontend = await getFrontendTech();
		}

		if (!backend) {
			backend = await getBackendTech();
		}

		if (!database) {
			database = await getDatabase();
		}
	} catch (err) {
		handleError(`Failed while getting user output`, err);
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

	return getInput(flags);
};
