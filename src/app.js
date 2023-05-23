let express = require("express")
let app = express();
let PORT = process.env.PORT || 3000;

let path = require("path")


// for handling of form
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// importing databse connection code
require("./db/conn.js")

// importing model of databse (Register)
let Register = require("./model/registers")


// now making dynamic express website using hbs
let viewsPath = path.join(__dirname, "../templates/views")
app.set("view engine", "hbs")
app.set("views", viewsPath)

// to tell we are using hbs in file
let hbs = require("hbs");
const exp = require("constants");
let hbsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(hbsPath)


// routing of different pages
app.get("/", (req, res) => {
    res.render("index")
})


app.get("/register", (req, res) => {
    res.render("register")
})


// now make it like rest api crud  operation as adding in database
app.post("/register", async (req, res) => {
    console.log("you clicked on register post ")
    try {
        console.log("yout entered try of fnc")

        let password = req.body.password;
        let confirmpassword = req.body.confirmpassword;

        if (req.body.confirmpassword === req.body.password) {
            console.log("yout enterd in if ")
            let employeeRegister = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,

            })
            
            let registerd = await employeeRegister.save()
            res.status(201).send(registerd)

        } else {
            res.send("error password is not matching")
        }

    } catch (error) {
        console.log(error)
        res.status(400).send("error in registering the form")
    }

})



app.listen(PORT, () => {
    console.log(`runnung at ${PORT}`)
})