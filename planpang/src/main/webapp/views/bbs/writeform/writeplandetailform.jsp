<%@ page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>



<html>
	<head>
		<title>여행일정수정</title>
		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.form.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/sj.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/planwriter-plan.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/planwriter-plan-detail.js"></script>
	</head>	


	
	<body onSelectStart="return false" 
	onDragStart="return false"
	onContextMenu="return false">
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>			
		</div>
			
			
		<div id="view" class="view"><%@ include file="/views/bbs/writeform/planwriter.jsp" %></div><!-- view -->
	
	
		<script>
			var nowPlanSeq = 0;
			var nowPaperSeq = 0; /**/
			var hmDays = 0;  /**/
			
			var planM = getPlan(inputPlan1.value);
		 	var pBoxSeqList = getPBoxSeqList();
		 	var dBoxSeqList = getDBoxSeqList();
			var pBoxLimitIdx = 30;
			var dBoxLimitIdx = 30;
			var pBoxAM = [];
			var dBoxAM = [];
			
			/* get every pBox data */
			for (var i = 0; i < pBoxSeqList.length; i++) {
				addNewPBox();
			}
			/* get every dBox data */
			for (var i = 0; i < dBoxSeqList.length; i++) {
				addNewDBox();
			}
			
			/* fewDays에 dBox개체 수 맞추기*/
			adjustDBox();			
			/* Decide where place PBox */
			for (var i = 0; i < dBoxSeqList.length; i++) {
				for (var j = 0; j < pBoxAM.length; j++) {
					if (dBoxSeqList[i] == pBoxAM[j].paperSeq) {
						dBoxAM[i].appendPBox(pBoxAM[j]);
					}
				}
			}
		</script>
		
		
		
		<!-- 맨 아래 -->		
		<div id="bot" class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>
	</body>
</html>
