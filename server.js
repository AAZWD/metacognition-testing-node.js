const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = 3000;

//access static content
app.use(express.static('public'));
//set pug template
app.set('view engine', 'pug');


//connect to mongodb with mongoose 
const mongoose = require('mongoose');
//get schemas
const userCollection = require('./uSchema');
const patientCollection = require('./pSchema');
const connectionString = "mongodb+srv://comit:comit@cluster0.ulggk.mongodb.net/cma?retryWrites=true&w=majority";
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("error", function (error) {
    console.log(error);
});

mongoose.connection.on("open", function () {
    console.log("Connected to MongoDB database.");
});

//sessions middleware
const session = require('express-session');
app.use(session({ secret: 'super secret', resave: false, saveUninitialized: true }));


////////////GET//////////////////
//basic home page
app.get('/', (req, res) => {
    res.render('home');
});

//create account page
app.get('/create_account', (req, res) => {
    res.render('create_account')
});

//end session buffer when logging out
app.get('/end_session', (req, res) => {
    req.session.user = null;
    if (req.session.user) {
        console.log('logged in');
    } else {
        console.log('not authorized');
    }
    res.redirect('/');
});

//error page for unauthorized access
app.get('/error', (req, res) => {
    res.render('error');
});
////////////////AUTHORIZED ACCESS REQUIRED//////////

///create function for the session check plus rendering info for layout, to reduce repitition
//dashboard
app.get('/user/dashboard', (req, res) => {
    //logged in check
    if (req.session.user) {
        let uData = req.session.user;
        //load nav w user info        
        let date = new Date;
        date = date.toDateString();
        let fname = 'New'
        let lname = 'User'
        //query fname and last name from collection w/ email
        if (uData[0].fname) fname = uData[0].fname
        if (uData[0].lname) lname = uData[0].lname
        //get patient info from db
        //get test info from db
        //pass both to page
        res.render('user/dashboard',
            {
                fname: fname,
                lname: lname,
                date: date,
                page: 'Dashboard'
            }
        );
    } else {
        res.redirect('/error');
    }
});

//user account page
app.get('/user/account', (req, res) => {
    //logged in check
    if (req.session.user) {
        //load nav w user info        
        let date = new Date;
        date = date.toDateString();
        //placeholders
        let fname = 'New'
        let lname = 'User'
        //get email from session
        let uData = req.session.user
        //get user info from db
        userCollection.find({ email: uData[0].email }, function (err, result) {
            console.log(result)
            //update names if available
            if (result[0].fname) fname = result[0].fname
            if (result[0].lname) lname = result[0].lname
            res.render('user/account',
                {
                    fname: fname,
                    lname: lname,
                    date: date,
                    page: 'User Account',
                    data: result
                }
            );
        });

    } else {
        res.redirect('/error');
    }
    console.log('rendered');
});

//Register Patients
app.get('/user/register', (req, res) => {
    //logged in check
    if (req.session.user) {
        let uData = req.session.user;
        //load nav w user info        
        let date = new Date;
        date = date.toDateString();
        let fname = 'New'
        let lname = 'User'
        //query fname and last name from session
        if (uData[0].fname) fname = uData[0].fname
        if (uData[0].lname) lname = uData[0].lname
        res.render('user/register',
            {
                fname: fname,
                lname: lname,
                date: date,
                page: 'Register Patient'
            }
        );
    } else {
        res.redirect('/error');
    }
});

//patient directory
app.get('/user/patient_directory', (req, res) => {
    //logged in check
    if (req.session.user) {
        let uData = req.session.user;
        //load nav w user info        
        let date = new Date;
        date = date.toDateString();
        let fname = 'New'
        let lname = 'User'
        if (uData[0].fname) fname = uData[0].fname
        if (uData[0].lname) lname = uData[0].lname
        console.log('uData', uData);
        //get patient data
        patientCollection.find({uID: uData[0]._id}, function (err, result) {
            console.log('find patients result', result)
            res.render('user/patient_directory',
                {
                    fname: fname,
                    lname: lname,
                    date: date,
                    page: 'Patient Directory',
                    data: result
                }
            );
        });
    } else {
        res.redirect('/error');
    }
});

//edit patient profiles
app.get('/user/edit_profile', (req, res) => {
    //logged in check
    if (req.session.user) {
        let uData = req.session.user;
        //load nav w user info        
        let date = new Date;
        date = date.toDateString();
        let fname = 'New'
        let lname = 'User'
        if (uData[0].fname) fname = uData[0].fname
        if (uData[0].lname) lname = uData[0].lname
        console.log('uData', uData);
        //get patient data
        patientCollection.find({uID: uData[0]._id}, function (err, pResult) {
            console.log('find patients result', pResult)

            //get test data with patient _id
            res.render('user/edit_profile',
                {
                    fname: fname,
                    lname: lname,
                    date: date,
                    page: 'Edit Profiles',
                    pData: pResult
                    //tData: tResult
                }
            );
        });
    } else {
        res.redirect('/error');
    }
});


