const {ApiError}= require('../errors');

const checkRole = (role)=> (req,res,next)=> {
    if(req.user?.role === role){
        next()
    }
    else{
        throw new ApiError('not authorized')
    }
}

module.exports =checkRole