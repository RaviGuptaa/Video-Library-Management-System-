/**
 * New node file for implementing the connection pooling
 */

var pool;
var last;
function initializepool()
{
    var num_conns =20;
    var mysql =  require('mysql');
    console.log(" Making the pool !! ------------------------------------------>>");
    pool = [];
    for(var i=0; i < num_conns; ++i){
  
    var connection =  mysql.createConnection({
    	host : 'localhost',
		user : 'root',
		password : 'preethi',
		port : '3306',
		database : 'videolibrary'
      });
    //connection.connect();
    pool.push(connection);
   
    }
    last = 0;

}
initializepool();
function Pool()
{
   
   
        var cli = pool[last];
        last++;
        if (last == pool.length) // cyclic increment
           last = 0;
        return cli;
 
   
    
   
}
exports.Pool=Pool;


