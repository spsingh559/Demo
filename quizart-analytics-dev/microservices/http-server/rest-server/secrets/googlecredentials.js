
var redirectHost = process.env.REDIRECT_HOST || "localhost";
var redirectPort = process.env.REDIRECT_PORT || "8001";

var googleclient_id = process.env.GOOGLE_CLIENT_ID || 'client_ID'
var googleclient_secret = process.env.GOOGLE_CLIENT_SECRET || 'client_secret'

module.exports = {
	OAUTHURL    :   'https://accounts.google.com/o/oauth2/auth?',
	VALIDURL    :   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=',
	SCOPE       :  [
						'https://www.googleapis.com/auth/userinfo.profile',
						'https://www.googleapis.com/auth/userinfo.email'
				   ],
	CLIENT_ID   :  googleclient_id,
	CLIENT_SECRET :  googleclient_secret,
	REDIRECT_URL   : 'http://'+redirectHost+':'+redirectPort+'/api/auth/success/google',
	TYPE        :   'token'
};
