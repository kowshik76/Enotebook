const connectTomongo = require('./db');


const express = require('express')
var cors = require('cors')
connectTomongo();
const app = express()
const port = 3000
app.use(cors({
    origin: '*',  // Allow all origins (for development purposes)
}));
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
    res.send('Hey World!')
})

app.listen(port, () => {
    console.log(` App listening on port ${port}`)
})
