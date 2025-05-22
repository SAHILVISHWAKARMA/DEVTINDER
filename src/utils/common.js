
const ALLOWED_UPDATES = ["img", "skills", "about", "gender", "age"]

const isAllowUpdate = (data) =>{
    return Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k))
}

module.exports = {isAllowUpdate}