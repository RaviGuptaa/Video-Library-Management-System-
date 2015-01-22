/**
 * New node file for establishing and making database request for all books
 * related requests
 */
var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();


exports.retrieveSimpleMembers= function(req,res)
{
	var sql="select * from member where premiumMember='N' and admin='N'";
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			console.log("We have the results "+results);
			res.render('MemberList.html', {title : "Member Operations  !!",MemberResults : results});
		}
	  });
	

};


exports.removeSimpleMember=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["RemoveId"];
	console.log("the value  of id :" + b);
	
	var sql = 'delete from member where memberId=' + parseInt(b);
	console.log(a);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully removed the simple member !!");
		console.log("Return value of id " + parseInt(b));
		res.send(parseInt(b));

	});
};


exports.retrievePremiumMembers= function(req,res)
{
	var sql="select * from member where premiumMember='Y' and admin='N'";
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			console.log("We have the results "+results);
			res.render('PremiumMemberList.html', {title : "Premium Member Operations  !!",MemberResults : results});
		}
	  });
	

};


exports.removePremiumMember=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["RemoveId"];
	console.log("the value  of id :" + b);
	
	var sql = 'delete from member where memberId=' + parseInt(b);
	console.log(a);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully removed the premium member !!");
		console.log("Return value of id " + parseInt(b));
		res.send(parseInt(b));

	});
};


exports.adminDisplayPersons=function(req,res)
{
	var sql="select m.memberId,m.firstName,m.lastName,m.address,m.city,m.state,m.zipcode,m.email,p.totalIssuedMovies from member m Join premiummember p on m.memberId=p.memberId  where m.admin='N' Union All select m.memberId,m.firstName,m.lastName,m.address,m.city,m.state,m.zipcode,m.email,s.totalIssuedMovies from member m Join simplemember s on m.memberId=s.memberId  where m.admin='N'";
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			console.log("We have the results for all the persons "+results);
			res.render('ListPerson.html', {title : "List All Persons  !!",MemberResults : results});
		}
	  });
	

};


exports.adminSearchPersons=function(req,res)
{
	var sql="select * from member";
	
	
		console.log("about to search ");
		var a = JSON.stringify(req.body);
		var json = JSON.parse(a);
		var first = json["firstName"];
		var last= json["lastName"];
		console.log(" the first name is "+first);
		console.log(" the last name is "+last);
	
	
	if(first!= ""){
		sql += (" where firstName Like "+"'%"+first+"%'");
		}
		if(last!="") {
			sql += (" and lastName Like"+"'%"+last+"%'");
		}
		console.log("the query formed is-->"+sql);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			console.log("We have the results for all the persons "+results);
			res.render('ListPerson.html', {title : "List All Persons  !!",MemberResults : results});
		}
	  });
	

};


exports.addNewMovie=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var movieName = json["movieName"];
	var movieBanner = json["movieBanner"];
	var releaseDate = json["releaseDate"];
	var rentAmount = json["rentAmount"];
	var avilableCopies = json["avilableCopies"];
	var category = json["category"];
	var sqlVerify = 'select * from movie where movieName="' + movieName + '" ';
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
			res.render('MakeNewMovie_reneter.html', {
				Error : "Movie already exists !!"
			});
		}
		else
			{
	var sql="insert into movie values(null,'"+movieName+"','"+movieBanner+"','"+releaseDate+"',"+rentAmount+","+avilableCopies+",'"+category+"')";
	console.log("Inserting into movies values --->"+sql);
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			res.render('MakeNewMovie.html', {title : "Create New Movie  !!",message : "Successfully created a new movie"});
		}
	  });
	
			}
	});
};


exports.getAllMovie=function(req,res)
{
	var sql="select * from movie wh";
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			console.log("We have the results for all the persons "+results);
			res.render('AdminAllMovies.html', {title : "List All Movies  !!",MovieResults : results});
		}
	  });
	

};

exports.getAllIssuedmovies=function(req,res)
{
	
	var sql = "select movie.*, mem.memberId as memid, mem.lastName as melastname, mem.firstName as memfirstname from movie, ordermovie, member as mem where (movie.movieId = ordermovie.movieId) and(mem.memberId = ordermovie.memberID)";
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			console.log("We have the results for all the Issued Movies "+results);
			//console.log("results memid "+ results[7].memid);
			
			res.render('AdminIssuedMovies.html', {title : "List All Issued Movies  !!",MovieResults : results});
		}
	  });
	

};

/*exports.cartDeleteMovie=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["RemoveId"];
	console.log("the value  of id :" + b);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();
	var sql = 'delete from cart where movieId=' + parseInt(b);
	console.log(a);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully removed the movie !!");
		console.log("Return value of id " + parseInt(b));
		res.send(parseInt(b));

	});
};*/


