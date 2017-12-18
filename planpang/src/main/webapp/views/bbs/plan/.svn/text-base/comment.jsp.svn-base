<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>



<script>	
 /*input type="text" 의 댓글 수정 가능 하게 하기위한 함수 (readOnly=false)  */
	function goEdit(cmtId){
		var tempCmt = document.getElementById(cmtId);
		tempCmt.readOnly=false;
		tempCmt.style.border="1px solid";
	}
/*input type="text" 의 댓글수정후 보기만 가능 하게 한 함수 (readOnly=true)  */
	function goCmt(cmtId, planSeq, commentSeq){		
		var tempCmt = document.getElementById(cmtId);	
		tempCmt.readOnly=true;
		tempCmt.style.border="0px solid";
		
		var url = '/planpang/bbs/plan/commentupdate';
		var params ='planSeq=' +planSeq+
					'&commentSeq=' +commentSeq+
					'&commentMemo=' +tempCmt.value;
		
		$.ajax({
			type:"post" // 포스트 방식
			,url:url // url주소
			,data:params // 요청에 전달되는 프로퍼티를 가진 객체
			,dataType:"json"
			,success:function(args){ // 응답이 성공 상태 코드를 반환하면 호출되는 함수
				return;				
			}
			,error:function(e){
				alert(e.responseText);
			}
		});		
	}
	
	/* 댓글 등록 함수  */
	function addcom(comMemo, planSeq){		
		var memo = document.getElementById(comMemo);	
		
		var url = '/planpang/bbs/plan/commentinsert';
		var params ='planSeq=' +planSeq+
					'&commentMemo=' +memo.value;
		
		$.ajax({
			type:"post" // 포스트 방식
			,url:url // url주소
			,data:params // 요청에 전달되는 프로퍼티를 가진 객체
			,dataType:"json"
			,success:function(args){ // 응답이 성공 상태 코드를 반환하면 호출되는 함수
				location.reload();
				return ;				
			}
			,error:function(e){
				alert(e.responseText);
			}
		});	
	}	
	
	/* 댓글 삭제 함수  */
	function delcom(planSeq, commentSeq){		
		
		var url = '/planpang/bbs/plan/commentdelete';
		var params ='planSeq=' +planSeq+
					'&commentSeq=' +commentSeq;
		
		$.ajax({
			type:"post" // 포스트 방식
			,url:url // url주소
			,data:params // 요청에 전달되는 프로퍼티를 가진 객체
			,dataType:"json"
			,success:function(args){ // 응답이 성공 상태 코드를 반환하면 호출되는 함수
				location.reload();
				return ;				
			}
			,error:function(e){
				alert(e.responseText);
			}
		});	
	}	
	
	/* 댓글 좋아요 등록 함수  */
	function cmtLike(planSeq,commentSeq,login) {
		var url = '/planpang/bbs/plan/commentlike';
		var params ='planSeq=' +planSeq+
					'&commentSeq=' +commentSeq+
					'&login=' +login;
					
		$.ajax({
			type:"post" // 포스트 방식
			,url:url // url주소
			,data:params // 요청에 전달되는 프로퍼티를 가진 객체
			,dataType:"json"
			,success:function(args){ 
				// 응답이 성공 상태 코드를 반환하면 호출되는 함수
				if(args.chkLikeCmt==1){
					alert("좋아요를 이미 클릭 하였습니다");	
				}
				location.reload();
				return;				
			}
			,error:function(e){
				alert(e.responseText);
			}
		});		
	}	
	
	
</script>

<!--  ////////////////////RECOMMENT//////////////////  -->
<script type="text/javascript">
/* input type="text"의 댓글의댓글 수정 가능 하게 하기위한 함수 (readOnly=false)*/
	function goCmtEdit(cmtcmtId){
		var tempCmtCmt = document.getElementById(cmtcmtId);
		tempCmtCmt.readOnly=false;
		tempCmtCmt.style.border="1px solid";		
	}
