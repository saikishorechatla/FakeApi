const express = require('express')
const app = express()


app.use(express.json())


const cats = require('./routes/cats')
const countries = require('./routes/countries')
const langs = require('./routes/langs')
const fs = require('fs')


app.use(express.static('./htmls'))
app.get('/',(req,res)=>{
    fs.readFile('./htmls/index.html',(err,result)=>{
        if(err) return res.status(404).json({message:'not found' })
            res.status(200).send(result)
    })
})


app.use('/api/cats',cats)
app.use('/api/countries',countries)
app.use('/api/langs',langs)



app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})