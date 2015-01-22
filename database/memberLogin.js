/**
 * New node file for implementing all the member related operation like authentication, last login etc.
 */

var lastlogin;

var redis = require('redis');

var connectionPool = require('../database/connectionPooling');
var pool = connectionPool.Pool();
pool.connect();

//var client = redis.createClient();
var inditems = [];
/*
client.flushdb();
client.on("connect", runSample);

function runSample() {
//    Set a value
    client.setnx("string key", "Hello World", function (err, reply) {
        console.log(reply.toString());
    });
//    Get a value
    client.get("string key", function (err, reply) {
        console.log(reply.toString());
    });
}*/

function updateCopies(movieId)
{

	
	var sqlc = 'select availableCopies from movie where movieId = "' + movieId + '"';
	console.log("updatecopie" +sqlc);
	pool.query(sqlc, function(err, results1) {
		if (err) {
			console.log("ERROR: select not worked(availabecopies)" + err.message);
			var error = err.message;
		} else {
			var copy = (results1[0].availableCopies);
			if(copy>0)
			{
			copy = copy - 1;
			var sqlb = 'update movie set availableCopies = "' + copy + '" where  movieId = "' + movieId + '"';
			console.log("upadte copie"+sqlb);
			pool.query(sqlb, function(err, results1) {
				if (err) {
					console.log("ERROR: update not worked(availabecopies)" + err.message);
					var error = err.message;
				} else {
					console.log("success update");
				}
			});
			}
		}
	});
}



function lastLoginDate(memberId) {
	var member = memberId;

	
	var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='
		+ member;
	pool.query(sql1, function(err, results1) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			var str = (results1[0].lastLoginDate);
			var str1 = new Date(str.toLocaleString());
			var date = new Date(str1);
			console.log(" new date :" + date);
			lastlogin = date;
		}
	});
	console.log("getting last login :" + lastlogin);
	return lastlogin;
};

function timeStamp() {
	var now = new Date();
	var date = [ now.getFullYear(), now.getMonth() + 1, now.getDate() ];
	var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
	for ( var i = 0; i < 3; i++) {
		if (time[i] < 10) {
			time[i] = "0" + time[i];
		}
	}
	for ( var i = 1; i < 3; i++) {
		if (date[i] < 10) {
			date[i] = "0" + date[i];
		}
	}
	return date.join("-") + " " + time.join(":");
}

function verify(req, res) {
	var a = JSON.stringify(req.body);
	var obj = JSON.parse(JSON.stringify(req.body));
	var userName = obj.userName.toString();
	console.log("username " + userName);
	var password = obj.Password.toString();
	console.log(" the pwd is:" + password);
	
	var sqlVerify = 'select * from member where userName="' + userName
	+ '" and password= "' + password + '"';
	var str = sqlVerify.toString();
	var se = JSON.stringify(str);
	console.log("the new " + se);
	pool.query(sqlVerify,
			function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else if (results.length == 0) {
			console.log("came in this ");
			res.render('Sign_Reenter.html', {
				Error : "User not authenticated !!"
			});
		}
		else if (results[0].admin == "Y") {
			console.log("came into the admin module check  ");
			console.log(results);
			console.log(results[0].memberId);
			console.log(results[0].firstName);
			req.session.memberId = results[0].memberId;
			req.session.firstName = results[0].firstName;
			var member = req.session.memberId;

			var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='
				+ member;
			pool.query(sql1, function(err, results1) {
				if (err) {
					console.log("ERROR: " + err.message);
					var error = err.message;
					res.render('Error.html', {
						Error : error
					});
				} else {
					var str = (results1[0].lastLoginDate);
					var str1 = new Date(str.toString());
					var date = new Date(str1);
					console.log(" new date :" + date);
					req.session.lastlogin = date;
					console.log("The session variable : "
							+ req.session.lastlogin);
				}
			});
			var dateHere = lastLoginDate(member);
			console.log(" date last login : ---" + dateHere);
			var time = timeStamp();
			var sql = 'insert into login values(null,' + member
			+ ',"' + time + '")';
			pool.query(sql, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
					var error = err.message;
					res.render('Error.html', {
						Error : error
					});
				} else {
					console.log("date is persisted");
				}
			});
			res.redirect('/AdminHome');

		}

		else if (results[0].premiumMember == "Y" && results[0].admin == "N") {
			console.log("came into the premium member module   ");
			console.log(results);
			console.log(results[0].memberId);
			console.log(results[0].firstName);
			req.session.memberId = results[0].memberId;
			req.session.firstName = results[0].firstName;
			var member = req.session.memberId;

			var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='
				+ member;
			pool.query(sql1, function(err, results1) {
				if (err) {
					console.log("ERROR: " + err.message);
					var error = err.message;
					res.render('Error.html', {
						Error : error
					});
				} else {
					var str = (results1[0].lastLoginDate);
					var str1 = new Date(str.toString());
					var date = new Date(str1);
					console.log(" new date :" + date);
					req.session.lastlogin = date;
					console.log("The session variable : "
							+ req.session.lastlogin);
				}
			});
			var dateHere = lastLoginDate(member);
			console.log(" date last login : ---" + dateHere);
			var time = timeStamp();
			var sql = 'insert into login values(null,' + member
			+ ',"' + time + '")';
			pool.query(sql, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
					var error = err.message;
					res.render('Error.html', {
						Error : error
					});
				} else {
					console.log("date is persisted");
				}
			});



			res.redirect('/PremiumMemberHome');

		}






		else {
			console.log(results);
			console.log(results[0].memberId);
			console.log(results[0].firstName);
			req.session.memberId = results[0].memberId;
			req.session.firstName = results[0].firstName;
			var member = req.session.memberId;

			var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='
				+ member;
			pool.query(sql1, function(err, results1) {
				if (err) {
					console.log("ERROR: " + err.message);
					var error = err.message;
					res.render('Error.html', {
						Error : error
					});
				} else {
					var str = (results1[0].lastLoginDate);
					var str1 = new Date(str.toString());
					var date = new Date(str1);
					console.log(" new date :" + date);
					req.session.lastlogin = date;
					console.log("The session variable : "
							+ req.session.lastlogin);
				}
			});
			var dateHere = lastLoginDate(member);
			console.log(" date last login : ---" + dateHere);
			var time = timeStamp();
			var sql = 'insert into login values(null,' + member
			+ ',"' + time + '")';
			pool.query(sql, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
					var error = err.message;
					res.render('Error.html', {
						Error : error
					});
				} else {
					console.log("date is persisted");
				}
			});






			res.redirect('/Home');
		}
	});
}

