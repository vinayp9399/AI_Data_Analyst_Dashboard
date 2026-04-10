require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/file', require('./routes/fileuploadroute'))
app.use('/data', require('./routes/aianalysis'))

app.get('/', (req, res)=>{
   res.json({name:"AI Data Analyst Dashboard Backend"})
})

app.listen(process.env.PORT, ()=>{
    console.log('backend started at port ' +  process.env.PORT)
})