const express = require('express');
const bodyParser = require('body-parser');

/*additional middleware
    session traacking for different users
*/

//export own modules later if it gets too messy

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = 3000;

//access static content
app.use(express.static('public'));

//set pug template
app.set('view engine', 'pug');

//------------------------------------------------------
////////////ERROR HANDLING/////////
//accessing anything w/o login/signup


////////////GET//////////////////
//basic home page
app.get('/', (req,res)=>{
    res.render('home');
});

//create account page
app.get('/create_account', (req,res)=>{
    res.render('create_account');
});

//dashboard
app.get('/user/dashboard', (req,res)=>{
    //check user logged in
    ////
    ///

    //get date
    let date = new Date;
    date = date.toDateString();
    
    //Get user data from th database
    res.render('user/dashboard',
    {
       date: date,
       page: 'Dashboard'
    }
    );
});

//user account page
app.get('/user/account', (req,res)=>{
    //check user logged in
    ////
    ///

    //get date
    let date = new Date;
    date = date.toDateString();
    
    //Get user data from th database
    res.render('user/account',
    {
       date: date,
       page: 'User Account'
    }
    );
});

//Register Patients
app.get('/user/register', (req,res)=>{
    //check user logged in
    ////
    ///

    //get date
    let date = new Date;
    date = date.toDateString();
    
    //Get user data from th database
    res.render('user/register',
    {
       date: date,
       page: 'Register Patients'
    }
    );
});

//patient directory
app.get('/user/patient_directory', (req,res)=>{
    //check user logged in
    ////
    ///

    //get date
    let date = new Date;
    date = date.toDateString();
    
    //Get user data from th database
    res.render('user/patient_directory',
    {
       date: date,
       page: 'Patient Directory'
    }
    );
});

/////////POST//////////////////
//after logging in and creating an account
app.post('/user/dashboard', urlencodedParser, (req,res)=>{
    //check user exists in database, then
    
    const user = req.body;
    
    //get date
    let date = new Date;
    date = date.toDateString();
    
    //some of these will be subtituted with SQL queries based on the current session
    res.render('user/dashboard',
    {
       email: user.email,
       password: user.password,
       first_name: user.fName,
       last_name: user.lName,
       date: date,
       page: 'Dashboard',
       action: 'account'
    }
    
    );
});

//Editing user profile account
app.post('/user/account', urlencodedParser, (req,res)=>{
    //check user exists in database, then
    ////
    ////

    const user = req.body;
    
    //get date
    let date = new Date;
    date = date.toDateString();
    
    //some of these will be subtituted with SQL queries based on the current session
    res.render('user/account',
    {
       email: user.email,
       password: user.password,
       first_name: user.fName,
       last_name: user.lName,
       date: date,
       page: 'User Account',
       action: 'account'
    }
    
    );
});

//Registering a patient
app.post('/user/register', urlencodedParser, (req,res)=>{
    //check user exists in database, then
    ////
    ////

    const user = req.body;
    
    //get date
    let date = new Date;
    date = date.toDateString();
    
    //some of these will be subtituted with SQL queries based on the current session
    res.render('user/register',
    {
       email: user.email,
       password: user.password,
       first_name: user.fName,
       last_name: user.lName,
       date: date,
       page: 'Register New Patient',
       action: 'register'
    }
    );
});

//Searching Directory
app.post('/user/patient_directory', urlencodedParser, (req,res)=>{
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
       page: 'Patient Directory',
       action: 'patient_directory'
    }
    );
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

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});