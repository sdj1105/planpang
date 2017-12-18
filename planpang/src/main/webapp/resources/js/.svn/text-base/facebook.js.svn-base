var accessToken;

function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response.status);
	
	if (response.status === 'connected') {
		accessToken  = response.authResponse.accessToken;
		console.log('accessToken : '+accessToken);
		// 페이스북을 통해서 로그인이 되어있다.
		
		testAPI();
	} else if (response.status === 'not_authorized') {
		// 페이스북에는 로그인 했으나, 앱에는 로그인이 되어있지 않다.
	} else {
		// 페이스북에 로그인이 되어있지 않다. 따라서, 앱에 로그인이 되어있는지 여부가 불확실하다.
		 FB.login(function (response) {
			 accessToken  = response.authResponse.accessToken;
				console.log('accessToken : '+accessToken);
				// 페이스북을 통해서 로그인이 되어있다.
				testAPI();
		 });
	}
	
}

function fbLogoutLastLevel(){
	location.href="/planpang/logout";
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {	
	FB.init({
		appId      : '339092879612966',
		cookie     : true,  // 쿠키가 세션을 참조할 수 있도록 허용
		session	   : true,
		xfbml      : true,  // 소셜 플러그인이 있으면 처리
		version    : 'v2.0'
	});
//	FB.getLoginStatus(function(response) {
//		statusChangeCallback(response);
//	});
};

//SDK를 비동기적으로 호출
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/ko_KR/all.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
	FB.api('/me', function(response) {
		var memPhoto = 'http://graph.facebook.com/' + response.id + '/picture';
		var fbName = encodeURI(encodeURIComponent(response.name)); 
		var memberId = response.id;
		var sex = response.gender;
		var nickNm = response.birthday;
		console.log('testAPI accessToken : '+accessToken
					+'\n name : '+fbName
					+'\n id : '+memberId
					+'\n gender : '+sex
					+'\n image :'+memPhoto
					+'\n birthday : '+nickNm
					+'\n auth : '+response.status);
		location.href='/planpang/main?accessToken='+accessToken+
						'&fbName='+fbName+'&memberId='+memberId;
	});
}

// 페이스북 계정으로 회원 가입
function facebookRegist() {
    // 페이스북 로그인 상태 체크
    FB.getLoginStatus(function (response) {
        if (response.status == "connected") {
        	accessToken  = response.authResponse.accessToken;
            // 페이스북 로그인 YES! and 앱 허가 YES!
            handleFacebookRegist(response);
        } else if (response.status == "not_authorized") {
            // 페이스북 로그인 YES! but 앱 허가 NO!
            FB.login(function (response) {
                handleFacebookRegist(response);
            });
        } else {    // 페이스북 로그아웃 상태.
            FB.login(function (response) {
	            handleFacebookRegist(response);
	        });
        }
        
    });
}


//회원가입 핸들러
function handleFacebookRegist(response) {
    FB.api('/me', function(response) {
		var memPhoto = 'http://graph.facebook.com/' + response.id + '/picture';
		var memNm = response.name;
		var memberId = response.id;
		var sex = response.gender;
		var nickNm = response.birthday;
		
		console.log('handleFacebookRegist name : '+memNm
					+'\n id : '+memberId
					+'\n gender : '+sex
					+'\n image :'+memPhoto
					+'\n birthday : '+nickNm);
		
		if(memNm == 'undefined' || memNm == null){
			alert('FaceBook에 로그인해주세요!!');
			return;
		}else{
			var url = "/planpang/fblogin";		
			var params = "memNm="+memNm
						+"&memberId="+memberId
						+"&passwd="+memberId
						+"&sex="+sex
						+"&memPhoto="+memPhoto 
						+"&nickNm="+nickNm
						+"&dumi=" +new Date();
			$.ajax({
				type:"POST" 
					,url:url 
					,data:params 
					,dataType:"json"
					,success:function(data){
						//session.setAttribute("isLogined", true);
						location.href="/planpang/login/";
						return;
					}
				,error:function(e){
					alert('handleFacebookRegist error!!!!!!!!!!!');
					//alert(e.responseText);
				}
			});
		}
    });
		
}