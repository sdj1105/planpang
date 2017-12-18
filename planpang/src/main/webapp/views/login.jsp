<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<html>
	<head>
		<title>Login</title>
		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />		
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script type="text/javascript">
			// 폼 보내기
			function loginFormSubmit(){
				document.loginform.submit();
			}
			
			/*경고 메세지 출력*/
			function printAlertMsg(obj, msg){				
				var vdDiv;
				var lastChild = obj.parentNode.childElementCount;
				if (obj.parentNode.children[lastChild-1].tagName != 'DIV'){
						vdDiv= document.createElement('div');
					obj.parentNode.appendChild(vdDiv);
				}else{
					vdDiv = obj.parentNode.children[lastChild-1];	
				}			
				vdDiv.innerHTML = msg;
			}
			
			// 입력칸이 비었는지 확인
			function isEmpty(obj) {				
				if (obj.value == '' || obj.value == null) {					
					printAlertMsg(obj, obj.placeholder + '값을 입력하세요');
					return true;
				}else{
					printAlertMsg(obj, '');					
					return false;
				}
			}
			
			// ID 존재 여부 체크
			function chkId() {
				var memberId = document.getElementById("memberId");
				if(isEmpty(memberId) == false){
					var url = "/planpang/chkid";
					var params = "memberId=" + memberId.value + "&dumi=" + new Date();
					$.ajax({
						type:"POST",
						url:url,
						data:params,
						dataType:"json",
						success:function(data) {
							if(data.chkCount==0){		
								printAlertMsg(memberId, '아이디 또는 비밀번호를 다시 확인하세요.');
							}else{
								loginFormSubmit();
							}
						},
						error:function(e) {
							alert('ID check error!!!!!');
							alert(e.responseText);
						}
					});
				}
			}
			// ID, PW 유효성 체크 
			function formCheck(){
				var memberId = document.getElementById("memberId");
				var passwd =  document.getElementById("passwd"); 
				
				if(isEmpty(memberId) == true){
					memberId.focus();
					return false;
				}else if(isEmpty(passwd) == true){
					printAlertMsg(passwd, '패스워드를 입력하세요');
					passwd.focus();
					return false;
				}else{
					chkId();
				}
			}
		</script>
	</head>

	<body>
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>			
		</div>
		
		<!-- 로그인 폼 시작  -->
		<div class="view" style="text-align: center; height: 485px;">
			<div style="margin-top:148px; ">
				<form name="loginform" id="loginform" action="<c:url value='/j_spring_security_check'/>" method="post">
					<div style="line-height: 30px;">아 이  디: <input type="text" id="memberId" name="memberId" placeholder="아이디"/></div>
					<div style="line-height: 30px;">비밀번호: <input type="password" id="passwd" name="passwd" placeholder="비밀번호" onkeydown="if(event.keyCode == 13 || ENTER) formCheck()"/></div>
					<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
				</form>
				<div>
					<a href="javascript:formCheck()"><img src="/planpang/resources/img/loginBtn.png"></a>
					<a href="javascript:go('/planpang/joinform/')"><img src="/planpang/resources/img/joinBtn.png"></a>
				</div>
			</div>
		</div>
		
		<div class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>		
	</body>
</html>
