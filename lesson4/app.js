//简单网页爬虫

var express = require('express');
var superagent = require('superagent');
var eventproxy = require('eventproxy');
var cheerio = require('cheerio');
var url = require('url');

var app = express();
var cnodeUrl = 'https://cnodejs.org/';

app.get('/', function(req, res, next) {


	superagent.get(cnodeUrl)
		.end(function(err, sres) {
			if(err) {
				return console.log(err);
			}

			var $ = cheerio.load(sres.text);
			var topicUrls = [];

			$('#topic_list .topic_title').each(function(idx, element) {
				var $element = $(element);
				var href = url.resolve(cnodeUrl, $element.attr('href'));
				topicUrls.push(href);
			})
			




			
			res.send(topicUrls);
		});
		
	
});


app.listen(3000, function() {
	console.log('app is running at port 3000');
})

























