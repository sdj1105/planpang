<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
	.globalMenu{
		list-style: none;
	}
	.globalMenu li{
		float: right;
	}
	.globalMenu li:first-child{
		line-height: 40px;
	}
</style>
<script>
	function go(addr){
		location.href=addr;
	}
	function formSubmit(){
		document.getElementById("logoutform").submit();
	}
</script>

<!-- FACEBOOK API 연동 -->
<div id="fb-root"></div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/facebook.js" ></script>

<!-- 유저로 로그인할 때만 보이는 것들 -->
<sec:authorize access="hasRole('ROLE_USER')">
	<c:url value="/j_spring_security_logout" var="logoutUrl"/>
	
	<form action="${logoutUrl}" method="post" id="logoutform">
		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
	</form>

	<c:if test="${pageContext.request.userPrincipal.name != null}">
		${pageContext.request.userPrincipal.name} 님
		<a href="javascript:formSubmit()"><img src="/planpang/resources/img/logout.png"></a>
	</c:if>
</sec:authorize>

<!-- ADMIN으로 로그인할 때만 보이는 것들 -->
<sec:authorize access="hasRole('ROLE_ADMIN')">
	<c:url value="/j_spring_security_logout" var="logoutUrl"/>
	<form action="${logoutUrl}" method="post" id="logoutform">
		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
	</form>
	<c:if test="${pageContext.request.userPrincipal.name != null}">
			${pageContext.request.userPrincipal.name} 님 
			<a href="javascript:formSubmit()"><img src="/planpang/resources/img/logout.png"></a>
	</c:if>
</sec:authorize>


<ul class="globalMenu">
	<li>
		<!-- 페북 로그인 버튼 -->
		<c:if test="${pageContext.request.userPrincipal.name == null}">
		<c:if test="${fbName != null}">
			<!-- 페이스북 로그인시 이름 찍기 -->
			<c:if test="${isLogined == true}">
				${loginName} 님
				<!-- 페이스북 로그아웃 버튼 -->
				<a href="javascript:fbLogoutLastLevel()" style="margin-right: 5px;"><img src="/planpang/resources/img/flogout.png"></a>
			</c:if>	
		</c:if>
		</c:if>
	</li>
	
	<li>
		<!-- 로그인이 안되었을때 보이는 버튼들 -->
		<c:if test="${isLogined == false}">
			<a href="javascript:go('/planpang/login/')"><img src="/planpang/resources/img/loginBtn.png"></a>
			<a href="javascript:go('/planpang/joinform/')" style="margin-right: 5px;"><img src="/planpang/resources/img/joinBtn.png"></a>
			<a href="javascript:checkLoginState()" style="margin-right: 5px;"><img src="/planpang/resources/img/flogin.png"></a>
		</c:if>
	</li>
</ul>