exports.signUp = function(req, res) {
	console.log("Received the info for the signup  in the member Login!!");
	var obj = JSON.parse(JSON.stringify(req.body));
	console.log("Here it is ---->"+obj);
	var firstName = obj.firstName;
	var lastName = obj.lastName;
	var userName = obj.userName;
	var password = obj.password;
	var address = obj.address;
	var phone = obj.phone;
	var email = obj.email;
	var address=obj.address;
	var city=obj.city;
	var state=obj.state;
	var zipcode=obj.zipcode;
	var preMember=obj.premiumMember;
	var email=obj.email;
	var member=null;
	var premiumValue=null;
	var sqlVerify = 'select * from member where userName="' + userName + '" ';
	
	var str = sqlVerify.toString();
	var se = JSON.stringify(str);
	console.log("the new " + se);
	pool.query(sqlVerify,
				function(err, results) {
					if (err) {
						console.log("ERROR: " + err.message);
						var error = err.message;
						res.render('Error.html', {
							Error : error
						});
					} else if (results.length > 0) {
						console.log("came in this ");
						res.render('SignUp_reenter.html', {
							Error : "Username already exists !!"
						});
					}
					else
						
{						
	if(preMember== "on")
	{
		//console.log(pr)
		premiumValue= 'Y';
	}
	else
	{
		premiumValue= 'N';
	}
	

	var sqlVerify = 'insert into member values(null,"' + firstName + '","'
	+ lastName + '","'+address + '","'+city+'","'+state+'","'+zipcode+'","'+email+'","'+userName + '","' + password + '","'+premiumValue+'","N")';
	var str = sqlVerify.toString();
	console.log(str);
	pool.query(sqlVerify, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			var sql3="select * from member where userName='"+userName+"'";

			console.log(sql3);
			pool.query(sql3, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
					var error = err.message;
					res.render('Error.html', {
						Error : error
					});
				}
				else{
					var memberid=results[0].memberId;
					console.log("The menberid retrieved is -------->"+memberid);
					var member =memberid;
					var time = timeStamp();


					if(results[0].premiumMember == 'Y')
					{
						console.log("Persising the enry for the premium member in the priemum member table ");
						var sql7 = 'insert into premiummember values(' + member+ ',300,null,0 )';
						console.log(sql7);
						pool.query(sql7, function(err, results) {
							if (err) {
								console.log("ERROR: " + err.message);
								var error = err.message;
								res.render('Error.html', {Error : error});

							}
						});
					}
					else
					{
						console.log("Persising the enry for the simple member in the simple  member table ");

						var sql9 = 'insert into simplemember values(' + member+ ',null,0 )';
						console.log(sql9);
						pool.query(sql9, function(err, results) {
							if (err) {
								console.log("ERROR: " + err.message);
								var error = err.message;
								res.render('Error.html', {Error : error});

							}
						});

					}












					console.log(member);
					var sql = 'insert into login values(null,' + member
					+ ',"' + time + '")';
					console.log(sql);

					pool.query(sql, function(err, results) {
						if (err) {
							console.log("ERROR: " + err.message);
							var error = err.message;
							res.render('Error.html', {
								Error : error
							});
						} else {
							console.log("date is persisted");
						}
					});
				}
			});



			res.render('Sign.html');
		}
	});
	
}
	});
};



exports.editPersonalInfo = function(req,res)
{

	var member=req.session.memberId;
	var sql="select * from member where memberId="+member;
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			console.log("We have the results for concerned member "+results);
			var membertype=false;
			if(results[0].premiumMember==='Y')
				membertype=true;
			res.render('EditPersonalInfo.html', {title : "Edit Personal Info  !!",PersonalInfoResults : results, membertype : membertype});
		}
	});
};

exports.updatePersonalInfo=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["row_id"];
	var col=json["column"];
	var columnName;
	if(parseInt(col)==0)
	{
		columnName="memberId";
	}
	else if(parseInt(col)==1)
	{
		columnName="firstName";
	}
	else if(parseInt(col)==2)
	{
		columnName="lastName";
	}
	else if(parseInt(col)==3)
	{
		columnName="address";
	}
	else if(parseInt(col)==4)
	{
		columnName="city";
	}
	else if(parseInt(col)==5)
	{
		columnName="state";
	}
	else if(parseInt(col)==6)
	{
		columnName="zipcode";
	}
	else
	{
		columnName="email";
	}
	var value=json["value"];
	console.log("the value  of id :" + b);
	
	var sql = 'update member set ' +columnName+'="'+value  +'" where memberId=' + parseInt(b);
	console.log("The query is--->"+ sql);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully updated  the Personal Info !!");
		res.send(value);

	});
};

exports.issueMovie = function(req,res)

{
    
    var a = JSON.stringify(req.body);
    var json = JSON.parse(a);
    console.log("The json is like :"+json);
    var movieId=json["MovieId"];
    var member=req.session.memberId;

    var sql30='select * from premiummember where memberId in (select memberId from member where premiummember="Y" and memberId='+ member +')';

    console.log(sql30);
    pool.query(sql30, function(err, results){
        if(err)
        {
            console.log("Error: "+ err.message);
        }
        else if(results.length===0)
        {
            var sql31='select * from simplemember where memberId in (select memberId from member where premiummember="N" and memberId='+ member +')';

            console.log(sql31);
            pool.query(sql31, function(err, results1){

                if(err)
                {}

                else if((results1.length>0)&&(results1[0].totalIssuedMovies>=2))

                {
                    console.log("came in this ");


                    console.log("Cant issue more movies!");
//                     return res.render('Error.html', {
//                        Error : 'No More Issues! Sorry!'
//                    });

                    
                }
                else if(results1.length>0)
                {
                    var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
                    //updateCopies(movieId);
                    console.log(sqlQuery);
                    pool.query(sqlQuery, function(err, results) {
                        if (err) {
                            console.log("ERROR: " + err.message);
                        }
                        else{

                           



                        }

                    });

                }

            });

        }
        else if((results.length>0)&&(results[0].totalIssuedMovies>=10))

        {
            console.log("came into the premium member to test the movie for 10 !!");


            console.log("Cant issue more movies!");
          //  res.redirect('/Error');
        }

        else if(results.length>0)
        {

            var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
            //updateCopies(movieId);
            console.log(sqlQuery);
            pool.query(sqlQuery, function(err, results) {
                if (err) {
                    console.log("ERROR: " + err.message);
                }
                else{

                  

                }

            });



        }
    });
    
	//res.writeHead(200, {'Content-Type': 'text/html'});
//	res.write();
   // res.end();
}

