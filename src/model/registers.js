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

        // now as this token will be added in db so that on login we can check the user
        tokens: [{
            token: {
                type: String,
                required: true,
            }
        }]

    }
)

// now declaring a fnc to create a jwt token
let jwt = require("jsonwebtoken")
employeeSchema.methods.generateAuthToken = async function () {
    console.log("hi in jwt fnc")
    try {

        let tokenGenerated = jwt.sign({ id: this._id.toString() }, "myNameIsAdityaGoelAndThisIsBackendForm")


        this.tokens = this.tokens.concat({token:tokenGenerated})

        await this.save(); 

        return tokenGenerated ; 

    } catch (error) {

        console.log(error)
    }
}

// now we want to make yout password hash so we use mmiddleware
let bcrypt = require("bcryptjs")
employeeSchema.pre("save", async function (next) {

    // as only jab password chqnge ya dale jabb run karo isse
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);

        // as now confirm password is useless
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
    }
    next();


})




// now making collection of this schema
let Register = new mongoose.model("Register", employeeSchema)


module.exports = Register   