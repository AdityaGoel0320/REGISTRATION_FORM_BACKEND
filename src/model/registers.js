let mongoose = require("mongoose")
// let bcrypt = require("bcrypt")


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



// now we want to make yout password hash so we use mmiddleware
let bcrypt =require("bcryptjs")
employeeSchema.pre( "save", async function(next){

    // as only jab password chqnge ya dale jabb run karo isse
    if(this.isModified("password")){
        this.password   = await bcrypt.hash(this.password , 10 ) ; 

        // as now confirm password is useless
        this.confirmpassword = undefined ; 
    }
    next(); 


})




// now making collection of this schema
let Register = new mongoose.model("Register", employeeSchema)


module.exports = Register   