<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />
		<style>
			.el {width:500px; height:100px;}
		</style>
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="${pageContext.request.contextPath}/resources/js/jquery.form.js"></script>
		<script type="text/javascript">
			$('#joinForm').ajaxForm({
				dataType : 'text',
				beforeSerialize : function(){
				},
				beforeSubmit : function(){
				},
				success : function(data){
					//컨트롤러 실행 후 성공시 넘어옴
					alert("등록완료 ! ");
					/* location.href="/planpang/login/"; */
				}
			});
		</script>	
	
		<script type="text/javascript">
			function go(addr){
				location.href=addr;
			}
		</script>
		
		<script>
			// 아이디 중복 버튼 클릭횟수
			var count = 0;
			
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
				vdDiv.style.display = 'inline'; 
				vdDiv.style.color = 'red';
			}
			
			function validation(obj) {				
				isEmpty(obj);
			}
			
			// 입력칸이 비었는지 확인
			function isEmpty(obj) {				
				if (obj.value == '' || obj.value == null) {					
					printAlertMsg(obj, obj.placeholder + '값을 입력하세요');
					count = 0;
					return true;
				}else{
					printAlertMsg(obj, '');					
					return false;
				}
			}
		
			// ID 중복 체크
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
								alert("회원가입이 가능한 아이디입니다.");
								count++;
								return;	
							}else{
								alert("이미 존재하는 아이디입니다.");
								memberId.value = '';
								memberId.focus();
								count++;
							}
						},
						error:function(e) {
							alert('ID check error!!!!!');
							alert(e.responseText);
						}
					});
				}
			}
			
			// 패스워드 확인
			function chkPassword(chkPasswd){
				var passwd = document.getElementById("passwd");
				if(isEmpty(passwd) == false){
					if(passwd.value != chkPasswd.value){
						printAlertMsg(chkPasswd, '패스워드 값이 다릅니다.');
						chkPasswd.value='';
					}else{
						printAlertMsg(chkPasswd, '패스워드 값이 일치합니다.');
					}
				}else{
				}
			}
			
			// 셀렉트박스 직접 입력
			function setAddr(obj){
				var memAddr = document.getElementById("memAddr");
				if(obj.value == 'etc'){
					memAddr.style.display = "inline";
					memAddr.readOnly = false;
					memAddr.value = "";
				}else{
					memAddr.value = obj.value;
				}
			}
			
			// 폼 전송 전 확인
			function formCheck(){
				var memberId = document.getElementById("memberId");
				var passwd = document.getElementById("passwd");
				var chkPasswd = document.getElementById("chkPasswd");
				var memNm = document.getElementById("memNm");
				var nickNm = document.getElementById("nickNm");
				
				if(isEmpty(memberId) == true){
					 memberId.focus();
					 return false;
				}else if(count == 0){
					printAlertMsg(memberId,'ID 중복체크를 해주세요');
					return false;
				}else if(isEmpty(passwd) == true){
					 passwd.focus();
					 return false;
				}else if(isEmpty(chkPasswd) == true){
					chkPasswd.focus();
					return false;
				}else if(isEmpty(memNm) == true){
					memNm.focus();
					return false;
				}else if(isEmpty(nickNm) == true){
					nickNm.focus();
					return false;
				}else if(isEmpty(nickNm) == true){
					nickNm.focus();
					return false;
				}else{
					count = 0;
				}
			}
		</script>
	</head>
	
	<body>
		<!-- FACEBOOK 로그인으로 가입하기  -->
		<div id="fb-root"></div>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/facebook.js"></script>
	
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>						
		</div>
		
		<!-- 회원가입 폼 시작 -->
		<div class="view" style="text-align: center;">
			<div class="inBox" style="width: 557px; margin: 0 auto; text-align: left; border: 1px solid #dbdbdb; padding: 20px;">
				
				<form action="/planpang/join/" method="post" id="joinForm" 
						onsubmit="return formCheck()" enctype = "multipart/form-data">
					<div><button onclick="javascript:facebookRegist()"  class="button blue rounded">facebook으로 회원가입</button></div>
					<div class="el">
						<input type="text" class="123" name="memberId" id="memberId" 
							placeholder="아이디" onblur="validation(this)"/>
					</div>
					<div>
						<button type="button" onclick="chkId()" class="button blue rounded">ID중복확인</button>
					</div>
					
					<div class="el">
						<input type="password" name="passwd" id="passwd" 
							placeholder="비밀번호" onblur="validation(this)"/>
					</div>
					
					<div class="el">
						<input type="password" name="chkPasswd" id="chkPasswd" 
							placeholder="비밀번호확인" onblur="chkPassword(this)"/>
					</div>
					
					<div class="el">
						<input type="text" name="memNm" id="memNm" 
							placeholder="이름" onblur="validation(this)"/>
					</div>
					
					<div class="el">
						<input type="radio" name="sex" id="sex" value="male" checked="checked"/>남자
						<input type="radio" name="sex" id="sex" value="female" />여자 
					</div>
					
					<div class="el">거주지역:
						<select name="memAddrSel" id="memAddrSel" onchange="setAddr(this)">
							<option value="서울">서울</option>
							<option value="인천">인천</option>
							<option value="부산">부산</option>
							<option value="광주">광주</option>
							<option value="대전">대전</option>
							<option value="대구">대구</option>
							<option value="울산">울산</option>
							<option value="etc">직접입력</option>
						</select>	
						<input type="text" name="memAddr" id="memAddr" value="서울"
							placeholder="지역입력" style="display:none;" onblur="validation(this)"/>
					</div>
					
					<div class="el">
						<input type="text" name="nickNm" id="nickNm" 
							placeholder="닉네임" onblur="validation(this)"/>
					</div>
					
					<div class="el">
						프로필사진: <input type="file" name="memPhoto" id="memPhoto" 
							placeholder="프로필사진"/>
					</div>
					
					<div class="el">
						<input style="width:50px;" type="text" name="tel01" value="010" readonly="readonly"/>-
						<input style="width:70px;" type="text" name="tel02" id="tel02" placeholder="중간번호" onblur="validation(this)"/>-
						<input style="width:70px;" type="text" name="tel03" id="tel03" placeholder="끝번호" onblur="validation(this)"/>
					</div>
					<div>
						<input type="submit" value="가입하기"  class="button blue rounded"/>
					</div>
				</form>
			</div>
		</div>
		
		
		<div class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>		
	</body>
</html>