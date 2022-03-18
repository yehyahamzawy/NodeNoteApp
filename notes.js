const chalk = require('chalk')
const fs = require('fs')


const addNotes = (title, body) => {
    console.log('Note title:', chalk.bold.blue(title), "\nBody:", chalk.bold.inverse(body))

    const notes = loadNotes()

    const duplication = notes.every(t => { //i love the method "every"; perfect in this case, if no duplications found, value would be returned true. if one duplication found, it will return false and the loop will BREAK! saving useless loops
        if (t.title === title) {
            console.log('duplicate title found, please use a different title')
            return false
        }
        return true
    })

    if (duplication) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.bold.green('Note added!'))
    }
}

const loadNotes = () => {
    try {
        const data = JSON.parse(fs.readFileSync('notes.json').toString())
        return data
    } catch (e) {
        return []
    }

}

const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes))


const removeNotes = (title) => {
    const notes = loadNotes()
    // const newNotes = notes.filter(n => {
    //     return n.title !== title
    // })
    // saveNotes(newNotes) // ez method, it seems FILTER method creates a new array and keeps adding elements that pass. which is not a low cost solution in big data
    const noteIndex = notes.findIndex(n => n.title === title) // find index of desired note 

    if (noteIndex !== -1) // make sure it exists
    {
        notes.splice(noteIndex, 1)
        saveNotes(notes)
        console.log('Note with title:', chalk.bold.yellow(title), 'successfully deleted!')
    } else
        console.log('Note with title:', chalk.bold.yellow(title), 'not found')
}

const listNotes = () => loadNotes().forEach((note, i) => console.log('Note',chalk.green(i+1) +':',chalk.inverse(note.title)))

const readNote = (title) => {
    const note = loadNotes().find(note => title===note.title)
    if(note!== undefined)
    {
        console.log(note.body)
    } else console.log('Did not find specified note')
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    list: listNotes,
    readNote: readNote
}