exports.issueMovieWithoutCP = function(req,res)
{
var connection = mysql.createConnection({
host : 'localhost',
user : 'user1',
password : 'user1',
port : '3306',
database : 'videolibrary'
});
connection.connect();
   // var connectionPool = require('../database/connectionPooling');
    //var pool = connectionPool.Pool();
    //pool.connect();
    var a = JSON.stringify(req.body);
    var json = JSON.parse(a);
    console.log("The json is like :"+json);
    var movieId=json["IssueId"];
    var member=json["memberId"];
    console.log("The member id ----------->"+member);
   // var member=req.session.memberId;
    
    console.log("member in without CP"+member);

    var sql30='select * from premiummember where memberId in (select memberId from member where premiummember="Y" and memberId='+ member +')';

    console.log(sql30);
    connection.query(sql30, function(err, results){
        if(err)
        {
            console.log("Error: "+ err.message);
        }
        else if(results.length===0)
        {
            var sql31='select * from simplemember where memberId in (select memberId from member where premiummember="N" and memberId='+ member +')';

            console.log(sql31);
            connection.query(sql31, function(err, results1){

                if(err)
                {
                    console.log("Error!");
                }

                else if((results1.length>0)&&(results1[0].totalIssuedMovies>=2))
                {
                    //Error=new Error();
                    console.log("came in this ");


                    console.log("Cant issue more movies!");
                    res.render('Error.html', {
                        Error : 'No More Issues! Sorry!'
                    });

                }
                else if(results1.length>0)
                {
                    var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
                    updateCopies(movieId);
                    console.log(sqlQuery);
                    connection.query(sqlQuery, function(err, results) {
                        if (err) {
                            console.log("ERROR: " + err.message);
                        }
                        else{

                            var sql4='UPDATE simplemember SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= '+member;

                            console.log(sql4);
                            connection.query(sql4, function(err, results){
                                if(err)
                                {
                                    console.log("Error: "+ err.message);
                                }
                            });



                        }

                    });

                }

            });

        }
        else if((results.length>0)&&(results[0].totalIssuedMovies>=10))

        {
            console.log("came in this ");


            console.log("Cant issue more movies!");
            res.render('Error.html', {
                Error : 'No More Issues! Sorry!'
            });
        }

        else if(results.length>0)
        {

            var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
            updateCopies(movieId);
            console.log(sqlQuery);
            connection.query(sqlQuery, function(err, results) {
                if (err) {
                    console.log("ERROR: " + err.message);
                }
                else{

                    var sql4='UPDATE premiummember SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= '+member;

                    console.log(sql4);
                    connection.query(sql4, function(err, results){
                        if(err)
                        {
                            console.log("Error: "+ err.message);
                        }
                    });

                }

            });

            res.send("The call happened!");
            res.status(200);
            res.render('Error.html', {
                Error : 'No More Issues! Sorry!'
            });


        }
    });
};


exports.issueMovieDN = function(req,res)
{
    /*var connectionPool = require('../database/connectionPooling');
    var pool = connectionPool.Pool();
    pool.connect();*/
    var a = JSON.stringify(req.body);
    var json = JSON.parse(a);
    console.log("The json is like :"+json);
    var movieId=json["IssueId"];
    var member=json["memberId"];
    //var member=req.session.memberId;
    
    console.log("Issue movie DN"+ member);
    
    var sql30='select * from memberdn where memberId='+ member;
    console.log(sql30);
    pool.query(sql30, function(err, results){
        if(err)
        {
            console.log("Error: "+ err.message);
        }
        else if(results[0].premiumMember==='N')
        {

            if(results[0].totalIssuedMovies>=2)
            {
                //Error=new Error();
                console.log("came in this " + results[0].memberId);

                

                //inditems.push(results[0]);


                console.log("Cant issue more movies!");
                res.render('Error.html', {
                    Error : 'No More Issues! Sorry!'
                });

            }
            else
            {
                var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
                updateCopies(movieId);
                console.log(sqlQuery);
                pool.query(sqlQuery, function(err, resultsq) {
                    if (err) {
                        console.log("ERROR: " + err.message);
                    }
                    else{

                        var sql4='UPDATE memberdn SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= '+member;
                        console.log(sql4);
                        pool.query(sql4, function(err, results4){
                            if(err)
                            {
                                console.log("Error: "+ err.message);
                            }
                            else
                            {
                                

                                //inditems.push(results[0]);

                                res.send("The success call happened!");
                                res.status(200);
                            }
                        });

                    }

                });

            }



        }
        else if(results[0].premiumMember==='Y')
        {
            if(results[0].totalIssuedMovies>=10)
            {
                console.log("came in this ");
                


                //inditems.push(results[0]);

                console.log("Cant issue more movies!");
                res.render('Error.html', {
                    Error : 'No More Issues! Sorry!'
                });
            }

            else
            {


                var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
                updateCopies(movieId);
                console.log(sqlQuery);
                pool.query(sqlQuery, function(err, resultsq) {
                    if (err) {
                        console.log("ERROR: " + err.message);
                    }
                    else{

                        var sql4='UPDATE memberdn SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= '+member;
                        console.log(sql4);
                        pool.query(sql4, function(err, results4){
                            if(err)
                            {
                                console.log("Error: "+ err.message);
                            }
                            else{
                                

                                //inditems.push(results[0]);
                                res.send("The success call happened!");
                                res.status(200);

                            }
                        });


                    }

                });



            }



        }
    });

};

