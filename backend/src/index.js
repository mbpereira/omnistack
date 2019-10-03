const express = require('express')
const path = require('path')
const routes = require('./routes')
const app = express()
const { getHttpError } = require('./errors')


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/files', express.static(path.resolve('static', 'images')))



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)



app.use((err, req, res, next) => {

    console.error(err)

    const httpError = getHttpError(err)
    
    console.error(httpError)

    res.status(httpError.code).send(httpError.parse())

})


app.listen(3000)