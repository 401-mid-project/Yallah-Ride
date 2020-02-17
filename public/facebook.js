'use strict';

document.getElementById('loginbtn').addEventListener('click', loginWithFacebook, false);


window.fbAsyncInit = function() {
  FB.init({
    appId      : '275747436730310',
    cookie     : true,
    xfbml      : true,
    version    : 'v6.0',
  });
      
  FB.AppEvents.logPageView();   
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}

(document, 'script', 'facebook-jssdk'));



function loginWithFacebook(){
  FB.login (response =>{
    const { authResponse:{ accessToken, userID} } = response;
    fetch('/login-with-facebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, userID}),
    }).then(res => {
      console.log(res);
    });

    FB.api('/me', function(response){
      console.log(JSON.stringify(response));
    });

  }, { scope: 'public_profile,email'});
  return false;
}