exports.issueMovieRedis = function(req,res)
{
    /*var connectionPool = require('../database/connectionPooling');
    var pool = connectionPool.Pool();
    pool.connect();*/
    var a = JSON.stringify(req.body);
    var json = JSON.parse(a);
    console.log("The json is like :"+json);
    var movieId=json["IssueId"];
    var member=json["memberId"];
    //var member=req.session.memberId;
    console.log("Member in redis is :"+ member);


    client.hget("issuemovie", member,  function(err, results1)
            {
        if(results1===null)
        {
            console.log("Nothing in redis! So, querying from SQL!");

            var sql30='select * from memberdn where memberId='+ member;
            console.log(sql30);
            pool.query(sql30, function(err, results){
                if(err)
                {
                    console.log("Error: "+ err.message);
                }
                else if(results[0].premiumMember==='N')
                {

                    if(results[0].totalIssuedMovies>=2)
                    {
                        //Error=new Error();
                        console.log("came in this " + results[0].memberId);

                        client.hset("issuemovie", results[0].memberId, results[0].premiumMember);
                        client.hset("issuemovie", results[0].memberId+"tim", results[0].totalIssuedMovies);

                        //inditems.push(results[0]);


                        console.log("Cant issue more movies!");
                        res.render('Error.html', {
                            Error : 'No More Issues! Sorry!'
                        });

                    }
                    else
                    {
                        var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
                        updateCopies(movieId);
                        console.log(sqlQuery);
                        pool.query(sqlQuery, function(err, resultsq) {
                            if (err) {
                                console.log("ERROR: " + err.message);
                            }
                            else{

                                var sql4='UPDATE memberdn SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= '+member;
                                console.log(sql4);
                                pool.query(sql4, function(err, results4){
                                    if(err)
                                    {
                                        console.log("Error: "+ err.message);
                                    }
                                    else
                                    {
                                        client.hset("issuemovie", results[0].memberId, results[0].premiumMember);
                                        client.hset("issuemovie", results[0].memberId+"tim", results[0].totalIssuedMovies);

                                        //inditems.push(results[0]);

                                        res.send("The success call happened!");
                                        res.status(200);
                                    }
                                });

                            }

                        });

                    }



                }
                else if(results[0].premiumMember==='Y')
                {
                    if(results[0].totalIssuedMovies>=10)
                    {
                        console.log("came in this ");
                        client.hset("issuemovie", results[0].memberId, results[0].premiumMember);
                        client.hset("issuemovie", results[0].memberId+"tim", results[0].totalIssuedMovies);


                        //inditems.push(results[0]);

                        console.log("Cant issue more movies!");
                        res.render('Error.html', {
                            Error : 'No More Issues! Sorry!'
                        });
                    }

                    else
                    {


                        var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
                        updateCopies(movieId);
                        console.log(sqlQuery);
                        pool.query(sqlQuery, function(err, resultsq) {
                            if (err) {
                                console.log("ERROR: " + err.message);
                            }
                            else{

                                var sql4='UPDATE memberdn SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= '+member;
                                console.log(sql4);
                                pool.query(sql4, function(err, results4){
                                    if(err)
                                    {
                                        console.log("Error: "+ err.message);
                                    }
                                    else{
                                        client.hset("issuemovie", results[0].memberId, results[0].premiumMember);
                                        client.hset("issuemovie", results[0].memberId+"tim", results[0].totalIssuedMovies);


                                        //inditems.push(results[0]);
                                        res.send("The success call happened!");
                                        res.status(200);

                                    }
                                });


                            }

                        });



                    }



                }
            });

        }
        else
        {
            console.log("Fetching and manipultaing data from redis!");
            /*var json=JSON.parse(results1);

            var mem=json["memberId"];
            var totissuedmovies=json["totalIssuedMovies"];
            var premmember=json["premiumMember"];
            
            console.log(mem);*/
            console.log(results1);
            client.hget("issuemovie", member+"tim", function(err, timvalues) 
                    {
                if(err)
                    {
                    
                    }
                console.log(timvalues);
                if((results1==='Y')&&(timvalues>=10))
                {
                    console.log("No more issues coming from redis!");
                    res.status(200);
                    res.render('Error.html', {
                        Error : 'No More Issues! Sorry!'
                    });
                            
                }
                else
                    {
                    
                    //client.hset("issuemovie", mem, json["totalIssuedMovies"], totissuedmovies+1);
                    console.log("Incrementing the count!");
                    
                    var sql4='UPDATE memberdn SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= '+member;
                    console.log(sql4);
                    pool.query(sql4, function(err, results4){
                        if(err)
                        {
                            console.log("Error: "+ err.message);
                        }
                        else{
                            
                            console.log("Here!!!" + timvalues + member);
                            
                            //client.hset("issuemovie", results[0].memberId, JSON.stringify(results[0]));
                            //client.hset("issuemovie", results[0].memberId, results[0].premiumMember);
                            client.hset("issuemovie", member+"tim", parseInt(timvalues)+1);


                            //inditems.push(results[0]);
                            res.send("The success call happened!");
                            res.status(200);

                        }
                    });
                    }

                    });
                        
        }
            });
};