/*input type="text"의 댓글 의댓글 수정 후 읽기만 가능  (readOnly=true)  */
	function upCmtCmt(cmtcmtId,planSeq,reCommentSeq,commentSeq){		
		var tempCmtCmt = document.getElementById(cmtcmtId);	
		tempCmtCmt.readOnly=true;
		tempCmtCmt.style.border="0px solid";
		
		var url = '/planpang/bbs/plan/cmtcmtupdate';
		var params ='planSeq=' +planSeq+
					'&commentSeq=' +commentSeq+
					'&reCommentSeq=' +reCommentSeq+
					'&commentMemo=' +tempCmtCmt.value;
		
		$.ajax({
			type:"post" // 포스트 방식
			,url:url // url주소
			,data:params // 요청에 전달되는 프로퍼티를 가진 객체
			,dataType:"json"
			,success:function(args){ 
				// 응답이 성공 상태 코드를 반환하면 호출되는 함수
				location.reload();
				return;				
			}
			,error:function(e){
				alert(e.responseText);
			}
		});		
	}

/*  댓글의 댓글 등록*/
	function addCmtCmt(reComMemo, planSeq,commentSeq){		
		var memo = document.getElementById(reComMemo);	
		
		var url = '/planpang/bbs/plan/cmtcmtinsert';
		var params ='planSeq=' +planSeq+
					'&commentSeq=' +commentSeq+
					'&commentMemo=' +memo.value;
		
		$.ajax({
			type:"post" // 포스트 방식
			,url:url // url주소
			,data:params // 요청에 전달되는 프로퍼티를 가진 객체
			,dataType:"json"
			,success:function(args){ // 응답이 성공 상태 코드를 반환하면 호출되는 함수
				location.reload();
				return ;				
			}
			,error:function(e){
				alert(e.responseText);
			}
		});	
	}	
/*  댓글의 댓글 삭제*/	
	function delcmtcmt(planSeq, commentSeq,reCommentSeq){		
		
		var url = '/planpang/bbs/plan/cmtcmtdelete';
		var params ='planSeq=' +planSeq+
					'&reCommentSeq='+reCommentSeq+
					'&commentSeq=' +commentSeq;
		
		$.ajax({
			type:"post" // 포스트 방식
			,url:url // url주소
			,data:params // 요청에 전달되는 프로퍼티를 가진 객체
			,dataType:"json"
			,success:function(args){ // 응답이 성공 상태 코드를 반환하면 호출되는 함수
				location.reload();
				return ;				
			}
			,error:function(e){
				alert(e.responseText);
			}
		});	
	}	
