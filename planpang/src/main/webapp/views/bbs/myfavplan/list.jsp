<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%-- <%@ page contentType="text/html; charset=UTF-8" %>
<% request.setCharacterEncoding("UTF-8"); %>
<% java.net.URLEncoder.encode("searchWord", "UTF-8"); %> --%>


<!-- 얘 땜시롱 안됨...ㅠ -->
<!-- <!DOCTYPE html> -->

<html>
	<head>
		<title>나의 즐겨찾기</title>
		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />	
		<link rel="stylesheet" href="/planpang/resources/css/planpang-bbs-list.css" />
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/sj.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/bbs-plan-list.js"></script>
	<!--<script>
			var searchParam = '&searchMyfavPlanSeq=${searchMyfavPlanSeq}';
			function cGo(whereGo){
				location.href = (whereGo + searchParam);								
			}
		</script> -->
	</head>



	<body onSelectStart="return false" 
	onDragStart="return false"
	onContextMenu="return false">
		<!-- 헤더영역 s -->
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>			
		</div>
		<!-- 헤더영역 e -->
		
		
		
		
		<diV id="view" class="view">
			<!-- 제목 -->
			<div id="tit" class="title">
				<img alt="아이콘" src="/planpang/resources/img/staricon.png">나의 즐겨찾기
			</div>
			
				
			<!-- 게시판 -->
			<div id="bbs" class="bbs">
			
			
			
				<!-- 기능 버튼 표시 -->
				<div id="fn" class="fn">
					<div class="div-3-1 div-align-left">
						<!-- 페이징 표시 -->								
						<c:if test="${ph.ttAtcCnt>0}">
							<div id="pg" class="pg">									
								<c:if test="${ph.hasFirst}">
									<button onclick="gogo('/planpang/bbs/myfavplan/list?nowPgN=1&ph=${ph}')">1</button>
								</c:if>						
								<c:if test="${ph.hasPrev}">
									<button onclick="gogo('/planpang/bbs/myfavplan/list?nowPgN=${(ph.nowPgPgN-1)*ph.hmPgN}')">이전</button>
								</c:if>
								
								<c:forEach var="bn" items="${ph.pgBtnNumC}">			
									<c:if test="${bn==ph.nowPgN}">							
										<c:set var="classNowPgN" value="btn-nowpgn" />
									</c:if>
									<c:if test="${bn!=ph.nowPgN}">
										<c:set var="classNowPgN" value="" />
									</c:if>
									<button onclick="gogo('/planpang/bbs/myfavplan/list?nowPgN=${bn}')" class="${classNowPgN}">${bn}</button>			
								</c:forEach>
								
								<c:if test="${ph.hasNext}">
									<button onclick="gogo('/planpang/bbs/myfavplan/list?nowPgN=${(ph.nowPgPgN*ph.hmPgN)+1}')">다음</button>
								</c:if>
								<c:if test="${ph.hasLast}">
									 ...<button onclick="gogo('/planpang/bbs/myfavplan/list?nowPgN=${ph.ttPgN}')">${ph.ttPgN}</button>
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
						<!-- 검색기 -->
						<div id="search" class="fn-search">
							<form id="searchForm" action="/planpang/bbs/myfavplan/list" method="post" >
									<%-- <input type="hidden" name="myfavPlanSeq" value="${myfavPlanSeq }" /> --%>
									<input class="search-txt" type="text" id="searchWord" name="searchWord" size="15" maxlength="30" />
									<input class="search-btn" type="submit"  value="검색" />
							</form>
						</div>
						<!-- 최상단 점프  -->					
						<div id="jumpToTop" class="fn-jumptotop" onClick="location.href='#top'">위로 가기</div>			
					</div>		
				</div><!-- fn -->
				
				
				<!-- 컨텐츠 영역 s -->
				<form name="checkBox" method="post" action="/planpang/bbs/myfavplan/deletecheck" onsubmit="">
					<input type="hidden" value="${ph.searchWord}" name="searchWord">
					<input type="hidden" value="${ph.nowPgPgN}" name="nowPgPgN">
					<div id="atcList" class="atclist">
						<!-- 게시물이 없을 경우 -->		
						<c:if test="${ph.ttAtcCnt==0 || ph.ttAtcCnt==null}">
							<div class="no-data-msg">
								게시물이 없습니다.
							</div>
						</c:if>
						
						<!-- 게시물 표시 -->						
						<c:forEach items="${atcList}" var="atc" varStatus="st">
							<div id="atc${atc.MYFAVPLANSEQ}" class="atc"
							style="background:url('${pageContext.request.contextPath}/resources/upload/${atc.PLANPHOTO}') no-repeat center; background-size:100% 100%;"
							onMouseOver="showBestCmt(this, ${atc.MYFAVPLANSEQ})"
							onMouseOut="hideBestCmt()"
							onClick = "if(isOnMoving || editMode){return;}; gogo('/planpang/bbs/plan/content?planSeq=${atc.PLANSEQ}&memSeq=${atc.MEMSEQ}&likeNum=${atc.LIKENUM}&searchWord=${ph.searchWord}&nowPgN=${(ph.nowPgPgN*ph.hmPgN)+1}')">
								
								<div class="coljjan">
									<br /><br /><br /><br /><br /><br />여행비용<br /> \ ${atc.PLANCOST }원
								</div>
								<div class="col font001">
									<div class="imgText">
										<input type="checkbox" id="chk" class="chkbox" name="chk"  value="${atc.MYFAVPLANSEQ}" />										
										No.${atc.MYFAVPLANSEQ}
										<br/> 
										<input id="title${atc.MYFAVPLANSEQ}" type="text" value="${atc.MYFAVPLANTITLE}" 
										onDblClick="goEdit(this);"
										onKeyDown="if(event.keyCode==13){cmtValidation(this);};" onBlur="cmtValidation(this)" 
										name="mtitle" readonly class="mtitle" /><br/>
										${atc.PLANAREA }에서 ${atc.FEWDAYS}일간
										<%-- <input type="hidden" name="chk" value="${atc.MYFAVPLANSEQ }"> --%>
										<%-- <input id="delYn${st.count}" > --%>										 
									</div>
								</div>
								<div class="col1 font001">
									작성자: ${atc.MEMBERID }
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
						
					</div><!-- atclist -->
				</form>
				<!-- 컨텐츠 영역 e -->
				
				
				
			</div><!-- bbs -->
		</div><!-- view -->
		
		
		<!-- 맨 아래  -->
		<div id="bot" class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>
		
		
		
			
 		<!-- onMouseOver -->
		<div id="detailPreviewer" class="onmouse-content">
			<img alt="플랜로고" src="/planpang/resources/img/planLogo.png">
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
				atcList.children[i].style.position = "absolute";
			}
				
		
			function deleteAtc(objId){
				var	seq = objId.replace('atc','');
				
				if(confirm('지울까?')){
					location.href="/planpang/bbs/myfavplan/delete?MYFAVPLANSEQ="+seq+"&searchWord=${ph.searchWord}";								
				}
			}
		</script>
			
		
		