exports.issueMoviePS = function(req,res)
{
    /*var connectionPool = require('../database/connectionPooling');
    var pool = connectionPool.Pool();
    pool.connect();*/
    var a = JSON.stringify(req.body);
    var json = JSON.parse(a);
    console.log("The json is like :"+json);
    var movieId=json["IssueId"];
    var member=json["memberId"];
    //var member=req.session.memberId;
    console.log("Member in PS is :"+ member);


    client.hget("issuemovie", member,  function(err, results1)
            {
        if(results1===null)
        {
            console.log("Nothing in redis! So, querying from SQL!");

            var sql30='select * from memberdn where memberId= ?';
            console.log(sql30);
            pool.query(sql30, [member], function(err, results){
                if(err)
                {
                    console.log("Error: "+ err.message);
                }
                else if(results[0].premiumMember==='N')
                {

                    if(results[0].totalIssuedMovies>=2)
                    {
                        //Error=new Error();
                        console.log("came in this " + results[0].memberId);

                        client.hset("issuemovie", results[0].memberId, results[0].premiumMember);
                        client.hset("issuemovie", results[0].memberId+"tim", results[0].totalIssuedMovies);

                        //inditems.push(results[0]);


                        console.log("Cant issue more movies!");
                        res.render('Error.html', {
                            Error : 'No More Issues! Sorry!'
                        });

                    }
                    else
                    {
                        //var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
                        var sqlQuery='Insert into cart values(?,?,?,?, ?, ?)';
                        updateCopies(movieId);
                        console.log(sqlQuery);
                        
function(err, resultsq) {
                            if (err) {
                                console.log("ERROR: " + err.message);
                            }
                            else{

                                var sql4='UPDATE memberdn SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= ?';
                                console.log(sql4);
                                pool.query(sql4, [member], function(err, results4){
                                    if(err)
                                    {
                                        console.log("Error: "+ err.message);
                                    }
                                    else
                                    {
                                        client.hset("issuemovie", results[0].memberId, results[0].premiumMember);
                                        client.hset("issuemovie", results[0].memberId+"tim", results[0].totalIssuedMovies);

                                        //inditems.push(results[0]);

                                        res.send("The success call happened!");
                                        res.status(200);
                                    }
                                });

                            }

                        });

                    }



                }
                else if(results[0].premiumMember==='Y')
                {
                    if(results[0].totalIssuedMovies>=10)
                    {
                        console.log("came in this ");
                        client.hset("issuemovie", results[0].memberId, results[0].premiumMember);
                        client.hset("issuemovie", results[0].memberId+"tim", results[0].totalIssuedMovies);


                        //inditems.push(results[0]);

                        console.log("Cant issue more movies!");
                        res.render('Error.html', {
                            Error : 'No More Issues! Sorry!'
                        });
                    }

                    else
                    {


                        //var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
                        var sqlQuery='Insert into cart values(?,?,?,SYSDATE(), ?, (select rentAmount from movie where movieId=?))';
                        updateCopies(movieId);
                        console.log(sqlQuery);
                        var date=new Date();
                        console.log(date);
                        pool.query(sqlQuery, [null, movieId, member, 1, movieId], function(err, resultsq) {
                            if (err) {
                                console.log("ERROR: " + err.message);
                            }
                            else{

                                var sql4='UPDATE memberdn SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= ?';
                                console.log(sql4);
                                pool.query(sql4,[member], function(err, results4){
                                    if(err)
                                    {
                                        console.log("Error: "+ err.message);
                                    }
                                    else{
                                        client.hset("issuemovie", results[0].memberId, results[0].premiumMember);
                                        client.hset("issuemovie", results[0].memberId+"tim", results[0].totalIssuedMovies);


                                        //inditems.push(results[0]);
                                        res.send("The success call happened!");
                                        res.status(200);

                                    }
                                });


                            }

                        });



                    }



                }
            });

        }
        else
        {
            console.log("Fetching and manipultaing data from redis!");
            /*var json=JSON.parse(results1);

            var mem=json["memberId"];
            var totissuedmovies=json["totalIssuedMovies"];
            var premmember=json["premiumMember"];
            
            console.log(mem);*/
            console.log(results1);
            client.hget("issuemovie", member+"tim", function(err, timvalues) 
                    {
                if(err)
                    {
                    
                    }
                console.log(timvalues);
                if((results1==='Y')&&(timvalues>=10))
                {
                    console.log("No more issues coming from redis!");
                    res.status(200);
                    res.render('Error.html', {
                        Error : 'No More Issues! Sorry!'
                    });
                            
                }
                else
                    {
                    
                    //client.hset("issuemovie", mem, json["totalIssuedMovies"], totissuedmovies+1);
                    console.log("Incrementing the count!");
                    
                    var sql4='UPDATE memberdn SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= ?';
                    console.log(sql4);
                    pool.query(sql4,[member], function(err, results4){
                        if(err)
                        {
                            console.log("Error: "+ err.message);
                        }
                        else{
                            
                            console.log("Here!!!" + timvalues + member);
                            
                            //client.hset("issuemovie", results[0].memberId, JSON.stringify(results[0]));
                            //client.hset("issuemovie", results[0].memberId, results[0].premiumMember);
                            client.hset("issuemovie", member+"tim", parseInt(timvalues)+1);


                            //inditems.push(results[0]);
                            res.send("The success call happened!");
                            res.status(200);

                        }
                    });
                    }

                    });
                        
        }
            });
};


/*
exports.issueMovie = function(req,res)
{
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	console.log("The json is like :"+json);
	var movieId=json["IssueId"];
	var member=req.session.memberId;

	var sql30='select totalIssuedMovies from premiummember where memberId in (select memberId from member where premiummember="Y" and memberId='+ member +') and totalIssuedMovies>=10';
	console.log(sql30);
	pool.query(sql30, function(err, results){
		if(err)
		{
			console.log("Error: "+ err.message);
		}
		else if(results.length===0)
		{
			var sql31='select * from simplemember where memberId in (select memberId from member where premiummember="N" and memberId='+ member +') and totalIssuedMovies>=2';
			console.log(sql31);
			pool.query(sql31, function(err, results1){

				if(err)
				{}

				else if(results1.length>0)
				{
					//Error=new Error();
					console.log("came in this ");


					console.log("Cant issue more movies!");
					res.render('Error.html', {
						Error : 'No More Issues! Sorry!'
					});

				}
				else
				{
							var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
							updateCopies(movieId);
							console.log(sqlQuery);
							pool.query(sqlQuery, function(err, results) {
								if (err) {
									console.log("ERROR: " + err.message);
								}
								else{

									var sql4='UPDATE simplemember SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= '+member;
									console.log(sql4);
									pool.query(sql4, function(err, results){
										if(err)
										{
											console.log("Error: "+ err.message);
										}
									});



						}

					});

				}

			});

		}
		else if(results.length>0)
			{
			console.log("came in this ");


			console.log("Cant issue more movies!");
			res.render('Error.html', {
				Error : 'No More Issues! Sorry!'
			});
			}
		
		else
			{

					var sqlQuery='Insert into cart values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'))';
					updateCopies(movieId);
					console.log(sqlQuery);
					pool.query(sqlQuery, function(err, results) {
						if (err) {
							console.log("ERROR: " + err.message);
						}
						else{

							var sql4='UPDATE simplemember SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= '+member;
							console.log(sql4);
							pool.query(sql4, function(err, results){
								if(err)
								{
									console.log("Error: "+ err.message);
								}
							});

				}

			});

		
			
			}
	});
};

*/


exports.viewCart = function(req,res)
{
	var membertype;
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	console.log("The json is like :"+json);
	var member=req.session.memberId;
	console.log("The meneber id is :"+member);
	var sql2 = 'select * from  member where memberId='+member;
	
	var sql='select * from  cart where memberId='+member;
	console.log("The query being formed is :"+sql);
	

	pool.query(sql2, function(err, results1) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			console.log("cart select success");
			
			if(results1[0].premiumMember==='Y')
				membertype=true;
			else
				membertype=false;
			
		}
	});
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			console.log("member type" + membertype)
		res.render('MemberCart.html', {memberCart : results, membertype : membertype});
		}
	
		});
	
};


