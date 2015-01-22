/**
 * New node file
 */
/**
 * New node file
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var winston = require('winston');

function issueMovie() {
	return Math.floor(Math.random() * 9) + 100;
}
describe('Routing', function() {
	var url = 'http://localhost:3005';
	before(function(done) {

		done();
	});

	for(i=0;i<100;i++)
	{
		describe('Validate', function() {
			it('should pass into the table', function(done) {

				var profile={issueId: '4',
						memberId: '100000004'};
				request(url)
				.post('/IssueMovie')
				.send(profile)
				//.send(num)
//				end handles the response
				.end(function(err, res) {
					if (err) {
						throw err;
					}
//					this is should.js syntax, very clear
					res.should.have.status(200);
					done();
				});
			});
		});
	}

	
	
});