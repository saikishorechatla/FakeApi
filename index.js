const express = require('express')
const app = express()


app.use(express.json())


const cats = require('./routes/cats')
const countries = require('./routes/countries')
const langs = require('./routes/langs')


app.use('/api/cats',cats)
app.use('/api/countries',countries)
app.use('/api/langs',langs)



app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})