exports.proceedToPayment=function(req,res)
{
	var member=req.session.memberId;
	console.log("The meneber id is :"+member);
	var membertype;
	var sql2 = 'select * from  member where memberId='+member;
	var sql='select * from  ordermovie where memberId='+member;
	console.log("The query being formed is :"+sql);
		
	pool.query(sql2, function(err, results1) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			console.log("movie select success");
			
			if(results1[0].premiumMember==='Y')
				membertype=true;
			else
				membertype=false;
			
		}
	});
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else 
		{

			var price = 0;
			var numRows = results.length;
			var quantity=numRows;
			console.log("Fetched -->"+numRows);
			for(var i=0;i<numRows;i++)
			{
				console.log("First"+results[i].price);
				price=price+results[i].price;
			}
			console.log("The total cost is :"+price);
			res.render('PaymentDetails.html', {premcost: price + 300, memberId : req.session.memberId, issueDate : results[0].issueDate , totalQuantity :quantity , totalPrice:price,membertype : membertype});
		}


	});

};

/*
exports.submitPayment=function(req,res)
{
	var type=null;
	var member=req.session.memberId;
	console.log("The meneber id is :"+member);
	var sql='select * from  cart where memberId='+member;
	console.log("The query being formed is :"+sql);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{

			var sql2='select * from member where memberId='+member;
			console.log("The member ---------->"+member);
			var connectionPool = require('../database/connectionPooling');
			var pool = connectionPool.Pool();
			pool.connect();
			pool.query(sql2, function(err, results1) {
				if (err) {
					console.log("ERROR: " + err.message);
				}
				else
				{
//					if(results1[0].premiumMember == 'Y')
//					{
//					console.log("Setting the type to premium");
//					type= "premiummember";
//					}
//					else 
//					{
//					console.log("Setting the type to simple");
//					type="simplemember";
//					}
				}


			});

			var totalIssue=null;
			for ( var i = 0; i < results.length; i++) {
				var cartid = results[i].cartId;
				var movieId=results[i].movieId;
				var totalPrice = results[i].price;
				var quantity = results[i].quantity;
				var issueDate = results[i].issueDate;
				var memberId=results[i].memberId;
				var now = new Date(issueDate);
				var date = [ now.getFullYear(), now.getMonth() + 1, now.getDate() ];
				for ( var m = 1; m < 3; m++) {
					if (date[m] < 10) {
						date[m] = "0" + date[m];
					}
				}
				var currentDateFromed= date.join("-");
				var sql1 = 'insert into ordermovie values(null,' + movieId + ','
				+ memberId + ',\'' + currentDateFromed + '\',' + quantity + ','
				+ totalPrice + ',\'N\''+')';
				console.log("The sql " + sql1);
				pool.query(sql1, function(err, results) {
					if (err) {
						console.log("ERROR: " + err.message);
					}
				});
				var sql1 = 'Delete from cart where cartid=' + cartid;
				console.log("Deleting the SQL is : " + sql1);
				pool.query(sql1, function(err, results) {
					if (err) {
						console.log("ERROR: " + err.message);
					}

				});
			}

			var sql8='select * from  ordermovie O, member M where O.memberId='+member+' and O.returned =\'N\'';
			console.log("The query being formed is :"+sql8);
			var connectionPool = require('../database/connectionPooling');
			var pool = connectionPool.Pool();
			pool.query(sql8, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
				}
				else
				{
					totalIssue=results.length;
					console.log("the total issued movies---> "+totalIssue);
					if(results[0].premiumMember == 'Y')
					{
						console.log("Setting the type to premium");
						type= "premiummember";
					}
					else 
					{
						console.log("Setting the type to simple");
						type="simplemember";
					}
					var anotherSQL='Update '+type+' SET totalIssuedMovies='+totalIssue+' where memberId='+member;
					console.log("query for updating the type --------------------------->"+anotherSQL);
					var connectionPool = require('../database/connectionPooling');
					var pool = connectionPool.Pool();
					pool.query(anotherSQL, function(err, results) {
						if (err) {
							console.log("ERROR: " + err.message);
						}
					});

				}
			});

			res.render('Thanks.html');	
		}

	});
}; */

exports.submitPayment=function(req,res)
{
    var type=null;
    var member=req.session.memberId;
    console.log("The meneber id is :"+member);
    var sql2 = 'select * from  member where memberId='+member;
    var sql='select * from  cart where memberId='+member;
    console.log("The query being formed is :"+sql);

   
    
    
    pool.query(sql2, function(err, results1) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			console.log("cart select success");
			
			if(results1[0].premiumMember==='Y')
				membertype=true;
			else
				membertype=false;
			
		}
	});
    
    pool.query(sql, function(err, results) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        else
        {

            var sql2='select * from member where memberId='+member;
            console.log("The member ---------->"+member);

            var connectionPool = require('../database/connectionPooling');
            var pool = connectionPool.Pool();
            pool.connect();
            pool.query(sql2, function(err, results1) {

                if (err) {
                    console.log("ERROR: " + err.message);
                }
                else
                {
//                    if(results1[0].premiumMember == 'Y')
//                    {
//                    console.log("Setting the type to premium");
//                    type= "premiummember";
//                    }
//                    else 
//                    {
//                    console.log("Setting the type to simple");
//                    type="simplemember";
//                    }
                }


            });

            var totalIssue=null;
            for ( var i = 0; i < results.length; i++) {
                var cartid = results[i].cartId;
                var movieId=results[i].movieId;
                var totalPrice = results[i].price;
                var quantity = results[i].quantity;
                var issueDate = results[i].issueDate;
                var memberId=results[i].memberId;
                var now = new Date(issueDate);
                var date = [ now.getFullYear(), now.getMonth() + 1, now.getDate() ];
                for ( var m = 1; m < 3; m++) {
                    if (date[m] < 10) {
                        date[m] = "0" + date[m];
                    }
                }
                var currentDateFromed= date.join("-");
                var sql1 = 'insert into ordermovie values(null,' + movieId + ','
                + memberId + ',\'' + currentDateFromed + '\',' + quantity + ','
                + totalPrice + ',\'N\''+')';
                console.log("The sql " + sql1);
                pool.query(sql1, function(err, results) {

                    if (err) {
                        console.log("ERROR: " + err.message);
                    }
                });
                var sql1 = 'Delete from cart where cartid=' + cartid;
                console.log("Deleting the SQL is : " + sql1);
                pool.query(sql1, function(err, results) {

                    if (err) {
                        console.log("ERROR: " + err.message);
                    }

                });
            }

            /*var sql8='select * from  ordermovie O where O.memberId='+member+' and O.return =\'N\'';
            console.log("The query being formed is :"+sql8);

            var connectionPool = require('../database/connectionPooling');
            var pool = connectionPool.Pool();
            pool.query(sql8, function(err, results) {

                if (err) {
                    console.log("ERROR: " + err.message);
                }
                else
                {
                    totalIssue=results.length;
                    console.log("the total issued movies---> "+totalIssue);
                    if(results[0].premiumMember == 'Y')
                    {
                        console.log("Setting the type to premium");
                        type= "premiummember";
                    }
                    else 
                    {
                        console.log("Setting the type to simple");
                        type="simplemember";
                    }
                    var anotherSQL='Update '+type+' SET totalIssuedMovies='+ 0 +' where memberId='+member;
                    console.log("query for updating the type --------------------------->"+anotherSQL);

                    var connectionPool = require('../database/connectionPooling');
                    var pool = connectionPool.Pool();
                    pool.query(anotherSQL, function(err, results) {

                        if (err) {
                            console.log("ERROR: " + err.message);
                        }
                    });

                }
            });*/

            res.render('Thanks.html');    
        }

    });
};


