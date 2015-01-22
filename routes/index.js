/*
 * GET home page. This file is used to route all the request to various other channels based on the request type.
 */

exports.error=function(req,res)
{
	res.render('Error.html', {
        Error : 'No More Issues! Sorry!'
    });

};





//admin Home

exports.UpdateListOfPersons=function(req,res)
{
	console.log("about to edit the person");

};


exports.adminHome = function(req, res) {
	
	res.render('AdminHome.html');
	

};

exports.adminDisplaySimpleMembers=function(req,res)
{
var adminDiaplaySimpleMembers= require('../database/admin');
adminDiaplaySimpleMembers.retrieveSimpleMembers(req,res);

};


exports.adminDeleteSimpleCustomer=function(req,res)
{
var adminDeleteSimpleCustomer=require('../database/admin');
adminDeleteSimpleCustomer.removeSimpleMember(req,res);

};

exports.adminDisplayPremiumMembers=function(req,res)
{
var adminDisplayPremiumMembers= require('../database/admin');
adminDisplayPremiumMembers.retrievePremiumMembers(req,res);

};


exports.adminDeletePremiumCustomer=function(req,res)
{
var adminDeletePremiumCustomer=require('../database/admin');
adminDeletePremiumCustomer.removePremiumMember(req,res);

};

exports.adminDisplayPersons=function(req,res)
{
var adminDisplayPersons=require('../database/admin');
adminDisplayPersons.adminDisplayPersons(req,res);

};

exports.adminSearchPersons=function(req,res)
{
	console.log("about to search ");
	var a = JSON.stringify(req.body);
	console.log("the cart id --------:" + a);
	var adminSearchPersons=require('../database/admin');
	adminSearchPersons.adminSearchPersons(req,res);

};

exports.makeNewMovie=function(req,res)
{
res.render('MakeNewMovie.html');
};


exports.addNewMovie=function(req,res)
{
	console.log("about to add the new movie ");
	var a = JSON.stringify(req.body);
	var addNewMovie=require('../database/admin');
	addNewMovie.addNewMovie(req,res);

};

exports.getAllMovie=function(req,res)
{
	console.log("about to get all the movies ");
	var a = JSON.stringify(req.body);
	var getAllMovie=require('../database/admin');
	getAllMovie.getAllMovie(req,res);

};

exports.getAllIssuedmovies=function(req,res)
{
	console.log("about to get all the movies ");
	var a = JSON.stringify(req.body);
	var getAllIssuedmovies=require('../database/admin');
	getAllIssuedmovies.getAllIssuedmovies(req,res);

};


exports.adminDeleteMovie=function(req,res)
{
	console.log("about to get all the movies ");
	var a = JSON.stringify(req.body);
	var adminDeleteMovie=require('../database/admin');
	adminDeleteMovie.adminDeleteMovie(req,res);

};

exports.updateMovie=function(req,res)
{
	console.log("about to get all the movies ");
	var a = JSON.stringify(req.body);
	console.log(a);
	var adminupdateMovie=require('../database/admin');
	adminupdateMovie.adminupdateMovie(req,res);

};


exports.retrieveMovieToMember=function(req,res)
{
	console.log("About to issue movie to members");
	var a = JSON.stringify(req.body);
	console.log(a);
	var retrieveMovieToMember=require('../database/admin');
	retrieveMovieToMember.retrieveMovieToMember(req,res);
};

exports.movieToMember=function(req,res)
{
	res.render('IssueMovieToMember.html');


};

exports.ApproveTheRequest=function(req,res)
{
	console.log("About to issue movie to members");
	var a = JSON.stringify(req.body);
	console.log(a);
	var aproveTheRequest=require('../database/admin');
	aproveTheRequest.aproveTheRequest(req,res);
};




// common to both the types of the members


exports.returnMovie=function(req,res)
{
	console.log("About to return the movie");
	var a = JSON.stringify(req.body);
	console.log(a);
	var returnMovie=require('../database/memberLogin');
	returnMovie.returnMovie(req,res);

};




exports.returnIssuedMovie=function(req,res)
{
	console.log("Fetching the List of the Issued Movies !!");
	var returnIssuedMovie=require('../database/memberLogin');
	returnIssuedMovie.returnIssuedMovie(req,res);
	
	
	

};



exports.displayMovie =function(req,res)
{
	console.log("Request for getting all the movies");
	var a = JSON.stringify(req.body);
	console.log(a);
	var displayMovie=require('../database/PremiumMember');
	displayMovie.displayMovie(req,res);

};


exports.editPersonalInfo =function(req,res)
{
	console.log("Request for editing the personal Info");
	var a = JSON.stringify(req.body);
	console.log(a);
	var editPersonalInfo=require('../database/memberLogin');
	editPersonalInfo.editPersonalInfo(req,res);
};

exports.updatePersonalInfo =function(req,res)
{
	console.log("I am going to edit the info ");
	var a = JSON.stringify(req.body);
	console.log(a);
	var updatePersonalInfo=require('../database/memberLogin');
	updatePersonalInfo.updatePersonalInfo(req,res);

};

