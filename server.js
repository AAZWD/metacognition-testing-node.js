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

////////////GET//////////////////
//basic home page
app.get('/', (req,res)=>{
    res.render('home');
});

//create account page
app.get('/create_account', (req,res)=>{
    res.render('create_account');
});

/////////POST//////////////////
//after logging in and creating an account
app.post('/user/dashboard', urlencodedParser, (req, res) => {
    //check user exists in database, then
    const user = req.body;
    res.render('user/dash',
    {
       username: user.username,
       password: user.password,
       first_name: user.first_name,
       last_name: user.last_name
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