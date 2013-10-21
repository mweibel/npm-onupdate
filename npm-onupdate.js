#!/usr/bin/env node

/* jshint node:true, curly:false */

var chalk = require('chalk'),
    notifier = require('update-notifier')(),
    program = require('commander').version(notifier.packageVersion);

console.log(chalk.grey('\n **************************************************************'));
console.log(chalk.grey(' *'), chalk.bgCyan('npm-onupdate'), chalk.yellow.bold('- npm registry email notifications service'), chalk.grey('   *'));
console.log(chalk.grey(' *'), 'Author:', chalk.grey('Piotr Walczyszyn (@outof_me)'), chalk.grey('                      *'));
console.log(chalk.grey(' **************************************************************'));

if (notifier.update) {
    notifier.notify();
}

// Registering commainds
program
    .command('add <package>')
    .description('add new alert for specified <package>')
    .action(require('./lib/commands/add'));

program
    .command('rm <package>')
    .description('remove alert for specified <package>')
    .action(require('./lib/commands/rm'));

program
    .command('ls')
    .description('list your package alerts')
    .action(require('./lib/commands/list'));

program
    .command('logout')
    .description('logout from the service')
    .action(require('./lib/commands/logout'));

program.parse(process.argv);

if (program.args.length === 0) {
    console.log('\n Run `npm-onupdate -h` for help\n');
}

process.on('SIGINT', function () {
    console.log('\n\n  bye!\n');
    process.exit(0);
});