<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<html>
	<head>
		<title>여행일정 공유</title>
 		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />		
		<link rel="stylesheet" href="/planpang/resources/css/planpang-bbs-list.css" />
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/sj.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/bbs-plan-list.js"></script>
		
	
		<script>
			var searchWord  = '&searchWord=${ph.searchWord}';
			function gogo(addr){
				location.href = addr+searchWord;
			}
		</script>	
		
	
	</head>

	<body onSelectStart ="return false" 
	onDragStart	="return false"
	onContextMenu ="return false">
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>			
		</div>
		
		
		
		<div id="view" class="view" onScroll="onScr()">
			${ph.ttAtcCnt}개의 일정이 등록되어 있습니다.
			<!-- 제목 -->
			<div id="tit" class="title">
				<img alt="아이콘" src="/planpang/resources/img/staricon.png">여행일정 공유
			</div>

			
			
			<!-- 게시판 -->
			<div class="bbs" id="bbs">
			
			
			
				<!-- 기능 버튼 표시 -->
				<div id="fn" class="fn">
					<div class="div-3-1 div-align-left">
						<!-- 페이징 표시 -->								
						<c:if test="${ph.ttAtcCnt>0}">
							<div id="pg" class="pg">									
								<c:if test="${ph.hasFirst}">
									<button onclick="gogo('/planpang/bbs/plan/list?nowPgN=1&ph=${ph}')">1</button>
								</c:if>						
								<c:if test="${ph.hasPrev}">
									<button onclick="gogo('/planpang/bbs/plan/list?nowPgN=${(ph.nowPgPgN-1)*ph.hmPgN}')">이전</button>
								</c:if>
								
								<c:forEach var="bn" items="${ph.pgBtnNumC}">			
									<c:if test="${bn==ph.nowPgN}">							
										<c:set var="classNowPgN" value="btn-nowpgn" />
									</c:if>
									<c:if test="${bn!=ph.nowPgN}">
										<c:set var="classNowPgN" value="" />
									</c:if>
									<button onclick="gogo('/planpang/bbs/plan/list?nowPgN=${bn}')" class="${classNowPgN}">${bn}</button>			
								</c:forEach>
								
								<c:if test="${ph.hasNext}">
									<button onclick="gogo('/planpang/bbs/plan/list?nowPgN=${(ph.nowPgPgN*ph.hmPgN)+1}')">다음</button>
								</c:if>
								<c:if test="${ph.hasLast}">
									 ...<button onclick="gogo('/planpang/bbs/plan/list?nowPgN=${ph.ttPgN}')">${ph.ttPgN}</button>
								</c:if>
							</div><!-- pg -->
						</c:if><!-- 페이징 -->	
					</div>
					
					
					<div class="div-3-2 div-align-right">					
						<!-- 즐찾통 -->
						<div id="addFavBox" class="fn-addfavBox">즐겨찾기</div>
						<!-- 휴지통 -->
						<div id="deleteBox" class="fn-deletebox">휴지통</div>
						<!-- 게시물 등록 버튼 -->
						<c:if test="${memSeq!=null}">
							<div class="fn-writeplan" onclick="goDarkSwarm(writeplanform, '500', '600', 'WHITE')">작성</div>
						</c:if>
						<!-- 검색기 -->
						<div class="fn-search">
							<form action="/planpang/bbs/plan/list" method="post">
								<input name="nowPgN" type="hidden" value="1">
								<input class="search-txt" id="searchWord" name="searchWord" type="text"/>
								<input class="search-btn" type="submit" value="검색" />
							</form>
						</div>	
						<!-- 최상단 점프  -->					
						<div id="jumpToTop" class="fn-jumptotop" onClick="location.href='#top'">위로 가기</div>
					</div>				
				</div>
				
				
				
				<!-- 게시물 리스트  -->
				<div id="atcList" class="atclist">		
					<!-- 게시물이 없을 경우 -->		
					<c:if test="${ph.ttAtcCnt==0 || ph.ttAtcCnt==null}">
						<div class="no-data-msg">
							게시물이 없습니다.
						</div>
					</c:if>
					
					<!-- 게시물 표시 -->
					<c:forEach var="atc" items="${atcList}" varStatus="st">
						<div id="atc${atc.PLANSEQ}" class="atc"
						style="background:url('${pageContext.request.contextPath}/resources/upload/${atc.PLANPHOTO}') no-repeat center; background-size:100% 100%;"
						onMouseOver="showBestCmt(this, ${atc.PLANSEQ})"
						onMouseOut="hideBestCmt()"
						onClick = "if(isOnMoving==true){return;} location.href='content?planSeq=${atc.PLANSEQ}&searchWord=${ph.searchWord}&nowPgN=${(ph.nowPgPgN*ph.hmPgN)+1}'">
							<div class="coljjan">
								<br /><br /><br /><br /><br /><br />여행비용<br /> \ ${atc.PLANCOST}원
							</div>
							<div class="col font001" >
								No.${atc.PLANSEQ}
								<br/>
								<input id="title${st.count}" type="text" value="${atc.PLANTITLE }" 
								onKeyDown="cmtValidation('title${st.count}', '${atc.PLANSEQ }')" 
								style="border:0px solid;" name="mtitle" readonly class="mtitle" />
								<br/>
								${atc.PLANAREA }에서 ${atc.FEWDAYS }일간
							</div>
							<div class="col1 font001">
								작성자: ${atc.MEMBERID}
								<br/>
								<img alt="댓글" src="/planpang/resources/img/comment.png">${atc.COMMENTSEQ} 
								<img alt="좋아요" src="/planpang/resources/img/like.png">${atc.LIKENUM } 
								<img alt="조회" src="/planpang/resources/img/eye.png">${atc.CNT }
							</div>
						</div><!-- atc -->
					</c:forEach> 
					
					<!-- 좋아요 높은 댓글 3개 -->
					<div id="bestCmt1" class="bestCmt hulahula"></div>
					<div id="bestCmt2" class="bestCmt hulahula"></div>
					<div id="bestCmt3" class="bestCmt hulahula"></div>	
		
			
				</div><br/>




			</div><!-- bbs -->
		</div><!-- view -->
		
		<!-- 맨 아래  -->
		<div id="bot" class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>
		
		
		
		
		
		<!-- onMouseOver -->
		<div id="detailPreviewer" class="onmouse-content"></div>
		<!-- dark swarm -->
		<div id="darkSwarm" style="display:none;"></div>
		<!-- inputDetail -->
		<div id="onlyThis" style="display:none;">
			<div id="writeplanform">
				<%@ include file="/views/bbs/writeform/writeplanform.jsp" %>
			</div>			
		</div>
	
	
	
		<!-- 마우스 끌기 추가  -->
		<script>
			for (var i=0; i<atcList.children.length; i++){
				atcList.children[i].setAttribute('onMouseMove', 'objMouseMove()');				
				atcList.children[i].setAttribute('onMouseDown', 'objStartMove(this)');
								
				atcList.children[i].style.left = atcList.children[i].offsetLeft;
				atcList.children[i].style.top = atcList.children[i].offsetTop;
			}
			bot.style.top = bot.offsetTop;
			bot.style.position = "absolute";
	 		for (var i=0; i<atcList.children.length; i++){
				atcList.children[i].style.position ="absolute";
			}
			
			
			
		
			function addFavAtc(objId){
				
				var	seq = objId.replace('atc','');
			 	if(confirm('즐겨 찾기 추가?')){
					var person=prompt("즐겨 찾기 제목을 입력해 주세요","제목없음");
					location.href="insertmyfav?planSeq="+seq+ "&myFavPlanTitle=" +person+"&searchWord=${ph.searchWord}";
			 	} 
			}
			function deleteAtc(objId){
				var	seq = objId.replace('atc','');
				if(confirm('지울까?')){
					location.href="deleteatc?planSeq="+seq+"&searchWord=${ph.searchWord}";								
				}
			}
		</script>
	</body>
</html>