exports.viewOrderHistory=function(req,res)
{
	var membertype;
	var member=req.session.memberId;
	console.log("The meneber id is :"+member);
	var sql2 = 'select * from  member where memberId='+member;
	var sql='select * from  ordermovie where memberId='+member;
	
	console.log("The query being formed is :"+sql);
	
	pool.query(sql2, function(err, results1) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			console.log("order select success");
			
			if(results1[0].premiumMember==='Y')
				membertype=true;
			else
				membertype=false;
			
		}
	});
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			
			console.log("member type" + membertype);
			res.render('OrderHistory.html',{orderHistory: results, membertype:membertype});
		
			
		}
	});
};


exports.UpgradeToPremium=function(req,res)
{
	var member=req.session.memberId;
	var membertype;
	var sql2 = 'select * from  member where memberId='+member;
	var sqlNew= 'Update member SET premiumMember=\'Y\' where memberId='+member;
	var sql7 = 'insert into premiummember values(' + member+ ',300,null,0 )';
	var sqln = 'delete from simplemember where memberId='+member; 
	console.log("The query formed is "+sqlNew);
	
	pool.query(sql2, function(err, results1) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			console.log("movie select success");
			
			if(results1[0].premiumMember==='Y')
				membertype=true;
			else
				membertype=false;
			
		}
	});
	
	pool.query(sqlNew, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			pool.query(sqln, function(err, results) {
				if (err) {
					console.log("ERROR: deletesimplemember " + err.message);
				}
				else
				{
					pool.query(sql7, function(err, results) {
						if (err) {
							console.log("ERROR: insert pre member " + err.message);
						}
					});
				}
			});
			res.render('UpgradePremium.html');
		}
	});

};
exports.UpgradePayment=function(req,res)
{
	var member=req.session.memberId;
	var membertype;
	var sql2 = 'select * from  member where memberId='+member;
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();
	pool.query(sql2, function(err, results1) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			console.log("movie select success");
			
			if(results1[0].premiumMember==='Y')
				membertype=true;
			else
				membertype=false;
			
		}
	});
	
	res.render('UpgradePay.html');
	
	
	
};

function verifyDN(req, res) {
    var datehere;
    var a = JSON.stringify(req.body);
    var obj = JSON.parse(JSON.stringify(req.body));
    var userName = obj.userName.toString();
    console.log("username " + userName);
    var password = obj.Password.toString();
    console.log(" the pwd is:" + password);
   

    var sqlVerify = 'select * from memberdn where userName="' + userName
    + '" and password= "' + password + '"';
    var str = sqlVerify.toString();
    var se = JSON.stringify(str);
    console.log("the new " + se);
    pool.query(sqlVerify,
            function(err, results) {
        if (err) {
            console.log("ERROR: " + err.message);
            var error = err.message;
            res.render('Error.html', {
                Error : error
            });
        } else if (results.length == 0) {
            console.log("came in this ");
            res.render('Sign_Reenter.html', {
                Error : "User not authenticated !!"
            });
        }
        else if (results[0].admin == "Y") {
            console.log("came into the admin module check  ");
            console.log(results);
            console.log(results[0].memberId);
            console.log(results[0].firstName);
            req.session.memberId = results[0].memberId;
            req.session.firstName = results[0].firstName;
            var member = req.session.memberId;

            var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='
                + member;
            pool.query(sql1, function(err, results1) {
                if (err) {
                    console.log("ERROR: " + err.message);
                    var error = err.message;
                    res.render('Error.html', {
                        Error : error
                    });
                } else {
                    var str = (results1[0].lastLoginDate);
                    var str1 = new Date(str.toString());
                    var date = new Date(str1);
                    console.log(" new date :" + date);
                    req.session.lastlogin = date;
                    console.log("The session variable : "
                            + req.session.lastlogin);
                }
            });
            dateHere = lastLoginDate(member);
            console.log(" date last login : ---" + dateHere);
            var time = timeStamp();
            var sql = 'insert into login values(null,' + member
            + ',"' + time + '")';
            pool.query(sql, function(err, results) {
                if (err) {
                    console.log("ERROR: " + err.message);
                    var error = err.message;
                    res.render('Error.html', {
                        Error : error
                    });
                } else {
                    console.log("date is persisted");
                }
            });
            res.redirect('/AdminHome');

        }

        else if (results[0].premiumMember == "Y" && results[0].admin == "N") {
            console.log("came into the premium member module  within verifyDN ");
            console.log(results);
            console.log(results[0].memberId);
            console.log(results[0].firstName);
            req.session.memberId = results[0].memberId;
            req.session.firstName = results[0].firstName;
            var member = req.session.memberId;

            var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='+ member;
            pool.query(sql1, function(err, results1) {
                if (err) {
                    console.log("ERROR: " + err.message);
                    var error = err.message;
                    res.render('Error.html', {
                        Error : error
                    });
                } else {
                    var str = (results1[0].lastLoginDate);
                    var str1 = new Date(str.toString());
                    var date = new Date(str1);
                    console.log(" new date :" + date);
                    req.session.lastlogin = date;
                    console.log("The session variable : "
                            + req.session.lastlogin);
                }
            });
            dateHere = lastLoginDate(member);
            console.log(" date last login : ---" + dateHere);
            var time = timeStamp();
            var sql = 'insert into login values(null,' + member
            + ',"' + time + '")';
            pool.query(sql, function(err, results) {
                if (err) {
                    console.log("ERROR: " + err.message);
                    var error = err.message;
                    res.render('Error.html', {
                        Error : error
                    });
                } else {
                    console.log("date is persisted");
                }
            });



            res.redirect('/PremiumMemberHome');

        }






        else {
            console.log(results);
            console.log(results[0].memberId);
            console.log(results[0].firstName);
            req.session.memberId = results[0].memberId;
            req.session.firstName = results[0].firstName;
            var member = req.session.memberId;

            var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='+ member;
            pool.query(sql1, function(err, results1) {
                if (err) {
                    console.log("ERROR: " + err.message);
                    var error = err.message;
                    res.render('Error.html', {
                        Error : error
                    });
                } else {
                    var str = (results1[0].lastLoginDate);
                    var str1 = new Date(str.toString());
                    var date = new Date(str1);
                    console.log(" new date :" + date);
                    req.session.lastlogin = date;
                    console.log("The session variable : "
                            + req.session.lastlogin);
                }
            });
            dateHere = lastLoginDate(member);
            console.log(" date last login : ---" + dateHere);
            var time = timeStamp();
            var sql = 'insert into login values(null,' + member
            + ',"' + time + '")';
            pool.query(sql, function(err, results) {
                if (err) {
                    console.log("ERROR: " + err.message);
                    var error = err.message;
                    res.render('Error.html', {
                        Error : error
                    });
                } else {
                    console.log("date is persisted");
                }
            });






            res.redirect('/Home');
        }
    });
}

