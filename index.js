#!/usr/bin/env node

/**
 *
 *
 * Author: Saad Irfan, Krona Emmanuel, Moosa Raza, Dawood Asghar
 * GitHub: msaaddev, kronaemmanuel, dawoodmalhi, RazeMuse
 */

const init = require('./src/init');
const cli = require('./src/cli');
const exit = require('./src/exit');

(module.exports = async () => {
	const flags = [...process.argv.slice(2)];
	const input = await init(flags);

	await cli(input);
	await exit();
})();
