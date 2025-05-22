const validator = require('validator');

const validateUpdateUserData = (data) => {
    if(!validator.isEmail(data?.email)){
        throw new Error("invalid email address")
    }
}

module.exports = {validateUpdateUserData};