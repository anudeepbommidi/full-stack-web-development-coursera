var express = require('express'),
    favoriteRouter = express.Router(),
    Favorites = require('../models/favorites'),
    Verify = require('./verify');


favoriteRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    
    Favorites.find({postedBy: req.decoded._id})
        .populate('dishes')
        .populate('postedBy')
        .exec(function(err, favorites) {
            if(err) {
                console.log(err);
            }
            res.json(favorites);
        });
     
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    
    Favorites.find({postedBy: req.decoded._id}, function(err, favorites) {
        if(err) {
            console.log(err);
        }
        if(!favorites || favorites.length === 0) {
            var favorite = {};
            favorite.postedBy = req.decoded._id;
            favorite.dishes = [];
            favorite.dishes.push(req.body._id);
            Favorites.create(favorite, function(err, favorite) {
                if(err) {
                   console.log(err);
                }
                res.json(favorite);
            })
        }
        else {
            Favorites.findOneAndUpdate({'postedBy': req.decoded._id},
                             {'$addToSet': {'dishes': req.body._id}},
                             {new: true},
                function(err, result) {
                if(err) {
                    console.log(err);
                }
                res.json(result);
            });
        }
    })
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next) {

        Favorites.findOneAndRemove({'postedBy': req.decoded._id},
        function(err, favorites) {
        if(err) {
            console.log(err);
        }
        res.json(favorites);

    });


});

favoriteRouter.route('/:dishId')

.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    
    Favorites.findOneAndUpdate({'postedBy': req.decoded._id}, 
                               {"$pull": {"dishes": req.params.dishId}},
                               {new: true},
        function(err, favorites) {
        if(err) {
            console.log(err);
        }
        res.json(favorites);

    });
});

module.exports = favoriteRouter;
