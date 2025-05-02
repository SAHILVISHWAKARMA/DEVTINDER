const adminAuth = (req, res, next) => {
    console.log("auth enter");
    if(!req.query?.comment){
        res.status(401).send("unauthorized!!")
    }
    next();
}

module.exports = { adminAuth };