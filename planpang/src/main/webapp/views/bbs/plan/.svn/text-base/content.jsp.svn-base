<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<html>
	<head>
		<title>No.${atc.PLANSEQ} - ${atc.PLANTITLE}</title>
		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />				
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/sj.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/planviewer-plan.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/planviewer-plan-detail.js"></script>
		
		<!-- 게 시물 좋아요 -->
		<script type="text/javascript">
			function likeArticle(planSeq) {
				var url = '/planpang/bbs/plan/like';
				var params ='planSeq=' +planSeq;
				
				$.ajax({
					type:"post" // 포스트 방식
					,url:url // url주소
					,data:params // 요청에 전달되는 프로퍼티를 가진 객체
					,dataType:"json"
					,success:function(args){ // 응답이 성공 상태 코드를 반환하면 호출되는 함수
						if(args.chkLikeAlret==1){
							alert("좋아요를 이미 클릭 하였습니다");	
						}else if(args.chkLikeAlret==2){
							alert("로그인을 해주세요");
						}
						location.reload();
						return ;				
					}
					,error:function(e){
						alert(e.responseText);
					}
				});	
			}
		</script>
	</head>

	<body>
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>			
		</div>
		
		
		<div id="view" class="view">
			<%@ include file="/views/bbs/writeform/planwriter.jsp" %>

		</div>
			<div class="editbt">
			<c:if test="${atc.MEMSEQ == loginSeq}">
				<a href="/planpang/bbs/planwriter/?&planSeq=${atc.PLANSEQ}">
					<input class="button white" type="button" value="수정">
				</a>
				<a href="deleteact?planSeq=${atc.PLANSEQ}">
					<input class="button white" type="button" value="삭제">
				</a>
			</c:if>
			<c:if test="${loginSeq != null}">
				<button class="button white" onclick="likeArticle('${atc.PLANSEQ}')">좋아요 :${atc.LIKENUM}</button> 
			</c:if>
			</div>
		<script>
			/*viewer only*/
			deleteBox.style.display = "none";
			btnNote.style.display = "none";
			btnRemoveDbox.style.display = "none";
			btnAddDbox.style.display = "none";
			btnAddOneTime.style.display = "none";
			inputPlan81.style.display = "none";
			inputPlan83.style.display = "none";
			shareyn.style.display = "none";
			
			/*go go*/		
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

			/* Decide where place PBox */
			for (var i = 0; i < dBoxSeqList.length; i++) {
				for (var j = 0; j < pBoxAM.length; j++) {
					if (dBoxSeqList[i] == pBoxAM[j].paperSeq) {
						dBoxAM[i].appendPBox(pBoxAM[j]);
					}
				}
			}			
		</script>
		
		<div class="comment"><%@ include file="comment.jsp" %></div>
		<!-- 맨 아래 -->
		<div class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>		
	</body>
</html>
