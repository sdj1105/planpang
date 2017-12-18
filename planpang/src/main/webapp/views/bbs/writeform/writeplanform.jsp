<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>



<link rel="stylesheet" href="/planpang/resources/css/planpang-bbs-writeplanform.css" />



<form name="form1" action="/planpang/bbs/plan/insertatc" method="post" enctype="multipart/form-data">
	
	<input type="hidden" name="nowPgN" value="${(ph.nowPgPgN * ph.hmPgN) +1}" />
	<input type="hidden" name="searchWord" value="${ph.searchWord}" />
	
	<h1>일정 작성</h1>
	<input id="inputPlan1" name="planTitle" type="text" placeholder="여행 제목"/>
	<br/><br/>
	
	<input id="inputPlan2" name="planPeriod" type="date" placeholder="여행 시작일"/>
	부터  
	<br/><br/>
	
	<input id="inputPlan3" name="fewDays" type="text" maxlength="2"/>
	일간
	<br/><br/>
	
	<input id="inputPlan4" name="planArea" type="text" placeholder="여행지"/>
	<br/><br/>
	
	<select id="inputPlan5" name="shareyn" >
		<option value="Y" selected>공개</option>		
		<option value="N">비공개</option>		
	</select> 
	<br/><br/>
	
	<textarea id="inputPlan6" name="memo" placeholder="메모"></textarea>
	<br/><br/>
	
	<input id="inputPlan7" name="planPhoto" type="file" placeholder="사진"/>				
	<br/><br/>
	
	<button class="button white" id="PlanButton">일정 작성</button>
	
</form>
