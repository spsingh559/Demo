var redirectPort = process.env.REDIRECT_PORT || 8001;
var redirectHost = process.env.REDIRECT_HOST || "localhost";
// var redirectPort = 8001;
// var redirectHost = '192.168.99.101';

var twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET || 'kAbzWjtRn0gS9VdIyNzL1PA6NxrYUZ6Y8MCc6eVtGJO8F02WP7'
var twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY || '0jyQWlJr83HiPcmPyHkBEzgGR'

exports = module.exports =  {
  consumerKey: twitterConsumerKey,
  consumerSecret: twitterConsumerSecret,
  callback:'http://'+redirectHost+':'+redirectPort+'/api/v1/auth/twitter/success'

}
