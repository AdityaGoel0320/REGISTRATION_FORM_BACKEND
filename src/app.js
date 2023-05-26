let express = require("express")
let app = express();
let PORT = process.env.PORT || 3000;




let path = require("path")


// for handling of form
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ********************  code for database starts ********************
// importing databse connection code
require("./db/conn.js")

// importing model of databse (Register)
let Register = require("./model/registers")

// ********************  code for database ends ********************



// ********************  code for use of hbs and dynamic website in express starts ********************


// now making dynamic express website using hbs
let viewsPath = path.join(__dirname, "../templates/views")
app.set("view engine", "hbs")
app.set("views", viewsPath)

// to tell we are using hbs in file
let hbs = require("hbs");
const exp = require("constants");
let hbsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(hbsPath)


// ********************  code for use of hbs and dynamic website in express starts ********************



//  ******************** routing of different pages starts ********************

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})


// now make it like rest api crud  operation as adding in database
app.post("/register", async (req, res) => {
    console.log("you clicked on register post ")
    try {
        console.log("yout entered try of fnc")

        let password = req.body.password;
        let confirmpassword = req.body.confirmpassword;

        if (req.body.confirmpassword === req.body.password) {

            let employeeRegister = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,

            })
            // now i want to make  jwt token begore saving in database

            let token = await employeeRegister.generateAuthToken(); 

            
            // as before saving here password get hash so using middleware in schema file

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



app.post("/login", async (req, res) => {
    try {

        let emailEntered = req.body.email
        let passwordEntered = req.body.password

        let userEmail = await Register.findOne({ email: emailEntered })

        console.log(userEmail.password)

        // as now we want to compare hqash password with user entered password
        let bcryptjs = require("bcryptjs")
        let isMatch = await bcryptjs.compare(passwordEntered, userEmail.password);
        if (isMatch) {
            res.status(201).render("index")
        }
        else {
            res.status(201).send("password is wrong")
        }


    } catch (error) {
        res.status(400).send("error in login")
    }
})




app.listen(PORT, () => {
    console.log(`runnung at ${PORT}`)
})