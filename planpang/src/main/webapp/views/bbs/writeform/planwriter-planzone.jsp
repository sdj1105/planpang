<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>



<div class="planZone-tool">
	<div class="col" onDblClick="goEditor(this.children[1])">
		<!-- 순번 -->
		No.<input id="inputPlan1" type="text" readonly value="${planSeq}" />
		<!-- 제목  -->
		<input id="inputPlan2" type="text" readonly
		onDblClick="goEditor(this)" onBlur="goText(this)"
		onKeyDown="if(event.keyCode==13){goText(this);}" value="" />
	</div>

	<div class="col" onDblClick="goEditor(this.children[0])">
		<!-- 시작일  -->
		<input id="inputPlan3" type="date" readonly
		onDblClick="goEditor(this)" onBlur="goText(this)"
		onKeyDown="if(event.keyCode==13){goText(this);}" value="" />
		일부터
	</div>

	<div class="col" onDblClick="goEditor(this.children[1])">
		<!-- 여행 일 수  -->
		<button id="btnRemoveDbox" onClick="removeDBox()"> -</button>
		<input id="inputPlan4" type="text" maxlength="2" readonly
		onBlur="goText(this)"
		onKeyDown="if(event.keyCode==13){goText(this);}" value="" />
		<button id="btnAddDbox" onClick="addNewDBox()"> +</button>
		일간
	</div>
	
	
	<div class="col" onDblClick="goEditor(this.children[0])">
		<!-- 여행지 -->
		<input id="inputPlan5" type="text" readonly
		onDblClick="goEditor(this)" onBlur="goText(this)"
		onKeyDown="if(event.keyCode==13){goText(this);}" value="">
		에서
	</div>
	
	<div class="col">
		<!-- 여행 비용 -->
		<!-- <button onClick="sumDBoxCost()">=</button> -->
		<input id="inputPlan6" type="text" readonly
		onDblClick="" onBlur=""
		onKeyDown="" value="" />
		원
	</div>
	
	<div id="shareyn" class="col" onDblClick="share(this.children[0])">
		<!-- 공유 여부 -->
		공유
		<input id="inputPlan9" type="button" 
		onDblClick="" onBlur="" onClick="share(this)"
		onKeyDown="" value="" />
	</div>
</div>


<div class="planZone-tool">
	<!-- 일정 추가  -->
	<div id="btnNote" class="note" onClick="addNewPBox(pBoxZone)">+</div>
	<!-- 쓰레기통 -->
	<div id="deleteBox" class="deletebox">쓰레기통</div>
	<!-- 메모장 버튼 -->
	<div id="btnMemo" class="memo" 
	onClick="goDarkSwarm(memo, '500', '400', 'white')">메모장</div>	
	<!-- 사진 버튼 -->
	<div id="btnPicture" class="picture" 
	onClick="viewPhoto(); goDarkSwarm(picture, '500', '400', 'white')">사진</div>
</div>