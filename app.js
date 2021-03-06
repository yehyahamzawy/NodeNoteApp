const noteHelper = require('./notes.js')
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
        noteHelper.addNotes(argv.title, argv.body)
    }
}) // add command

yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        noteHelper.removeNotes(argv.title)
    }
}) // remove command

yargs.command({
    command: 'readNote',
    describe: 'Reads a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }},
    handler: (argv) => noteHelper.readNote(argv.title)
})

yargs.command({
    command: 'list',
    describe: 'Lists all notes titles',
    handler: (argv) => noteHelper.list()
})

yargs.parse()