exports.signUpDN = function(req, res) {
    console.log("Received the info for the signup  in the member Login!!");
    var obj = JSON.parse(JSON.stringify(req.body));
    console.log("Here it is ---->"+obj);
    var firstName = obj.firstName;
    var lastName = obj.lastName;
    var userName = obj.userName;
    var password = obj.password;
    var address = obj.address;
    var phone = obj.phone;
    var email = obj.email;
    //var address=obj.address;
    var city=obj.city;
    var state=obj.state;
    var zipcode=obj.zipcode;
    var preMember=obj.premiumMember;
    //var email=obj.email;
    var member=null;
    var premiumValue=null;

    if(preMember=== "on")
    {
        //console.log(pr)
        premiumValue= 'Y';
    }
    else
    {
        premiumValue= 'N';
    }
    var connectionPool = require('../database/connectionPooling');
    var pool = connectionPool.Pool();
    pool.connect();

    var sqlVerify = 'insert into memberdn values(null,"' + firstName + '","'+ lastName + '","'+address + '","'+city+'","'+state+'","'+zipcode+'","'+email+'","'+userName + '","' + password + '","'+premiumValue+'","N", '+ 0 +', NULL, '+ 0 +')';
    var str = sqlVerify.toString();
    console.log(str);
    pool.query(sqlVerify, function(err, results) {
        if (err) {
            console.log("ERROR: " + err.message);
            var error = err.message;
            res.render('Error.html', {
                Error : error
            });
        } else {
            var sql3="select * from memberdn where userName='"+userName+"'";

            console.log(sql3);
            pool.query(sql3, function(err, results) {
                if (err) {
                    console.log("ERROR: " + err.message);
                    var error = err.message;
                    res.render('Error.html', {
                        Error : error
                    });
                }
                else{
                    var memberid=results[0].memberId;
                    console.log("The menberid retrieved is -------->"+memberid);
                    var member =memberid;
                    var time = timeStamp();


                    if(results[0].premiumMember === 'Y')
                    {
                        console.log("Persising the enry for the premium member in the priemum member table ");
                        var sql7 = 'update memberdn set subscriptionFees=300 where memberId='+ memberid +'';
                        console.log(sql7);
                        pool.query(sql7, function(err, results) {
                            if (err) {
                                console.log("ERROR: " + err.message);
                                var error = err.message;
                                res.render('Error.html', {Error : error});

                            }
                        });
                    }
                    console.log(member);
                    var sql = 'insert into login values(null,' + member + ',"' + time + '")';
                    console.log(sql);

                    pool.query(sql, function(err, results) {
                        if (err) {
                            console.log("ERROR: " + err.message);
                            var error = err.message;
                            res.render('Error.html', {
                                Error : error
                            });
                        } else {
                            console.log("date is persisted");
                        }
                    });
                }
            });



            res.render('Sign.html');
        }
    });
};



exports.returnIssuedMovie=function(req,res)
{
	var membertype;
	var member=req.session.memberId;
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var movieId = json["MovieId"];
	
	console.log("The meneber id is :"+member);
	var sql2 = 'select * from  member where memberId='+member;
	var sql='select * from  ordermovie O join movie M on M.movieId=O.movieId where memberId='+member+' and returned=\'N\'';
		
	console.log("The query being formed is :"+sql);
	
	pool.query(sql2, function(err, results1) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			console.log("order select success");
			
			if(results1[0].premiumMember==='Y')
				membertype=true;
			else
				membertype=false;
			
		}
	});
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			
			console.log("member type" + membertype);
			res.render('ReturnMovies.html',{IssuedHistory: results, membertype:membertype});
		
			
		}
	});

};

exports.returnMovie=function(req,res)
{
	
	console.log("Going to approve the reuest for the issue of movie");
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var movieId = json["MovieId"];
	console.log("The movie id is --->:"+movieId);
	var member=req.session.memberId;
	var sql="Update ordermovie SET returned='Y',returnedDate=SYSDATE() where movieId="+movieId+" and memberId="+member;
	console.log(sql);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			
			var sql="select * from member where memberId="+member;
			pool.query(sql, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
				}
				else 
					{
						if(results[0].premiumMember==='Y')
							var sqlNew="Update premiummember set totalIssuedMovies= totalIssuedMovies - 1"+" WHERE memberId="+member;
						else
							var sqlNew="Update simplemember set totalIssuedMovies= totalIssuedMovies - 1"+" WHERE memberId="+member;
						pool.query(sqlNew, function(err, results) {
							if (err) {
								console.log("ERROR: " + err.message);
							}
							else 
								{
								var sqlReturn="Update movie SET availableCopies=availableCopies+1 where movieId="+movieId;
								pool.query(sqlReturn, function(err, results) {
									if (err) {
										console.log("ERROR: " + err.message);
									}
								
								});
								
								
								}
						
						});
						
						res.send("Success !!");
						
					}
				
			
		});
		
				
			
			
			
			
			
		
			
		}
	});
	
	
	//var temp={message : "Success  i am done"};
	//res.writeHead(200, {'Content-Type': 'text/html'});
//	res.write();
   // res.end();
	
	

};


exports.verifyDN=verifyDN;
exports.verify = verify;
//exports.issuemovie=issuemovie;