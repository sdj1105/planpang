<%@ page language="java" pageEncoding="UTF-8"  contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<link rel="stylesheet" href="/planpang/resources/css/planpang-bbs-planwriter.css" />
<link rel="stylesheet" href="/planpang/resources/css/planpang-bbs-planwriter-inputdetail.css" />
<link rel="stylesheet" href="/planpang/resources/css/planpang-bbs-planwriter-daydetail.css" />
<link rel="stylesheet" href="/planpang/resources/css/planpang-bbs-planwriter-planzone.css" />
<script>
	document.onscroll = function(){sjTopFixed(planZone);};
</script>
<script src="${pageContext.request.contextPath}/resources/js/jquery.form.js"></script>
<script type="text/javascript">
	$('#pForm').ajaxForm({
		dataType : 'text',
		beforeSerialize : function(){
		},
		beforeSubmit : function(){
		},
		success : function(data){
			//컨트롤러 실행 후 성공시 넘어옴
			alert("등록완료 ! ");
			viewPhoto();
		}
	});
</script>	
	



<div id="planZone" class="plan-zone">
	<%@ include file="/views/bbs/writeform/planwriter-planzone.jsp" %>
</div>




<div id="dBoxZone" class="dbox-zone"></div>
<div id="pBoxZone" class="pbox-zone"></div>





<!-- onMouseOver -->
<div id="dayDetailPreviewer" class="onmouse-content"></div>





<div id="darkSwarm" style="display:none;"></div>
<!-- 다크스웜 -->
<div id="onlyThis" style="display:none;">
	<!-- 메모 -->
	<div id="memo">	
		<textarea id="inputPlan7" readonly
		onDblClick="goEditor(this)" onBlur="goText(this)"
		onKeyDown="if(event.keyCode==13){goText(this);}"></textarea>
	</div>
	<!-- 사진  -->
	<div id="picture">
		<img id="inputPlan8" src="" />
		<form id="pForm" action="/planpang/bbs/planwriter/updatearticlephoto" method="POST" enctype="multipart/form-data">
			<input id="inputPlan81" name="planPhoto" type="file" readonly 
			onChange="replacePhoto();" value="" />
			<input id="inputPlan82" name="planSeq" type="hidden" value="" />
			<input id="inputPlan83" type="submit" value="사진바꾸기"/>
		</form>
	</div>		
</div>


<!-- dark swarm -->
<div id="dayDetailMask" class="onclick-mask"></div>
<!-- onClick -->
<div id="dayDetail" class="onclick-content day-detail">
	<button class="button white" id="btnAddOneTime" onclick="showInsertDetailTool()">일정추가</button>
	<br/>
	<div id="divTimeList"></div>
</div>


<!-- dark swarm -->
<div id="inputDetailMask" class="onclick-mask"></div>
<!-- inputDetail -->
<div id="inputDetail" class="onclick-content input-detail">
	<%@ include file="/views/bbs/writeform/planwriter-inputdetail.jsp" %>	
</div>

