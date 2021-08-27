const bodyparser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyparser.json())
    app.use(cors())
}

