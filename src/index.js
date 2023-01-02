const express = require('express')
const geocoding = require('../APIs/geocoding')


const app = express()

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/search', async (req, res) => {
    try {
        if (!req.query.address) {
            throw new Error('You have to provide an address!')
        }
    
        const location = await geocoding(req.query.address)
        res.status(200).send({ location })  
    } catch (e) {
        res.status(400).send(e.message)
    }

})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})