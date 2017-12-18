<%@ page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="com.blueberry.lib.*"%>
<%@ page import="com.blueberry.mybatis.*"%>


<html>
	<head>
		<title>나의 여행일정</title>
		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />	
		<link rel="stylesheet" href="/planpang/resources/css/planpang-bbs-list.css" />
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/sj.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/bbs-plan-list.js"></script>
		<script>
			function gogo(addr){
				location.href = addr;
			}
		</script>
		
		<script type="text/javascript">
			function checkTitle1() {
				if (searchWord.value == null || searchWord.value == "") {
					alert('제목을 입력하세요.');
					form1.searchWord.focus(redirect);
				} else {
					document.form1.submit();
				}
			}
		</script>
	</head>
	
	
	
	<body onSelectStart="return false" 
	onDragStart="return false"
	onContextMenu="return false">
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp"%></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp"%></div>
		</div>
		
		
		
		<div id="view" class="view">
			<!-- 제목 -->
			<div id="tit" class="title">
				<img alt="아이콘" src="/planpang/resources/img/staricon.png">나의 여행일정 <br>
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
									<button onclick="gogo('/planpang/bbs/myplan/list?nowPgN=1&ph=${ph}')">1</button>
								</c:if>						
								<c:if test="${ph.hasPrev}">
									<button onclick="gogo('/planpang/bbs/myplan/list?nowPgN=${(ph.nowPgPgN-1)*ph.hmPgN}')">이전</button>
								</c:if>
								
								<c:forEach var="bn" items="${ph.pgBtnNumC}">			
									<c:if test="${bn==ph.nowPgN}">							
										<c:set var="classNowPgN" value="btn-nowpgn" />
									</c:if>
									<c:if test="${bn!=ph.nowPgN}">
										<c:set var="classNowPgN" value="" />
									</c:if>
									<button onclick="gogo('/planpang/bbs/myplan/list?nowPgN=${bn}')" class="${classNowPgN}">${bn}</button>			
								</c:forEach>
								
								<c:if test="${ph.hasNext}">
									<button onclick="gogo('/planpang/bbs/myplan/list?nowPgN=${(ph.nowPgPgN*ph.hmPgN)+1}')">다음</button>
								</c:if>
								<c:if test="${ph.hasLast}">
									 ...<button onclick="gogo('/planpang/bbs/myplan/list?nowPgN=${ph.ttPgN}')">${ph.ttPgN}</button>
								</c:if>
							</div><!-- pg -->
						</c:if><!-- 페이징 -->	
					</div>
				
					<div class="div-3-2 div-align-right">
						<!-- 모든 버튼 체크 -->
						<div id="allCheck" >
							<div class="td">
								전체 선택<input type="checkbox" id="checkall">
							</div>
							<%--<checkbox name="delYn" id="delYn" value="M" /> --%>							
						</div>
						<!-- 휴지통 -->
						<div id="deleteBox" class="fn-deletebox" onClick="if(!editMode){return;}; document.checkBox.submit()">휴지통</div>
						<!-- 수정모드 버튼 -->
						<div id="btnEditMode" class="fn-editmode" onClick="goEditMode()">수정모드</div>
						<!-- 게시물 등록 버튼 -->
						<div class="fn-writeplan" onclick="goDarkSwarm(writeplanform, '500', '600', 'WHITE')">작성</div>
						
						<!-- 검색기 -->
						<div class="fn-search">
							<form name="form1" action="list" method="POST">
								<input type="hidden" value="${ph.nowPgPgN}" name="nowPgPgN" />
								<input class="search-txt" type="text" id="searchWord" name="searchWord" />
								<input class="search-btn" type="button" value="검색" onclick="checkTitle1()" />
							</form>
						</div>
						<!-- 최상단 점프  -->					
						<div id="jumpToTop" class="fn-jumptotop" onClick="location.href='#top'">위로 가기</div>
					</div>
				</div><!-- fn -->
			

			
			
				
				<form name="checkBox" method="post" action="/planpang/bbs/myplan/deletecheck" onsubmit="">
					<input type="hidden" value="${ph.searchWord}" name="searchWord">
					<input type="hidden" value="${ph.nowPgPgN}" name="nowPgPgN">
					<!-- 게시물 리스트  -->
					<div id="atcList" class="atclist">		
						<!-- 게시물이 없을 경우 -->		
						<c:if test="${ph.ttAtcCnt==0 || ph.ttAtcCnt==null}">
							<div class="no-data-msg">
								게시물이 없습니다.
							</div>
						</c:if>
						
						<!-- 게시물 표시 -->
						<c:forEach items="${ArticleList}" var="atc" varStatus="st">
							<div id="atc${atc.PLANSEQ}" class="atc"
							style="background:url('${pageContext.request.contextPath}/resources/upload/${atc.PLANPHOTO}') no-repeat center; background-size:100% 100%;"
							onMouseOver="showBestCmt(this, ${atc.PLANSEQ})"
							onMouseOut="hideBestCmt()"
							onClick = "if(isOnMoving || editMode){return;}; gogo('/planpang/bbs/plan/content?planSeq=${atc.PLANSEQ}&memSeq=${atc.MEMSEQ}&likeNum=${atc.LIKENUM}&searchWord=${ph.searchWord}&nowPgN=${ph.nowPgPgN}')">
								
								<div class="coljjan">
									<br /><br /><br /><br /><br /><br />여행비용  ${ph.searchWord}<br /> \ ${atc.PLANCOST }원
								</div>
								<div class="col font001" >
									<div class="imgText">
										<input type="checkbox" id="chk" class="chkbox"  name="chk"  value="${atc.PLANSEQ}"/>									
										No.${atc.PLANSEQ}
										<br/>
										<input id="title${st.count}" type="text" value="${atc.PLANTITLE }" 
										onKeyDown="cmtValidation('title${st.count}', '${atc.PLANSEQ }')" 
										style="border:0px solid;" name="mtitle" readonly class="mtitle" /><br />
										${atc.PLANAREA }에서 ${atc.FEWDAYS}일간
									</div>
								</div>
								<div class="col1 font001">
									작성자: ${atc.MEMBERID}
									<br/>
									<img alt="댓글" src="/planpang/resources/img/comment.png">${atc.COMMENTSEQ} 
									<img alt="좋아요" src="/planpang/resources/img/like.png">${atc.LIKENUM} 
									<img alt="조회" src="/planpang/resources/img/eye.png">${atc.CNT}
								</div>
							</div>
						</c:forEach>
						
						<!-- 좋아요 높은 댓글 3개 -->
						<div id="bestCmt1" class="bestCmt hulahula"></div>
						<div id="bestCmt2" class="bestCmt hulahula"></div>
						<div id="bestCmt3" class="bestCmt hulahula"></div>
						
					</div><!-- atclist -->

				</form>
				
				
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
			
			
			function deleteAtc(objId){
				var seq = objId.replace('atc','');
				if(confirm('지울까?')){					
				 	 location.href="del?PLANSEQ="+seq+"&searchWord=${ph.searchWord}&nowPgPgN=${ph.nowPgPgN}";
				}
			}	
		</script>
		
		
		<!-- 수정모드 -->
		<script>
			/*수정 모드 전환*/
			var editMode = true;
			goEditMode();
			
			function goEditMode(){
				if(editMode){
					/*수정모드가 아닐 때의 상태*/
					editMode = false;
					$(".coljjan").css("display","block");
					$(".chkbox").css("display","none");
					$("#allCheck").css("display","none");
					$(".fn-editmode").css("background","url('/planpang/resources/img/btneditmode.png') no-repeat center");
					$(".fn-editmode").css("background-size","100% 100%");
					btnEditMode.innerHTML="수정모드";
					return;
				}else{
					/*수정모드일 때의 상태*/
					editMode = true;
					$(".coljjan").css("display","none");
					$(".chkbox").css("display","inline-block");
					$("#allCheck").css("display","inline-block");
					$(".fn-editmode").css("background","url('/planpang/resources/img/btncancelmode.png') no-repeat center");
					$(".fn-editmode").css("background-size","100% 100%");					
					btnEditMode.innerHTML="복귀";
					return;
				}				
			}
		</script>		
		
		<script>
			$(document).ready(function(){
			    //최상단 체크박스 클릭
			    $("#checkall").click(function(){
			        //클릭되었으면
			        if($("#checkall").prop("checked")){
			            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
			            $("input[name=chk]").prop("checked",true);
			            //클릭이 안되있으면
			        }else{
			            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
			            $("input[name=chk]").prop("checked",false);
			        }
			    });
			});
		</script>
	</body>
</html>
