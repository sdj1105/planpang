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
		<link class="include" rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/plugins/jquery.jqplot.css" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/plugins/jquery.jqplot.js"></script>
		<!-- 날짜 데이터 사용 -->
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/plugins/jqplot.dateAxisRenderer.js"></script>
		<!-- Highlighter(마우스 접근시 데이터정보 표시) 설정 -->
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/plugins/jqplot.highlighter.js"></script>
		<script>
		/* 가입자 수 그래프 값 */
		joinDay0 = ${latestWeekJoin.DAY0};
		joinDay1 = ${latestWeekJoin.DAY1};
		joinDay2 = ${latestWeekJoin.DAY2};
		joinDay3 = ${latestWeekJoin.DAY3};
		joinDay4 = ${latestWeekJoin.DAY4};
		joinDay5 = ${latestWeekJoin.DAY5};
		joinDay6 = ${latestWeekJoin.DAY6};
		
		/* 게시물 수 그래프 값 */
		planDay0 = ${latestWeekPlan.DAY0};
		planDay1 = ${latestWeekPlan.DAY1};
		planDay2 = ${latestWeekPlan.DAY2};
		planDay3 = ${latestWeekPlan.DAY3};
		planDay4 = ${latestWeekPlan.DAY4};
		planDay5 = ${latestWeekPlan.DAY5};
		planDay6 = ${latestWeekPlan.DAY6};
		
		/* 게시물 수 그래프 값 */
		visitDay0 = ${latestWeekVisit.DAY0};
		visitDay1 = ${latestWeekVisit.DAY1};
		visitDay2 = ${latestWeekVisit.DAY2};
		visitDay3 = ${latestWeekVisit.DAY3};
		visitDay4 = ${latestWeekVisit.DAY4};
		visitDay5 = ${latestWeekVisit.DAY5};
		visitDay6 = ${latestWeekVisit.DAY6};
		
		</script>
		
		<script type="text/javascript">
			// 폼 전송시 버튼 값 보내기
			function btnSubmit(){
				document.getElementById("btnValue").value = event.srcElement.value;
				document.memberForm.submit();
			}
		</script>
		<script type="text/javascript">
			// 차트 데이터 날짜 구하기
			function getTimeStamp(num) {
				var d = new Date();

				var year = d.getFullYear();
				var month = d.getMonth()+1;
				var date = d.getDate()+num;
				
				var s = leadingZeros(year, 4) + '-'
						+ leadingZeros(month, 2) + '-'
						+ leadingZeros(date, 2);

				return s;
			}

			// 날짜 데이터 자릿수 맞추기
			function leadingZeros(n, digits) {
				var zero = '';
				n = n.toString();

				if (n.length < digits) {
					for (i = 0; i < digits - n.length; i++)
						zero += '0';
				}
				return zero + n;
			}
		</script>
		<script type="text/javascript">
			var joinLine =[[getTimeStamp(-6),joinDay6],[getTimeStamp(-5),joinDay5],[getTimeStamp(-4),joinDay4],
			           	   [getTimeStamp(-3),joinDay3],[getTimeStamp(-2),joinDay2],[getTimeStamp(-1),joinDay1],[getTimeStamp(0),joinDay0]];
			
			var planLine =[[getTimeStamp(-6),planDay6],[getTimeStamp(-5),planDay5],[getTimeStamp(-4),planDay4],
			           	   [getTimeStamp(-3),planDay3],[getTimeStamp(-2),planDay2],[getTimeStamp(-1),planDay1],[getTimeStamp(0),planDay0]];
			
			var visitLine =[[getTimeStamp(-6),visitDay6],[getTimeStamp(-5),visitDay5],[getTimeStamp(-4),visitDay4],
			           	   [getTimeStamp(-3),visitDay3],[getTimeStamp(-2),visitDay2],[getTimeStamp(-1),visitDay1],[getTimeStamp(0),visitDay0]];
			
			$(function(){
				$.jqplot ('joinGraph', [joinLine],
			             {
			                axes: {
			                    xaxis: {
			                      label: "",
			                      renderer:$.jqplot.DateAxisRenderer,
			                      tickOptions:{ // 축에관한 옵션                    
			                          // 입력된 값이 날짜형태로 인식되기 위해서 format 형식을 정해주고 입력값도
			                          // yyyy/mm/dd 형식으로 입력해야만 정상적으로 나타납니다.
			                            formatString:'%y/%m/%d'
			                      } 
			                    },
			                    
			                    yaxis: {
			                      label: ""
			                    }
			                  }
			             }
			      );
				
				$.jqplot ('planGraph', [planLine],
			             {
			                series:[{
			                	color: 'red',
			                	highlighter: { // 마우스 접근시 나타나는 정보 옵션
			                		show:true,
			                		formatString: '%s일 %s개'
			                	    }
			                }],
			                axes: {
			                    xaxis: {
			                      label: "",
			                      renderer:$.jqplot.DateAxisRenderer,
			                      tickOptions:{ // 축에관한 옵션                    
			                          // 입력된 값이 날짜형태로 인식되기 위해서 format 형식을 정해주고 입력값도
			                          // yyyy/mm/dd 형식으로 입력해야만 정상적으로 나타납니다.
			                            formatString:'%y/%m/%d'
			                      } 
			                    },
			                    
			                    yaxis: {
			                      label: ""
			                    }
			                  }
			             }
			      );
				
				$.jqplot ('visitGraph', [visitLine],
			             {
			                series:[{
			                	color: 'green',
			                	label: 'today',
			                	highlighter: { // 마우스 접근시 나타나는 정보 옵션
			                		show:true,
			                		formatString: '%s일 %s개'
			                	    }
			                }],
			                axes: {
			                    xaxis: {
			                      label: "",
			                      renderer:$.jqplot.DateAxisRenderer,
			                      tickOptions:{ // 축에관한 옵션                    
			                          // 입력된 값이 날짜형태로 인식되기 위해서 format 형식을 정해주고 입력값도
			                          // yyyy/mm/dd 형식으로 입력해야만 정상적으로 나타납니다.
			                            formatString:'%y/%m/%d'
			                      } 
			                    },
			                    
			                    yaxis: {
			                      label: ""
			                    }
			                  }
			             }
			      );
			});
		</script>
	</head>

