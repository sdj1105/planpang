<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<html>
	<head>
		<title></title>
		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />		
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	</head>

	<body>
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>			
		</div>
		
		<div class="view" style="float: left;">
			<div style="float: left; padding: 30px;">
				<img alt="" src="/planpang/resources/img/error403.png">
			</div>
			<div style="float: left; padding: 30px;">
				<h1>HTTP Status 403 - Access is denied</h1>
				<c:choose>
					<c:when test="${empty loginId}">
						<h2>You do not have permission to access this page!</h2>
					</c:when>
					<c:otherwise>
						<h2>Member : ${loginId} <br />
							You do not have permission to access this page!</h2>			
					</c:otherwise>
				</c:choose>
			</div>
		</div>
		
		<div class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>		
	</body>
</html>
