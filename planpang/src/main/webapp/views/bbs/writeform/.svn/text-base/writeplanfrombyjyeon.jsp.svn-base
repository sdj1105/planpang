<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<html>
	<head>
		<title></title>
		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />		
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<!-- Google Map API -->   
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/googlemap.js"></script>
	</head>

	<body>
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>			
		</div>
		
		
		<div class="view">
			<!-- google 맵 연동 TEST 중 --> 
			<div>
				구글 맵 연동 TEST 중 <br />
				<div>   
				    <div id="GoogleMap_map" style="width:500px; height:500px; float:left;">   
				    </div>   
				    <div style="height:500px; padding-left: 10px;">   
				        <div>   
				            <input id="GoogleMap_input" type="text" value=""
				            	   onkeydown="javascript:if(event.keyCode == 13 || ENTER) GoogleMap.codeAddress();" >   
				            <input type="button" value="Enter" onclick="javascript: GoogleMap.codeAddress();">   
				        </div>   
				        <div id="GoogleMap_addr"></div>
				        <div id="GoogleMap_saveAddr">선택된 여행지들 </div>
				    </div>  
				</div>  
			</div>
		
		</div>
		
		
		<div class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>		
	</body>
</html>