exports.adminDeleteMovie=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["RemoveId"];
	console.log("the value  of id :" + b);
	
	var sql = 'delete from movie where movieId=' + parseInt(b);
	console.log(a);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully removed the movie !!");
		console.log("Return value of id " + parseInt(b));
		//res.send("Returning the value "+parseInt(b));
		var temp={message : "Success  i am done"};
		res.writeHead(200, {'Content-Type': 'text/html'});
		//res.write(JSON.stringify(temp));
        res.end();
       // res.status(200);

	});
};

exports.adminupdateMovie=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["row_id"];
	var col=json["column"];
	var columnName;
	if(parseInt(col)==0)
		{
		columnName="movieId";
		}
	else if(parseInt(col)==1)
		{
		columnName="movieName";
		}
	else if(parseInt(col)==2)
		{
		columnName="movieBanner";
		}
	else if(parseInt(col)==3)
	{
	columnName="releaseDate";
	}
	else if(parseInt(col)==4)
	{
	columnName="rentAmount";
	}
	else if(parseInt(col)==5)
	{
	columnName="availableCopies";
	}
	else
	{
	columnName="category";
	}
	var value=json["value"];
	console.log("the value  of id :" + b);
	
	var sql = 'update movie set ' +columnName+'="'+value  +'" where movieId=' + parseInt(b);
	console.log("The query is--->"+ sql);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully updated  the movie !!");
		res.send(value);

	});
};



exports.retrieveMovieToMember=function(req,res)
{ 
	
	var obj = JSON.parse(JSON.stringify(req.body));
	console.log("Here it is ---->"+obj);
	var memberId = obj.memberId;
	//req.session.adminissue
	var sql = 'select * from cart where memberId='+memberId;
//	var sql = 'update movie set ' +columnName+'="'+value  +'" where movieId=' + parseInt(b);
//	console.log("The query is--->"+ sql);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully updated  the movie !!");
		res.render('IssueMovieToMember.html',{memberResults : results});

	});


};


exports.aproveTheRequest=function(req,res)
{
	
	console.log("Going to approve the reuest for the issue of movie");
	
	/*var obj = JSON.parse(JSON.stringify(req.body));
	
	
	console.log("Here it is ---->"+obj);
	var member = obj.memberId;
	console.log("------->"+member);*/
	
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var member = json["MovieId"];
	var movieId=json["memberId"];
	//var member= json["memberId"];
	console.log("------->"+member+ movieId);
	var cartId=null;
	var sql="select * from cart where memberId="+member+" and movieId="+ movieId;
	console.log(sql);
	 pool.query(sql, function(err, results){
	        if(err)
	        {
	            console.log("Error: "+ err.message);
	        }
	        else
	        	{
	        	movieId=results[0].movieId;
	        	cartId=results[0].cartId;
	        	
	        	
	        	//code 
	        	
	        	
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
	     	                    //Error=new Error();
	     	                    console.log("came in this ");


	     	                    console.log("Cant issue more movies!");
	     	                    res.render('Error.html', {
	     	                        Error : 'No More Issues! Sorry!'
	     	                    });

	     	                }
	     	                else if(results1.length>0)
	     	                {
	     	                    var sqlQuery='Insert into ordermovie values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'),\'N\',null)';
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
	     	                                else
	     	                                	{
	     	                                	
	     	                                	var sql123 = 'Delete from cart where cartid=' + cartId;
	     	                                   console.log("Deleting the SQL is : " + sql123);
	     	                                   pool.query(sql123, function(err, results) {

	     	                                       if (err) {
	     	                                           console.log("ERROR: " + err.message);
	     	                                       }

	     	                                   });
	     	                                	
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

	     	            var sqlQuery='Insert into ordermovie values(null,'+ movieId +','+ member + ',SYSDATE(), 1, (select rentAmount from movie where movieId='+ movieId +'),\'N\',null)';
	     	            updateCopies(movieId);
	     	            console.log(sqlQuery);
	     	            pool.query(sqlQuery, function(err, results) {
	     	                if (err) {
	     	                    console.log("ERROR: " + err.message);
	     	                }
	     	                else{

	     	                    var sql4='UPDATE premiummember SET totalIssuedMovies= totalIssuedMovies + ' + 1 +' WHERE memberId= '+member;

	     	                    console.log(sql4);
	     	                    pool.query(sql4, function(err, results){
	     	                        if(err)
	     	                        {
	     	                            console.log("Error: "+ err.message);
	     	                        }
	     	                        else
	     	                        	{
	     	                        	
	     	                        	var sql1234 = 'Delete from cart where cartid=' + cartId;
  	                                   console.log("Deleting the SQL is : " + sql1234);
  	                                   pool.query(sql1234, function(err, results) {

  	                                       if (err) {
  	                                           console.log("ERROR: " + err.message);
  	                                       }

  	                                   });
	     	                        	
	     	                        	
	     	                        	}
	     	                    });

	     	                }

	     	            });



	     	        }
	     	    });
	        	}
	 });
	
	
	
	// code for issue
	 res.writeHead(200, {'Content-Type': 'text/html'});
//		res.write();
	    res.end();

};


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
	});
}