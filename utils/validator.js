const validator = require("validator")
const Validate = (data)=> {

    // req.body me js ka obj present hoga
    const mandatoryField = ['firstName', 'emailId', 'password'];
    const IsAllowed = mandatoryField.every((k)=>  Object.keys(data).includes(k))

    if(!IsAllowed) {
        throw new Error("Some field mising")
        }

        if(!validator.isEmail(data.emailId)) {
            throw new Error("Invalid Email")
        }


        if(!validator.isStrongPassword(data.password)) {
            throw new Error("weak password")
        }

}

module.exports = {Validate};