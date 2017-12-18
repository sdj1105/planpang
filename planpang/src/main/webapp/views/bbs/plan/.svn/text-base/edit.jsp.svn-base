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
			
		<div class="view">
			<form action="planupdate" method="post" name="form0">
			<input type="hidden" value="${planSeq}" name="planSeq" >
			<div class="insertplan">
			
				<div>아이디 : ${memSeq} </div>
				<!-- 사진 -->
				<div>사진:<input type="file" name="planPhoto" value="사진"></div>
				<!-- 여행 기간(날짜)  -->
				<div>여행기간:<input type="text" name="planPeriod"></div>
				<!-- 여행제목 -->
				<div>여행제목:<input type="text" name="planTitle"></div>	
				<!-- 예상 경비 -->
				예상경비
				<div><input type="text" name="planCost"></div>
				<!-- 도착지역 -->
				<div><input type="text" name="planArea"></div>
				<!-- 메모 -->
				메모
				<div><textarea cols="10" rows="5" name="memo"></textarea></div>	
				<!--  몇일간 여행 -->
				몇일간 여행
				<div><input type="text" name="fewDays"></div>
				<!--공유 YN  -->
				<div>공유 하시겠습니까?
				<input type="radio" value="Y" name="shareYn" checked="checked">예
				<input type="radio" value="N" name="shareYn">아니요
				</div>							
			</div>
			<div>
				<input type="submit" value="등록">
				<input type="reset" value="취소">
			 </div>	
		</form>	
<hr>
<hr><br>


	<div class="updateAtcDetail">
	<c:forEach var="planPaper" items="${oneList}">
		<form action="updateatc" method="post" name="form1">
			<input type="hidden" value="${planPaper.PLANSEQ}" name="planSeq">
		  	<input type ="hidden" value="${planPaper.PAPERSEQ}" name="paperSeq"> 
		   	<input type="hidden" value="${planPaper.TIMESEQ}" name="timeSeq">   
		          게시판 번호:<div>${planPaper.PLANSEQ}</div>
		          게시판 페이지 번호   <div>${planPaper.PAPERSEQ}</div>
		             여행 일차:<div><input type="text" name ="dayNum" value="${planPaper.DAYNUM}"></div>
		             여행시간 :<div><input type="text" name ="paperTime" value="${planPaper.PAPERTIMESTARE}"></div>
		 	   여행 기간:<div><input type="text" name ="paperInside" value="${planPaper.PAPERINSIDE}"></div>
		              여행경비:<div><input type="text" name ="paperCost" value="${planPaper.PAPERCOST}"></div>
		                    메모:<div><input type="text" name ="paperMemo" value="${planPaper.paperMemo}"></div>
			 <input type="submit" value="등록"><input type="reset" value="취소">	
		 </form>
    </c:forEach>
	</div>

			
		</div>
		<div class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>		
	</body>
</html>
