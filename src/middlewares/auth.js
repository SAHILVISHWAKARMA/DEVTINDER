const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authUser = async (req, res, next) => {
    try {
        const {token} = req.cookies
        if(!token) throw new Error('token not valid');
        const {_id} =  await jwt.verify(token,'DEVTINDER123');
        if(!_id)  throw new Error('invalid user');
        const user = await User.findById(_id);
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("Error : "+error.message);
    }
}

module.exports = { authUser };