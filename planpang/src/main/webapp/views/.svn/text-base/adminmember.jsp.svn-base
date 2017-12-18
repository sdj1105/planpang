<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@page session="true"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
	<head>
		<title></title>
		<link rel="stylesheet" href="/planpang/resources/css/planpang-frame.css" />		
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="/planpang/resources/js/sj.js"></script>
		<script type="text/javascript">
			// 폼 전송시 버튼 값 보내기
			function btnSubmit(){
				document.getElementById("btnValue").value = event.srcElement.value;
				document.memberForm.submit();
			}
			// select 박스 선택값으로 삭제회원 불러오기
			function setUnregyn(obj){
				location.href = "/planpang/adminmember?unregyn="+obj.value;
				
			}
		</script>
		<script>
			var searchWord  = '&searchWord=${ph.searchWord}';
			var unregyn = '&unregyn=${selOption}';
			function gogo(addr){
				location.href = addr+searchWord+unregyn;
			}
		</script>
		<script type="text/javascript">
			$(document).ready(function(){
			    //최상단 체크박스 클릭
			    $("#memcheckall").click(function(){
			        //클릭되었으면
			        if($("#memcheckall").prop("checked")){
			            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
			            $("input[name=memchk]").prop("checked",true);
			            //클릭이 안되있으면
			        }else{
			            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
			            $("input[name=memchk]").prop("checked",false);
			        }
			    });
			});
		</script>
	</head>

	<style type="text/css">
		.formTable {border: 1px solid #dbdbdb; width: 1150px; padding: 5px;}
		.formTable thead, .formTable tbody, .formTable tfoot  {border-bottom: 1px solid #dbdbdb; }
	</style>

	<body>
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>			
		</div>
		
		
		<div class="view">
				<h1>회원현황 보기</h1>
				<hr>
				<div><h2>총 회원 ${totalMem}명</h2> 
					<select name="unregyn" id="unregyn" onchange="setUnregyn(this)">
						<option value="N" ${selOption == 'N' ? 'selected' : '' }>가입회원</option>
						<option value="Y" ${selOption == 'Y' ? 'selected' : '' }>탈퇴회원</option>
					</select>
					<input class="button white" type="button" onclick="location.href = '/planpang/downloadExcel'" value="PangMember.xls">
				</div><br >
				
				<!-- 게시물이 없을 경우 -->		
				<c:if test="${ph.ttAtcCnt==0 || ph.ttAtcCnt==null}">
					<div class="no-data-msg">
						게시물이 없습니다.
					</div>
				</c:if>
				
				<form name="memberForm" id="memberForm" method="post" action="/planpang/editMember">
					<table class="formTable" cellpadding="7" cellspacing="1" style="background: #4864b4;">
						<thead>
							<tr style="background: #dbdbdb;">
								<td><input type="checkbox" id="memcheckall"></td><td>닉네임(아이디)</td><td>권한</td><td>가입일</td><td>최종접속일</td><td>게시물 수</td>
							</tr>
						</thead>
						<tbody>
							<c:forEach items="${memberInfo}" var="mem">
							<tr style="background: #ffffff;">
								<td><input type="checkbox" id="memchk" name="memchk"  value="${mem.MEMBERID}"/></td>
								<td><div>${mem.MEMNM}(${mem.MEMBERID})</div></td>
								<td><div>${mem.ROLE}</div></td>
								<td><div>${mem.JOINDT}</div></td>
								<td><div>${mem.CONNECTDT}</div></td>
								<td><div>${mem.PLANNUM}</div></td>
							<tr>
							</c:forEach>
						</tbody>
						<tfoot>
							<tr style="background: #ffffff;">
								<td colspan="6">
									선택된 회원 
									<select name="role" id="role">
										<option value="ROLE_USER">사용자</option>
										<option value="ROLE_ADMIN">관리자</option>
									</select>
									<c:if test="${selOption != 'Y'}">
									<input class="button white" type="button" onclick="btnSubmit()" value="권한변경">
									</c:if>
									<input class="button white" type="button" onclick="btnSubmit()" value="${selOption == 'Y' ? '회원복구' : '강제탈퇴' }">
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
							<a href="#" onclick="gogo('/planpang/adminmember?nowPgN=1&ph=${ph}')">1</a>
						</c:if>						
						<c:if test="${ph.hasPrev}">
							<a href="#" onclick="gogo('/planpang/adminmember?nowPgN=${(ph.nowPgPgN-1)*ph.hmPgN}')">이전</a>
						</c:if>
						
						<c:forEach var="bn" items="${ph.pgBtnNumC}">			
							<c:if test="${bn==ph.nowPgN}">							
								<a href="#" onclick="gogo('/planpang/adminmember?nowPgN=${bn}')">${bn}</a>
							</c:if>
							<c:if test="${bn!=ph.nowPgN}">
								<a href="#" onclick="gogo('/planpang/adminmember?nowPgN=${bn}')">${bn}</a>
							</c:if>			
						</c:forEach>
						
						<c:if test="${ph.hasNext}">
							<a href="#" onclick="gogo('/planpang/adminmember?nowPgN=${(ph.nowPgPgN*ph.hmPgN)+1}')">다음</a>
						</c:if>
						<c:if test="${ph.hasLast}">
							 ...<a href="#" onclick="gogo('/planpang/adminmember?nowPgN=${ph.ttPgN}')">${ph.ttPgN}</a>>
						</c:if>
					</div><br/>
				</c:if>
		</div>
		
		<div class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>		
	</body>
</html>