/*  댓글의 댓글 좋아요*/	
	function cmtcmtLike(planSeq, commentSeq,reCommentSeq) {
		
		var url = '/planpang/bbs/plan/cmtcmtlike';
		var params ='planSeq=' +planSeq+
					'&reCommentSeq='+reCommentSeq+
					'&commentSeq=' +commentSeq;
		
		$.ajax({
			type:"post" // 포스트 방식
			,url:url // url주소
			,data:params // 요청에 전달되는 프로퍼티를 가진 객체
			,dataType:"json"
			,success:function(args){ // 응답이 성공 상태 코드를 반환하면 호출되는 함수
				if(args.chkLikeCmtCmt==1){
					alert("좋아요를 이미 클릭 하였습니다");	
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
	
	
<div style="margin-left: 25px;">
	<!-- 게시물의 댓글 리스트 -->
 	<c:forEach var="list" items="${comentList}" > 
 		<h3 style=" margin-top: 75px;">등록된 댓글</h3>

	 		<div>
	 			<div>
	 				작성자 아이디:${list.MEMBERID}&nbsp;&nbsp;&nbsp;작성날짜:${list.REGDT}&nbsp;&nbsp;&nbsp;순번:${list.COMMENTSEQ} 
		 			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<c:if test="${memSeq==null}">
		 				<button  class="button white" disabled="disabled" onclick="cmtLike('${list.PLANSEQ}','${list.COMMENTSEQ}','${session.getAttribute(loginId)}')">좋아요 :${list.LIKENUM}</button> 
		 			</c:if>	
		 			<c:if test="${memSeq!=null}">
		 				<button class="button white" onclick="cmtLike('${list.PLANSEQ}','${list.COMMENTSEQ}','${session.getAttribute(loginId)}')">좋아요 :${list.LIKENUM}</button> 
		 			</c:if>	
	 			</div>
	 		</div>
		<div style="border:1px solid #dbdbdb; height: 100px; width: 892px;   background: #f2f5ff;">
			<input size="100" id="cmt${list.COMMENTSEQ}" style="background: #f2f5ff; " type="text" name="commentMemo"  value="${list.COMMENTMEMO}" readonly>
			<c:if test="${list.MEMSEQ == memSeq }">
				<button class="button white" onclick="goEdit('cmt${list.COMMENTSEQ}')">수정</button>			
				<button class="button white" onclick="goCmt('cmt${list.COMMENTSEQ}',${list.PLANSEQ},${list.COMMENTSEQ})">확인</button>
				<button class="button white" onclick="delcom('${list.PLANSEQ}',${list.COMMENTSEQ})">삭제</button>				
			</c:if>
		</div>
		<c:if test="${memSeq != null }">
			<h3>상단글 댓글</h3>
			<textarea id="reComMemo${list.COMMENTSEQ}" rows="2" cols="100" name="cmtcmtMemo" style="width: 892px;" ></textarea>	
			<button class="button white" onclick="addCmtCmt('reComMemo${list.COMMENTSEQ}','${list.PLANSEQ}','${list.COMMENTSEQ}')" >등록</button>
		</c:if>
		
		<!--댓글의 댓글 리스트  -->
		<c:forEach var="cmtcmt" items="${list.cmtcmt}"> 
			<div style="margin-left: 28px;">
				<div>
					<h3><b>┗></b>Re 댓글</h3>
					<div>
						RE.아이디:${cmtcmt.MEMBERID}&nbsp;&nbsp;&nbsp;RE작성날짜:${cmtcmt.REGDT}&nbsp;&nbsp;&nbsp;RE순번:${cmtcmt.RECOMMENTSEQ} 
					</div>
					
					<div>
						<c:if test="${memSeq==null}">
		 					<button>좋아요 :${cmtcmt.LIKENUM}</button> 
		 				</c:if>
		 				<c:if test="${memSeq!=null}">
		 					<button onclick="cmtcmtLike('${cmtcmt.PLANSEQ}','${cmtcmt.COMMENTSEQ}','${cmtcmt.RECOMMENTSEQ}')">좋아요 :${cmtcmt.LIKENUM}</button> 
		 				</c:if>
	 				</div>
				</div>
				
				<div style="border:1px solid #dbdbdb; height: 100px; width: 892px; background:#f2f5ff;">
					<input size="100" id="cmtcmt${cmtcmt.RECOMMENTSEQ+cmtcmt.COMMENTSEQ}" style="border:0px solid; background:#f2f5ff; height: 98px;" type="text" name="reCommentMemo" value="${cmtcmt.COMMENTMEMO}" readonly>
					<c:if test="${cmtcmt.MEMSEQ == memSeq }">
						<button onclick="goCmtEdit('cmtcmt${cmtcmt.RECOMMENTSEQ+cmtcmt.COMMENTSEQ}')">수정</button>			
						<button onclick="upCmtCmt('cmtcmt${cmtcmt.RECOMMENTSEQ+cmtcmt.COMMENTSEQ}','${cmtcmt.PLANSEQ}','${cmtcmt.RECOMMENTSEQ}','${cmtcmt.COMMENTSEQ}')">확인</button>
						<button onclick="delcmtcmt('${cmtcmt.PLANSEQ}','${cmtcmt.COMMENTSEQ}','${cmtcmt.RECOMMENTSEQ}')">삭제</button>
					</c:if>
				</div>
			</div>
		</c:forEach> 
	</c:forEach>
</div>
		
	<div style="margin-left: 25px; margin-bottom: 80px; border-top:1px solid #dbdbdb;">
		<c:if test="${loginSeq!=null}">
			<h3 style="width:1006px; ">New 댓글</h3>
			<div>작성자:${memberId}</div>
			<textarea id="comMemo" rows="5" cols="100" name="commentMemo" style="background: #fdfbe8;"></textarea><br />
			<button class="button white" onclick="addcom('comMemo',${planSeq})">등록</button>
			<input class="button white" type="reset" value="취소">
		</c:if>
	</div>


