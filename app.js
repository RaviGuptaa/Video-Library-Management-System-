
/**
 * Module dependencies.
 */
var configs = require('./Config/config');

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var engines = require('consolidate');
var hbs = require('hbs');

var app = express();


app.use(express.cookieParser('Amazon'));
app.use(express.session({
	secret: '59B93087-78BC-4EB9-993A-A61FC844F6C9'
 }));

var oneDay = 86400000;

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'),{ maxAge: oneDay }));
app.use(express.static(path.join(__dirname+'/Script'),{ maxAge: oneDay }));

// development only
if ('development' == app.get('env')) {
	console.log(" ----------------------The env is set to development !!-----------------------------");
  app.use(express.errorHandler());
}

// production only
if('production'== app.get('env'))
{
console.log(" ----------------------The env is set to produciton !!-----------------------------");

}
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.get('/', routes.sign);
app.post('/SignIn',routes.SignIn);
app.get('/SignUP', routes.signUp);
app.post('/SignUpCheck', routes.signUpCheck);
app.post('/logout',routes.logout);

//Admin Module
app.get('/AdminHome',routes.adminHome);
app.post('/DisplaySimpleMembers',routes.adminDisplaySimpleMembers);
app.post('/DeleteSimpleCustomer',routes.adminDeleteSimpleCustomer);
app.post('/DisplayPremiumMembers',routes.adminDisplayPremiumMembers);
app.post('/DeletePremiumCustomer',routes.adminDeletePremiumCustomer);
app.post('/DisplayPersons',routes.adminDisplayPersons);
app.post('/SearchPersons',routes.adminSearchPersons);
app.post('/CreateNewMovie',routes.makeNewMovie);
app.post('/AddNewMovie',routes.addNewMovie);
app.post('/GetAllMovie',routes.getAllMovie);
app.post('/GetAllIssuedMovie',routes.getAllIssuedmovies);
app.post('/AdminDeleteMovie',routes.adminDeleteMovie);
app.post('/UpdateMovie',routes.updateMovie);
app.post('/MovieToMember',routes.movieToMember);
app.post('/RetrieveMovieToMember',routes.retrieveMovieToMember);
app.post('/ApproveTheRequest',routes.ApproveTheRequest);
//app.post('/UpdateListOfPersons',routes.UpdateListOfPersons);


//Memebr & Premium 
app.get('/PremiumMemberHome',routes.premiumMemberHome);
app.post('/DisplayMovie',routes.displayMovie);
app.post('/EditPersonalInfo',routes.editPersonalInfo);
app.post('/UpdatePersonalInfo',routes.updatePersonalInfo);
app.post('/IssueMovie',routes.issueMovie);
app.post('/ViewCart',routes.viewCart);
app.post('/ProceedToPayment',routes.proceedToPayment);
app.post('/SubmitPayment',routes.submitPayment);
app.post('/ViewOrderHistory',routes.viewOrderHistory);
app.post('/UpgradeToPremium',routes.UpgradeToPremium);
app.post('/UpgradePayment',routes.UpgradePayment);
//app.post('/SignUpCheck', routes.signUpCheckDN);
//app.post('/SignIn',routes.SignInDN);
//app.post('/IssueMovie',routes.issueMovieDN);
app.post('/ReturnIssuedMovie',routes.returnIssuedMovie);
app.post('/ReturnMovie',routes.returnMovie);
//app.post('/IssueMovie',routes.issueMovieRedis);
//app.post('/IssueMovie',routes.issueMoviePS);
//app.post('/IssueMovie',routes.issueMovieWithoutCP)
app.post('/Error',routes.error);


app.get('/Home', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