<!-- 	<div id="form-group" style="display: none;">
			<form id="listCheck" name="listCheck" action="/planpang/bbs/myfavplan/deletecheck" method="post">
				<input type="hidden" name="chk" />
			</form>
		</div> -->
		
		
		
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
			/*제목 수정*/
			function cmtValidation(inputObj){
				inputObj.readOnly=true;
				inputObj.style.border="0px solid";
				/* 여기서 UPDATE 시킴 */			
				dbUpdateTitle(inputObj.value, inputObj.id.replace('title',''));
			}
			function goEdit(inputObj){
				inputObj.readOnly=false;
				inputObj.style.border="1px solid";
				inputObj.focus();
			}
			function dbUpdateTitle(title, seq){
				var url = "/planpang/bbs/myfavplan/updatetitle";
				var params = {		myFavPlanSeq:seq
								,	myFavPlanTitle:title}; 
				getAjaxVal(url, params);
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
			
			    
			
			function gogo(addr){
				location.href=addr;
			}
			
			
			function goView(MyFavPlanSeq){
				var checkBox = document.getElementById("checkBox");
				checkBox.MyFavPlanSeq.value=MyFavPlanSeq;
				checkBox.submit(); 
				/* document.noticeViewForm.ntcSeq.value=ntcSeq;
				document.noticeViewForm.submit(); */
			}
			
			function goList(page){
				var form = document.getElementById("noticeListForm");
				form.curPage.value=page;
				form.submit();
			}
		</script>
				
				
				
				
	</body>
</html>
