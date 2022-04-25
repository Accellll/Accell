const exit = require('exit-cli');
const packageJSON = require('../package.json');

module.exports = async () => {
	await exit({
		github: `https://github.com/Accellll/Accell`,
		twitter: `https://twitter.com/accell`,
		pkgJSON: packageJSON
	});
};
