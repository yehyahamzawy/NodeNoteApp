
const fs = require('fs')
const { stringify } = require('querystring')

const getNotes = function() {
    return fs.readFileSync('./notes.txt',{encoding:'utf8', flag:'r'})
}

module.exports = {getNotes} 