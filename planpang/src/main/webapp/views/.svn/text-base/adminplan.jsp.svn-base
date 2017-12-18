<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@page session="true"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
	<head>
		<title></title>
		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />		
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/sj.js"></script>
		<!-- 그래프/차트 플러그인 -->
		<link class="include" rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/plugins/jquery.jqplot.min.css" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/plugins/jquery.jqplot.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/plugins/jqplot.categoryAxisRenderer.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/plugins/jqplot.barRenderer.min.js"></script>
		<script type="text/javascript">
			// 폼 전송시 버튼 값 보내기
			function btnSubmit(){
				alert(event.srcElement.value);
				document.getElementById("btnValue").value = event.srcElement.value;
				document.planForm.submit();
			}
			
			// select 박스로 삭제된 게시물 목록 불러오기 
			function setDelyn(obj){
				location.href = "/planpang/adminplan?delyn="+obj.value;
				
			}
		</script>
		<script>
			var searchWord  = '&searchWord=${ph.searchWord}';
			var delyn = '&delyn=${selOption}';
			function gogo(addr){
				location.href = addr+searchWord+delyn;
			}
		</script>
		<script type="text/javascript">
			$(document).ready(function(){
			    //최상단 체크박스 클릭
			    $("#plancheckall").click(function(){
			        //클릭되었으면
			        if($("#plancheckall").prop("checked")){
			            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
			            $("input[name=planchk]").prop("checked",true);
			            //클릭이 안되있으면
			        }else{
			            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
			            $("input[name=planchk]").prop("checked",false);
			        }
			    });
			});
		</script>
		
	</head>
	
	<style type="text/css">
		.formTable {border: 1px solid #dbdbdb; width: 1150px; padding: 10px;}
		.formTable thead, .formTable tbody, .formTable tfoot  {border-bottom: 1px solid #dbdbdb; }
	</style>

	<body>
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>			
		</div>
		
		<div class="view">
			<h1>게시물현황 보기</h1>
			<hr>
				<div><h2>전체글 ${totalPlan}개</h2>
					<select name="delyn" id="delyn" onchange="setDelyn(this)">
						<option value="N" ${selOption == 'N' ? 'selected' : '' }>전체글</option>
						<option value="Y" ${selOption == 'Y' ? 'selected' : '' }>삭제글</option>
					</select>
				</div><br >
				
				<!-- 게시물이 없을 경우 -->		
				<c:if test="${ph.ttAtcCnt==0 || ph.ttAtcCnt==null}">
					<div class="no-data-msg">
						게시물이 없습니다.
					</div>
				</c:if>
				
				<form name="planForm" id="planForm" method="post" action="/planpang/editPlan">
					<table class="formTable" cellpadding="15" cellspacing="1" style="background: #4864b4;">
							<thead>
								<tr style="background: #dbdbdb;">
									<td><input type="checkbox" id="plancheckall"></td><td>글번호</td><td>제목</td><td>공유여부</td><td>작성일</td><td>작성자</td><td>조회수</td><td>좋아요수</td><td>최종수정일</td>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${planInfo}" var="plan">
								<tr style="background: #ffffff;">
									<td><input type="checkbox" id="planchk" name="planchk"  value="${plan.PLANSEQ}"/></td>
									<td><div>${plan.PLANSEQ}</div></td>
									<td><div>${plan.PLANTITLE}</div></td>
									<td><div>${plan.SHAREYN}</div></td>
									<td><div>${plan.REGDT}</div></td>
									<td><div>${plan.MEMNM}</div></td>
									<td><div>${plan.CNT}</div></td>
									<td><div>${plan.LIKENUM}</div></td>
									<td><div>${plan.UPDATEDT}</div></td>
								<tr>
								</c:forEach>
							</tbody>
							<tfoot>
								<tr style="background: #ffffff;">
									<td colspan="9">
									선택된 게시글 
									<input class="button white" type="button" onclick="btnSubmit()" value="${selOption == 'Y' ? '복구' : '삭제' }">
									<input type="hidden" name="btnValue" id="btnValue"/>
									</td>	
								</tr>
							</tfoot>
					</table>
				</form>
				<input class="button Blue" type="button" onclick="location.href = '/planpang/adminmain/'" value="관리자 홈">
				
				<!-- 페이징 표시 -->								
				<c:if test="${ph.ttAtcCnt>0}">
					<div class="pg">									
						<c:if test="${ph.hasFirst}">
							<a href="#" onclick="gogo('/planpang/adminplan?nowPgN=1&ph=${ph}')">1</a>
						</c:if>						
						<c:if test="${ph.hasPrev}">
							<a href="#" onclick="gogo('/planpang/adminplan?nowPgN=${(ph.nowPgPgN-1)*ph.hmPgN}')">이전</a>
						</c:if>
						
						<c:forEach var="bn" items="${ph.pgBtnNumC}">			
							<c:if test="${bn==ph.nowPgN}">							
								<a href="#" onclick="gogo('/planpang/adminplan?nowPgN=${bn}')">${bn}</a>
							</c:if>
							<c:if test="${bn!=ph.nowPgN}">
								<a href="#" onclick="gogo('/planpang/adminplan?nowPgN=${bn}')">${bn}</a>
							</c:if>			
						</c:forEach>
						
						<c:if test="${ph.hasNext}">
							<a href="#" onclick="gogo('/planpang/adminplan?nowPgN=${(ph.nowPgPgN*ph.hmPgN)+1}')">다음</a>
						</c:if>
						<c:if test="${ph.hasLast}">
							 ...<a href="#" onclick="gogo('/planpang/adminplan?nowPgN=${ph.ttPgN}')">${ph.ttPgN}</a>>
						</c:if>
					</div><br/>
				</c:if>
			
		</div>
		
		<div class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>		
	</body>
</html>
