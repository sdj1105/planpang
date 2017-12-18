<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>



	<link rel="stylesheet" href="/planpang/resources/css/planpang-bbs-menu.css" />
	<script>
		function go(addr){
			location.href=addr;
		}
	</script>


	<!-- 메뉴  -->
	<a onclick="go('/planpang/main/')">
		<img src="/planpang/resources/img/planLogo.png" name="top">			
	</a>	
			
	<!-- 관리자 홈 -->
	<sec:authorize access="hasRole('ROLE_ADMIN')">
		<c:if test="${pageContext.request.userPrincipal.name != null}">
			<a href="javascript:go('/planpang/adminmain/')"><img alt="관리자홈" src="/planpang/resources/img/mIcon05b.png">관리자</a>　
		</c:if>
	</sec:authorize>
	
	<!-- 메인 -->
	<a onclick="go('/planpang/main/')"><img alt="메인" src="/planpang/resources/img/mIcon01b.png">홈으로</a>　
	
	<!-- 여행일정 -->
	<a onclick="go('/planpang/bbs/myplan/')"><img alt="여행일정" src="/planpang/resources/img/mIcon02b.png">나의 여행일정</a>　
	
	<!-- 즐겨찾기 -->
	<a onclick="go('/planpang/bbs/myfavplan/')"><img alt="즐겨찾기" src="/planpang/resources/img/mIcon03b.png">나의 즐겨찾기</a>　
	
	<!-- 일정공유 -->
	<a onclick="go('/planpang/bbs/plan/')"><img alt="일정공유" src="/planpang/resources/img/mIcon04b.png">여행일정 공유</a>


	


