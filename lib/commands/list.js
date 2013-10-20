/* jshint node:true */
var rest = require('../rest');

// Requireing colors to have colorful console
require('colors');

module.exports = function () {
    rest.request('GET', true, '/alerts', {}, function (err, result) {
        if (err) {
            console.log('Huston we have a problem: %s'.red, err.message);
            process.exit(0);
        }
        console.log('\n  Your package alerts:\n');
        if (result.length > 0) {
            result.forEach(function (package) {
                console.log('    * ' + package.name.green + ' [' + package.version + '] - ' + package.description + '\n');
            });
        } else {
            console.log('    You have no package alerts registered!\n'.grey);
        }
        process.exit(0);
    });
};