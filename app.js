const noteHelper = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')


const add = function(argv) {
    console.log('adding process', argv)
}

const remove = function() {
    console.log('removing process')
}

const read = function() {
    console.log(noteHelper.getNotes())
}

const list = function() {
    console.log('Listing notes')
}

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption : true,
            type: 'string'
            
        },
        body: {
            describe: 'Note body',
            demandOption : true,
            type: 'string'
            
        }
    },
    handler: function(argv) {
        console.log('Note title:', chalk.bold.green(argv.title), "\nBody:", chalk.bold.inverse(argv.body))
    }
}) // add command

yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    handler: remove
})

yargs.command({
    command: 'read',
    describe: 'Reads a note',
    handler: read
})

yargs.command({
    command: 'list',
    describe: 'Lists all notes titles',
    handler: list
})

yargs.parse()