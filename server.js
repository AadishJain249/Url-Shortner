const express = require('express')
const mongoose = require('mongoose')
const user = require('./models/url')
const app = express()
    // const port = 3000
const db_link = 'mongodb+srv://aadish:aadishjain@cluster0.nfmxe.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function(result) {
        console.log('connected');
        console.log(result); // will print the mongo db properties
    })
    .catch((err) => console.log(err));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
    // this will get the url from the post request
app.get('/', async(req, res) => {
        // will find that url in mongo db
        // will print details on home page
        const short = await user.find()
        res.render('index', { short: short })
    })
    // this will create full url for us
app.post('/shorturl', async(req, res) => {
    await user.create({ FullUrl: req.body.fullUrl })
    res.redirect('/')
})
app.get('/:shorturls', async(req, res) => {
    const shortUrl = await user.findOne({ ShortUrl: req.param.shortUrl })
    if (shortUrl === null) {
        return res.sendStatus(400)
    }
    shortUrl.click++
        shortUrl.save()
})
app.listen(process.env.PORT || 5000);