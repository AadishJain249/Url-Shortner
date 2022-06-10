const mongoose = require('mongoose')
const ShortId = require('shortid')
const UserSchema = new mongoose.Schema({
    FullUrl: {
        require: true,
        type: String,
    },
    ShortUrl: {
        type: String,
        require: true,
        default: ShortId.generate()
    },
    click: {
        type: Number,
        require: true,
        default: 0
    }
})
module.exports = mongoose.model('user', UserSchema)