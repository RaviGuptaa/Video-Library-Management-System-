/**
 * New node file for all the premium member related functiality
 */


exports.displayMovie=function(req,res)
{
	var membertype;
	var member=req.session.memberId;
	var sql2 = 'select * from  member where memberId='+member;
	var sql="select * from movie where availableCopies > 0";
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
	
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			console.log("member type" + membertype)
			console.log("We have the results for all the persons "+results);
			res.render('MemberMovies.html', {title : "List All Movies  !!",MovieResults : results, membertype : membertype});
		}
	  });
	

};