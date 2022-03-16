const chalk = require('chalk')
const fs = require('fs')

const addNotes = function (title, body) {
    console.log('Note title:', chalk.bold.green(title), "\nBody:", chalk.bold.inverse(body))
     
    const notes = loadNotes()

    const duplication = notes.every(t => { //i love the method "every"; perfect in this case, if no duplications found, value would be returned true. if one duplication found, it will return false and the loop will BREAK! saving useless loops
        if(t.title === title)
        {
            console.log('duplicate title found, please use a different title')
            return false
        }
        console.log('done')
        return true
    });

    if(duplication){
    notes.push({
        title: title,
        body: body
    })

    saveNotes(notes)
    }
}

const loadNotes = function() {
    try {
        const data = JSON.parse(fs.readFileSync('notes.json').toString())
        return data
    } catch (e) {
        return[]
    }
    
}

const saveNotes = function (notes) {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}



module.exports = {
    addNotes: addNotes
}