exports.issueMovie=function(req,res){
	console.log("Going to issue the movie ");
	var a = JSON.stringify(req.body);
	console.log(a);
	var issueMovie=require('../database/memberLogin');
	issueMovie.issueMovie(req,res);

	
};

exports.viewCart=function(req,res)
{
	console.log("The view cart");
	var a = JSON.stringify(req.body);
	console.log(a);
	var viewCart=require('../database/memberLogin');
	viewCart.viewCart(req,res);
};

exports.proceedToPayment=function(req,res)
{
	console.log("Gooing for payment");
	var proceedToPayment=require('../database/memberLogin');
	proceedToPayment.proceedToPayment(req,res);
};


exports.submitPayment=function(req,res)
{
	var submitPayment=require('../database/memberLogin');
	submitPayment.submitPayment(req,res);

};


exports.viewOrderHistory=function(req,res)
{
	var viewOrderHistory=require('../database/memberLogin');
	viewOrderHistory.viewOrderHistory(req,res);

};

exports.UpgradeToPremium=function(req,res)
{
	
	var upgradeToPremium=require('../database/memberLogin');
	upgradeToPremium.UpgradeToPremium(req,res);

};

exports.UpgradePayment=function(req,res)
{
	
	var upgradePayment=require('../database/memberLogin');
	upgradePayment.UpgradePayment(req,res);

};





//Premium Member Home
exports.premiumMemberHome=function(req,res)
{
res.render('PremiumMember.html');

};





//Misc

exports.logout = function(req, res) {
	console.log("Destroying the sesison !! Bye :)");
	req.session.destroy();
	res.render("Sign.html");

};


exports.signUpCheck = function(request, response) {
	console.log("Received the info for the signup !!");
	var a = JSON.stringify(request.body);
	console.log(a);
	var member = require('../database/memberLogin');
	member.signUp(request, response);

};

exports.signUp = function(request, response) {
	console.log(" redirecting the url");
	response.render('SignUp.html');

};

exports.SignIn = function(request, resposnce) {
	console.log("Signing in get the useename and pwd!!");
	var a = JSON.stringify(request.body);
	console.log(JSON.stringify(request.body));
	var member = require('../database/memberLogin');
	member.verify(request, resposnce);

};

exports.issueMovieDN=function(req,res){
    console.log("Going to issue the movie ");
    var a = JSON.stringify(req.body);
    console.log(a);
    var issueMovie=require('../database/memberLogin');
    issueMovie.issueMovieDN(req,res);

    
};

exports.issueMoviePS=function(req,res){
    console.log("Going to issue the movie ");
    var a = JSON.stringify(req.body);
    console.log(a);
    var issueMovie=require('../database/memberLogin');
    issueMovie.issueMoviePS(req,res);

    
};

exports.issueMovieRedis=function(req,res){
    console.log("Going to issue the movie ");
    var a = JSON.stringify(req.body);
    console.log(a);
    var issueMovie=require('../database/memberLogin');
    issueMovie.issueMovieRedis(req,res);

    
};

exports.issueMovieWithoutCP=function(req,res){
    console.log("Going to issue the movie ");
    var a = JSON.stringify(req.body);
    console.log(a);
    var issueMovie=require('../database/memberLogin');
    issueMovie.issueMovieWithoutCP(req,res);

    
};


exports.SignInDN = function(request, resposnce) {
    console.log("Signing in get the useename and pwd!!");
    var a = JSON.stringify(request.body);
    console.log(JSON.stringify(request.body));
    var member = require('../database/memberLogin');
    member.verifyDN(request, resposnce);

};

exports.signUpCheckDN = function(request, response) {
    console.log("Received the info for the signup !!");
    var a = JSON.stringify(request.body);
    console.log(a);
    var member = require('../database/memberLogin');
    member.signUpDN(request, response);

};

exports.sign = function(req, res) {

	res.render('Sign.html');
};


exports.index = function(req, res) {
	res.render('MemberHome.html');
};
	
//exports.index = function(req, res) {
//
//	var catalog = [ {
//		"catalogid" : 1,
//		"catalogName" : "Electronics",
//		"url" : "/img/Electronics.jpg"
//	}, {
//		"catalogid" : 2,
//		"catalogName" : "Books",
//		"url" : "/img/book.jpg"
//	}, {
//		"catalogid" : 3,
//		"catalogName" : "Tools&Home_Improvement",
//		"url" : "/img/toolshome.jpg"
//	}, {
//		"catalogid" : 4,
//		"catalogName" : "Movies,Music&Games",
//		"url" : "/img/gamesmusic.jpg"
//	} ];
//
//	var date1 = new Date(req.session.lastlogin);
//	console.log("The date ------------------------------>>" + date1);
//	console.log("The session id is ----------->> " + req.sessionID);
//	var first = req.session.firstName;
//	res.render('Catalog.html', {
//		title : "Catalog !!",
//		catalog : catalog,
//		logindate : date1,
//		firstName : first
//	});
//
//};