<style type="text/css">
.view div{
	float: left;
	margin-right: 20px;
}
.box{
	width: 	450px;
	height: 180px;
	border: 1px solid #dbdbdb; padding: 30px;
}

.box div{
	float: left;
}  
.box h2{
	width: 218px;
}

.box .graph{
	width:	250px; 
	height:	150px; 
	cursor:	pointer;
	float:	right;
}

</style>

	<body>
		<div class="top">
			<div class="logininfo"><%@ include file="/views/ex/logininfo.jsp" %></div>
			<div class="menu"><%@ include file="/views/ex/menu.jsp" %></div>			
		</div>
		
		<div class="view">
		<h1>관리자홈</h1>
			<hr />
			<br />
			
			<!-- 대시보드 시작 -->
			<div>
				<h2>회원현황</h2>
				<div class="box">
					<div>
						<h3>전체 회     원수 : ${totalMem}명</h3>
					</div>
					<div class="graph" id="joinGraph"  onclick="location.href='/planpang/adminmember'"></div>
				</div>
			 </div>
			 
			 <div>
				<h2>방문현황</h2>
				<div class="box">
					<div>
						<h3>전체 방문자수 : ${sessionScope.totalCount}명</h3>
						<h3>오늘 방문자수 : ${sessionScope.todayCount}명</h3>
					</div>
					<div class="graph" id="visitGraph" onclick="location.href='/planpang/adminmember'"></div>
				</div>
			 </div>
			 
			 <br />
			 <div>
			 	<h2>게시물 현황</h2>
			 	<div class="box">
					<div>
						<h3>전체 게시글수 : ${totalPlan}개</h3>
						<h3>전체 댓     글수 : ${totalComments}개</h3>
					</div>
					<div class="graph" id="planGraph" onclick="location.href='/planpang/adminplan'"></div>
				</div>
			 </div>
		</div>
		
		<div class="bottom"><%@ include file="/views/ex/bottom.jsp" %></div>		
	</body>
</html>







