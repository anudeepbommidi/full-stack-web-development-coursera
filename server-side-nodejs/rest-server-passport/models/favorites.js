var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var favoriteSchema = new Schema({
    postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
    },
    dishes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('Favorite', favoriteSchema);