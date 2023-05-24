let mongoose = require("mongoose")


let employeeSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmpassword: {
            type: String,
            required: true,
        },

    }
)


// now making collection of this schema
let Register = new mongoose.model("Register", employeeSchema)


module.exports = Register   