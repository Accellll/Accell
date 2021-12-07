#!/usr/bin/env node

/**
 *
 *
 * Author: Saad Irfan, Krona Emmanuel, Moosa Raza, Dawood Asghar
 * GitHub: msaaddev, kronaemmanuel, dawoodmalhi, RazeMuse
 */

const init = require('./src/init');
const cli = require('./src/cli');

(module.exports = async () => {
	const input = await init();
	await cli(input);
})();