/////////POST//////////////////
//after logging in and creating an account
app.post('/user/dashboard', urlencodedParser, (req, res) => {
    //get req body for form content
    const user = req.body;

    //get date
    let date = new Date;
    date = date.toDateString();

    //check if post request is coming from login or create_account page
    if (req.header('Referer') == 'http://localhost:3000/create_account') {
        //create account
        //exists() returns a pending promise which is fulfilled to either return true or false
        userCollection.exists({ email: user.email })
            .then(function (exists) {
                //user email in document
                if (exists) {
                    console.log('the email exists:', exists);
                    res.redirect('/create_account');
                    //user email not in document
                } else {
                    //create a document in userCollection
                    userCollection.create(
                        {
                            fname: user.fname,
                            lname: user.lname,
                            email: user.email,
                            pass: user.pass
                        }, function (err, result) {
                            userCollection.find({ email: user.email }, function (err, result) {
                                console.log(result)
                                let fname = result[0].fname
                                let lname = result[0].lname
                                //save query result (array) to session.user
                                req.session.user = result;
                                //logged in check
                                if (req.session.user) {
                                    console.log('signed up and logged in');
                                } else {
                                    console.log('not authorized');
                                }
                                res.render('user/dashboard',
                                    {
                                        fname: fname,
                                        lname: lname,
                                        date: date,
                                        page: 'Dashboard'
                                    }
                                );
                            });
                        });
                }
            });
    } else {
        userCollection.exists({ email: user.email, pass: user.pass })
            .then(function (exists) {
                //user email + pass in document
                if (exists) {
                    console.log('the email + pass combo exists:', exists);
                    //load nav w user info
                    let fname = 'New'
                    let lname = 'User'
                    //query fname and last naem from collection w/ enteed email
                    //save session info
                    //then render dash
                    userCollection.find({ email: user.email }, function (err, result) {
                        if (result[0].fname) fname = result[0].fname
                        if (result[0].lname) lname = result[0].lname
                        //save query result (array) to session.user
                        req.session.user = result;
                        //logged in check
                        if (req.session.user) {
                            console.log('logged in');
                        } else {
                            console.log('not authorized');
                        }
                        res.render('user/dashboard',
                            {
                                fname: fname,
                                lname: lname,
                                date: date,
                                page: 'Dashboard'
                            }
                        );
                    });
                    //user email + pass combo not in document
                } else {
                    console.log(user.email);
                    res.redirect('/');
                }
            });
    }
});

//Editing user account
app.post('/user/account', urlencodedParser, (req, res) => {
    //add user info to db
    const user = req.body
    const oldData = req.session.user //array
    console.log('post sent:', req.body)
    //update db first
    userCollection.updateOne({ email: oldData[0].email }, user, function (err, result) {
        //get date
        let date = new Date;
        date = date.toDateString();
        //get upated db info
        userCollection.find({ email: user.email }, function (err, result) {
            console.log(result)
            //update names
            fname = result[0].fname
            lname = result[0].lname
            //update session
            req.session.user = result;
            res.render('user/account',
                {
                    fname: fname,
                    lname: lname,
                    date: date,
                    page: 'User Account',
                    data: result
                }
            );
        });
    });
});

//Registering a patient
app.post('/user/register', urlencodedParser, (req, res) => {
    const patient = req.body
    console.log('OG post sent:', req.body)
    //get user id
    let uData = req.session.user
    //add id to patient obj
    patient.uID = uData[0]._id
    console.log('updated patient:', patient)

    //get date
    let date = new Date;
    date = date.toDateString();

    patientCollection.create(patient, function (err, result) {
        if (err) return console.log('error');
        else return console.log('works??');
    });
    res.render('user/register',
        {
            fname: uData[0].fname,
            lname: uData[0].lname,
            date: date,
            page: 'Register Patient'
        }
    );
});

//Searching Directory     DONT NEED THIS??
app.post('/user/patient_directory', urlencodedParser, (req, res) => {
    //check user exists in database, then
    ////
    ////

    const user = req.body;

    //get date
    let date = new Date;
    date = date.toDateString();

    //some of these will be subtituted with SQL queries based on the current session
    res.render('user/patient_directory',
        {
            email: user.email,
            password: user.password,
            first_name: user.fName,
            last_name: user.lName,
            date: date,
            page: 'Patient Directory'
        }
    );
});

//Searching to delete
app.post('/user/edit_profile', urlencodedParser, (req, res) => {
    console.log('Post Request Headers:', req.headers)
        let uData = req.session.user;
        //load nav w user info        
        let date = new Date;
        date = date.toDateString();
        let fname = 'New'
        let lname = 'User'
        if (uData[0].fname) fname = uData[0].fname
        if (uData[0].lname) lname = uData[0].lname
        console.log('uData', uData);
        //get patient data
        patientCollection.find({uID: uData[0]._id}, function (err, pResult) {
            console.log('find patients result', pResult)

            //get test data with patient _id
            res.render('user/edit_profile',
                {
                    fname: fname,
                    lname: lname,
                    date: date,
                    page: 'Edit Profiles',
                    pData: pResult
                    //tData: tResult
                }
            );
        });
});

/*
//make sure certain pages (ie.games or game session loader or game end page etc. are not accessible 
without first having posted something), should throw an error and redirect to
the appropriate static error page

//also anything requiring a login should not be accessible without logging in first
*/
//^^^^^^^^ for all this that means you can only post into those pages
//create gets that throws an error for the games and an unuthorized warning for the other pages

/*
WILL REFRESH THE PAGE LIKE AN AUTOMTAIC UPDATE
app.get('/delete/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id == req.params.id)
    products.splice(productIndex, 1);
    res.redirect('/'); ///////AJAX LIKE!!
})*/

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});