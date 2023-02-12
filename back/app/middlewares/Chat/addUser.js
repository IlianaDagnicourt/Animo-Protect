const {ApiError}= require('../../errors');

var axios = require('axios');

const addUser = (req, res, next) => {

    if(!req.body.username && req.body.secret) {
        throw new ApiError('username & secret is required for the chat');
    }

    const data = {
        username: req.body.username,
        secret: req.body.secret
    };

    const config = {
        method: 'post',
        url: 'https://api.chatengine.io/users/',
        headers: {'PRIVATE-KEY': '{{7f422a8f-f361-4e40-9d63-e344439a627e}}'},
        data : data
    };
        
    axios(config)
        .then(function () {
            next();
        })
        .catch(function (error) {
            console.log(error);
        });

}



module.exports = addUser