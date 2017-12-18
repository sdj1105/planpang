/**
 * 
 */




/**
 * 일정관리 라이터 
 * 작성자 : 김수중 
 * 작성일 : 15. 04. 08
 * */
function getPlan(planSeq){
	var planM = {};
	planM.atc = {};
	planM.setAtc = function(){
		this.atc = getArticle(planSeq);
		inputPlan1.value = this.atc.PLANSEQ;
		inputPlan2.value = this.atc.PLANTITLE;
		inputPlan3.value = this.atc.PLANPERIOD;
		inputPlan4.value = this.atc.FEWDAYS;
		inputPlan5.value = this.atc.PLANAREA;
		inputPlan6.value = this.atc.PLANCOST;
		inputPlan7.value = this.atc.MEMO;		
		inputPlan9.value = this.atc.SHAREYN;
		nowPlanSeq = this.atc.PLANSEQ;
		hmDays = this.atc.FEWDAYS;
	};
	planM.updateAtc = function(){
		var url = "/planpang/bbs/planwriter/updatearticle";
		var params = {		planSeq: inputPlan1.value
						,	planTitle: inputPlan2.value
						,	planPeriod: inputPlan3.value
						,	fewDays: inputPlan4.value
						,	planArea: inputPlan5.value
						,	planCost: inputPlan6.value
						,	memo: inputPlan7.value						
						,	shareyn: inputPlan9.value};
		getAjaxVal(url, params);
		this.setAtc();
	};
	planM.setAtc();
	return planM;
}

function addNewDBox(){
	if(dBoxAM.length>30){
		alert('더 이상 생산 할 수 없습니다.');
		return;
	}
	dBoxAM.push({});
	var idx = dBoxAM.length-1;
	dBoxAM[idx].paperSeq = -1;
	dBoxAM[idx].obj = null;
	dBoxAM[idx].setPaperSeq = function(idx){
		if (dBoxSeqList.length - 1 < idx){
			inputPlan4.value = dBoxAM.length;
			planM.updateAtc();
			insertDay();
			dBoxSeqList.push(-1);
		}else{			
			/*초기 기존값 로드*/
			this.paperSeq = dBoxSeqList[idx];
		}
	};
	dBoxAM[idx].setObj = function(parent, idx){
		this.obj = getNewDiv('daybox', '');
		this.obj.id = 'dBox' + idx;		
		parent.appendChild(this.obj);
		
		var dBoxTitleObj = getNewDiv('','');
		dBoxTitleObj.id = "dBoxTitle" + idx;
		dBoxAM[idx].obj.appendChild(dBoxTitleObj);
		
		setDBoxTitle(idx);
	};
	dBoxAM[idx].appendPBox = function(pBoxM){
		/*dBox의 자식이 되기 */
		this.obj.appendChild(pBoxM.obj);
		/*dBox와 연결고리 요요요! */
		this.paperSeq = pBoxM.paperSeq;
		/*dBox안에 있을때의 css로 변화하기 */
		pBoxM.obj.style.top = this.obj.offsetTop;
		pBoxM.obj.style.left = this.obj.offsetLeft;
	};

	dBoxAM[idx].setPaperSeq(idx);
	dBoxAM[idx].setObj(dBoxZone, idx);
	return dBoxAM[idx].obj;
}


function addNewPBox(){
	if(pBoxAM.length>30){
		alert('더 이상 생산 할 수 없습니다.');
		return;
	}
	pBoxAM.push({});
	var idx = pBoxAM.length-1;
	pBoxAM[idx].paperSeq = -1;
	pBoxAM[idx].obj = null;
	pBoxAM[idx].timeList = [];
	pBoxAM[idx].setPaperSeq = function(idx){
		if (pBoxSeqList.length - 1 < idx){
			var maxSeq = -1;
			for (var i=0; i<pBoxSeqList.length; i++){
				maxSeq = Math.max(maxSeq, pBoxSeqList[i]);
			}
			pBoxSeqList.push(maxSeq+1);
			this.paperSeq = pBoxSeqList[idx];
			/*기본 원타임 추가*/
			nowPaperSeq = this.paperSeq;			
			insertInitOneTime();
		}else{
			/*초기 기존값 로드*/
			this.paperSeq = pBoxSeqList[idx];
		}
	};
	pBoxAM[idx].setObj = function(parent){
		this.obj = getNewDiv('planbox', '<br/>paper</br>' + this.paperSeq);
		this.obj.id = 'pBox' + this.paperSeq;
		this.obj.setAttribute('onMouseOver', 'objMouseOver()');
		this.obj.setAttribute('onMouseOut', 'objMouseOut()');
		this.obj.setAttribute('onMouseMove', 'objMouseMove()');
		this.obj.setAttribute('onClick', 'showDayDetail('+getIdxByPaperSeq(this.paperSeq)+')');
		this.obj.setAttribute('onMouseDown', 'objStartMove()');		
		parent.appendChild(this.obj);
	};
	pBoxAM[idx].setTimeList = function(){
		this.timeList = getTimeList(this.paperSeq);
	};
	pBoxAM[idx].replaceTimeList = function(parent){
		while(parent.hasChildNodes()){
			parent.removeChild(parent.firstChild);       
		}
		for (var i=0; i<this.timeList.length; i++){
			var t = this.timeList[i];
			var oneTime = getNewDiv('el', '');
			oneTime.setAttribute('onDblClick', 'showUpdateDetailTool(' +getIdxByPaperSeq(this.paperSeq)+ ', ' +i+ ')');
			oneTime.appendChild(getNewDiv('col1', ' ' +t.PAPERTIMESTART1+ ':' +t.PAPERTIMESTART2+ ' ~ ' +t.PAPERTIMEEND1+ ':' +t.PAPERTIMEEND2 ));						
			oneTime.appendChild(getNewDiv('col2', '<img src="' +t.ICONPATH+ '">'));
			var oneTime2 = getNewDiv('elel', '');
			oneTime2.appendChild(getNewDiv('col31', t.PAPERINSIDE));
			oneTime2.appendChild(getNewDiv('col32', t.PAPERMEMO));
			oneTime2.appendChild(getNewDiv('col33', t.PAPERCOST+'원'));
			oneTime.appendChild(oneTime2);
			parent.appendChild(oneTime);
		}
	};
	
	pBoxAM[idx].setPaperSeq(idx);
	pBoxAM[idx].setTimeList();
	pBoxAM[idx].setObj(pBoxZone);
	return pBoxAM[idx].obj;
}



function setDBoxTitle(idx){
	var dBoxTitle = (idx+1) + '일차'; 
	if(planM.atc.PLANPERIOD!="" && planM.atc.PLANPERIOD!=null){
		var dt = new Date(planM.atc.PLANPERIOD);
		dt.setDate(dt.getDate() + idx);
		dBoxTitle = dt.format("MM/dd");
	};
	document.getElementById("dBoxTitle" + idx).innerHTML = dBoxTitle;
}


function removeDBox(){
	if(dBoxAM.length<2){
		alert('더 이상 지울 수 없습니다.');
		return;
	}
	/*dBox에 pBox가 있었다면 연결고리 끊기*/
	if(dBoxAM[dBoxAM.length-1].paperSeq != -1){
		var pBox = pBoxAM[getIdxByPaperSeq(dBoxAM[dBoxAM.length-1].paperSeq)].obj;
		pBoxZone.appendChild(pBox);		
	}	
	/*DOM?? 지우기*/
	deleteBox.appendChild(dBoxAM[dBoxAM.length-1].obj);
	deleteBox.removeChild(dBoxAM[dBoxAM.length-1].obj);
	/*dBoxAM 데이터 지우기*/
	dBoxAM.splice(dBoxAM.length-1, 1);
	/*DB 데이터 지우기*/
	deleteDay();
	/*DB 데이터 지우기*/
	inputPlan4.value = dBoxAM.length;
	planM.updateAtc();	
}
function adjustDBox(){
	cycle = Math.abs(hmDays - dBoxAM.length);
	if(hmDays > dBoxAM.length){
		for(var i=0; i<cycle; i++){
			addNewDBox();
		}
	}else if(hmDays < dBoxAM.length){
		for(var i=0; i<cycle; i++){
			removeDBox();
		}
	}
}
function removePBox(){
}



















/* WHEN mouse on box, SJ CREATE moving box(pBox, dBox ) */
function objMouseOver(){
	$("#dayDetailPreviewer").css("display", "block");
	getPBoxMByObj(event.srcElement).replaceTimeList(dayDetailPreviewer);
}
function objMouseOut(){		
	$("#dayDetailPreviewer").css("display", "none");
}
function objMouseMove(){		
	var body = document.body;
	$("#dayDetailPreviewer").css("top", event.clientY + body.scrollTop + 2);
	$("#dayDetailPreviewer").css("left", event.clientX + body.scrollLeft + 12);
}	



/* SJ MAKE BOX MOVES ANOTHER PLACE */
var mvObj;
var startX;
var startY;
var isOnDown = false;
var isOnMoving = false;	

document.onmouseup=function(){		
	if(isOnDown==true){
		isOnDown = false;
	}
	if(isOnMoving==true){
		/* dBox 안에 들어왔을 경우 */
		for(var i=0; i<dBoxAM.length; i++){
			if (dBoxAM[i].obj==null){
				continue;
			}
			
			if(isInBox(event, dBoxAM[i].obj)){
				/*already pBox exist in the dBox */
				if(dBoxAM[i].obj.childElementCount>1){						
					mvObj.style.top = startY;
					mvObj.style.left = startX;
					mvObj = null;
					return;
				}
				
				/* *** confirm mvObj is in the dBox *** */
				/* 기존 dBox에 있었다면 연결고리 끊기*/
				for (var j=0; j<dBoxAM.length; j++){
					if(dBoxAM[j].paperSeq == getPBoxMByObj(mvObj).paperSeq){
						dBoxAM[j].paperSeq = -1;
						/*DB PLANDAY 연결고리 지우기*/
						updateDay(j+1, dBoxAM[j].paperSeq);
					}
				}
				/*새dBox 연결고리 연결*/
				dBoxAM[i].appendPBox(getPBoxMByObj(mvObj));				
				/*DB PLANDAY에 연결고리 요요요! 저장 */
				updateDay(i+1,dBoxAM[i].paperSeq);
				/*여행비 총 계산하기*/
				sumDBoxCost();
				mvObj = null;
				return;								
			}
		}
		/* *** deleteBox 안에 들어왔을 경우  *** */
		if(isInBox(event, deleteBox)){
			if(confirm('are you sure delete it?')){
				var paperSeq = pBoxAM[getIdxByObj(mvObj)].paperSeq;
				/*dBox에 있었다면 연결고리 끊기*/
				for (var i=0; i<dBoxAM.length; i++){
					if(dBoxAM[i].paperSeq == paperSeq){
						dBoxAM[i].paperSeq = -1;
						/*DB PLANDAY 연결고리 지우기*/
						updateDay(i+1, dBoxAM[i].paperSeq);
					}	
				}
				/*pBoxSeqList에 있는 번호 지우기*/
				for (var i=0; i<pBoxSeqList.length; i++){
					if(pBoxSeqList[i] == paperSeq){
						pBoxSeqList.splice(i, 1);
					}	
				}
				/*pBoxAM 데이터 지우기*/
				pBoxAM.splice(getIdxByObj(mvObj), 1);
				/*DOM?? 지우기*/
				deleteBox.appendChild(mvObj);
				deleteBox.removeChild(mvObj);
				/*DB 데이터 지우기*/
				deletePaper(paperSeq);
				/*여행비 총 계산하기*/
				sumDBoxCost();
			}else{
				mvObj.style.top = startY;
				mvObj.style.left = startX;
			}
			mvObj = null;
			return;		
		}
		
		/*  *** confirm mvObj is out of the dBox *** */
		/* 기존 dBox에 있었다면 연결고리 끊기*/
		for (var j=0; j<dBoxAM.length; j++){
			if(dBoxAM[j].paperSeq == getPBoxMByObj(mvObj).paperSeq){
				dBoxAM[j].paperSeq = -1;
				/*DB PLANDAY 연결고리 지우기*/
				updateDay(j+1, dBoxAM[j].paperSeq);
			}	
		}	
		view.appendChild(mvObj);
		/*여행비 총 계산하기*/
		sumDBoxCost();
		mvObj = null;
		return;
	}
};

document.onmousemove=function(){
	if(isOnDown==true){
		var body = document.body;
        if(event.clientX - mvObj.adjustX>0) { 
        	mvObj.style.left = event.clientX - mvObj.adjustX + body.scrollLeft; 
        }  
        if(event.clientY - mvObj.adjustY>0) { 
        	mvObj.style.top = event.clientY - mvObj.adjustY  + body.scrollTop; 
        }
        
        mvObj.style.position = "absolute";
	    isOnMoving = true;
	}	
};
document.onmousedown =function(){
	isOnMoving = false;	
};
function objStartMove(){	
	var body = document.body;
	mvObj = event.srcElement;
	mvObj.adjustX = event.clientX - mvObj.offsetLeft + body.scrollLeft; 
	mvObj.adjustY = event.clientY - mvObj.offsetTop + body.scrollTop;
	startX = mvObj.offsetLeft;
	startY = mvObj.offsetTop;
	isOnDown = true;
	isOnMoving = false;	
}



/* WHEN YOU CLICK PLANBOX, SJ SHOW pretty emp CONTENT*/
var onDayDetailEmp = false;
function dayDetailMask(){
	if(isOnMoving==true){return;}
	if(onDayDetailEmp==true){return;}
	$("#dayDetail").toggleClass("emp");            
	$("#dayDetailMask").toggleClass("mask");
	var y = ($(window).height()/3) - (($("#inputDetail").height()/2));
	var x = ($(window).width()/2) - ($("#dayDetail").width()/2);   	
	$("#dayDetail").css("top", "100px");
	$("#dayDetail").css("left", x);	   		
	$("#dayDetail").css("display", "block");
	$("#dayDetailMask").css("display", "block");
	onDayDetailEmp=true;		
}
function closeDayDetailMask(){
	$("#dayDetail").toggleClass("emp");				
	$("#dayDetailMask").toggleClass("mask");
	$("#dayDetail").css("display", "none");
	$("#dayDetailMask").css("display", "none");
	onDayDetailEmp=false;
}	

$(document).ready(function(){	
	$("#dayDetailMask").click(function(){
		if (onDayDetailEmp==true){
			closeDayDetailMask();	
		}			
	});	
	$(document).keydown(function(e){
		if (onDayDetailEmp==true && onInputDetailEmp==false && e.keyCode==27){
			closeDayDetailMask();
		}
	});		
});

/* WHEN YOU CLICK addOneTime, SJ SHOW pretty emp CONTENT*/
var onInputDetailEmp = false;
function inputDetailToolMask(){
	if(isOnMoving==true){return;}
	$("#inputDetail").toggleClass("insertemp");            
	$("#inputDetailMask").toggleClass("insertmask");
	var y = ($(window).height()/3) - (($("#inputDetail").height()/2));
	var x = ($(window).width()/2) - ($("#inputDetail").width()/2);   	
	$("#inputDetail").css("top", "100px");
	$("#inputDetail").css("left", x);	   		
	$("#inputDetail").css("display", "block");
	$("#inputDetailMask").css("display", "block");
	onInputDetailEmp=true;
}
function closeInputDetailMask(){
	$("#inputDetail").toggleClass("insertemp");				
	$("#inputDetailMask").toggleClass("insertmask");
	$("#inputDetail").css("display", "none");
	$("#inputDetailMask").css("display", "none");
	onInputDetailEmp=false;
}	
$(document).ready(function(){	
	$("#inputDetailMask").click(function(){
		if (onInputDetailEmp==true){
			closeInputDetailMask();
		}			
	});	
	$(document).keydown(function(e){
		if (onInputDetailEmp==true && e.keyCode==27){
				closeInputDetailMask();
		}
	});	
});





/* SEARCHING TOOL */
function getPBoxMByObj(obj){
	for (var i=0; i<pBoxAM.length; i++){
		if (pBoxAM[i].obj==obj){
			return pBoxAM[i];
		}				
	}
	return null;
}
function getIdxByObj(obj){
	for (var i=0; i<pBoxAM.length; i++){
		if (pBoxAM[i].obj==obj){
			return i;
		}				
	}
	return null;
}
function getIdxByPaperSeq(paperSeq){
	var idx = 0;
	for(var i=0; pBoxAM.length; i++){
		if(pBoxAM[i].paperSeq==paperSeq){
			return i;
		}
	}
	return idx;
}
function getPaperSeqByIdx(idx){
	return pBoxAM[idx].paperSeq;
}

function getPBoxMByDBoxM(dBoxM){
	for (var k=0; k<pBoxAM.length; k++){
		if(pBoxAM[k].paperSeq==dBoxM.paperSeq){
			return pBoxAM[k];
		}
	}
}
/* 계산 때리기 */
function sumDBoxCost(){	
	var sum = 0;
	for (var i=0; i<dBoxAM.length; i++){
		if (dBoxAM[i].paperSeq != -1){
			var pBoxM = getPBoxMByDBoxM(dBoxAM[i]);
			for(var j=0; j<pBoxM.timeList.length; j++){
				sum += pBoxM.timeList[j].PAPERCOST;
			}	
		}
	}
	inputPlan6.value = sum;
	planM.updateAtc();	
}





/* 데이 플랜 보기 */ 
function showDayDetail(idx){			
	/*dark swarm*/		
	dayDetailMask();
	/*save nowPaperSeq*/
	nowPaperSeq = pBoxAM[idx].paperSeq;
	/*update TIMELIST DATA*/
	pBoxAM[idx].setTimeList();
	/*replace TIMELIST*/
	pBoxAM[idx].replaceTimeList(divTimeList);
	/*여행비 총 계산하기*/
	sumDBoxCost();
	return;
}
/* 한 타임 추가 툴 보기 */
function showInsertDetailTool(){
	/*dark swarm*/
	inputDetailToolMask();
	/*set Empty Value*/
	inputDetail1.value="";
	inputDetail2.value="";
	inputDetail3.value="";
	inputDetail4.value="";
	inputDetail5.value="";
	inputDetail6.value="";
	inputDetail7.value="";
	/*change INSERT TYPE INPUTTOOL*/
	inputDetailButton.setAttribute('onClick', 'insertOneTime()');
	inputDetail1.setAttribute('onKeyDown', 'if(event.keyCode==13){insertOneTime();}');
	inputDetail2.setAttribute('onKeyDown', 'if(event.keyCode==13){insertOneTime();}');
	inputDetail3.setAttribute('onKeyDown', 'if(event.keyCode==13){insertOneTime();}');
	inputDetail4.setAttribute('onKeyDown', 'if(event.keyCode==13){insertOneTime();}');
	inputDetail5.setAttribute('onKeyDown', 'if(event.keyCode==13){insertOneTime();}');
	inputDetail6.setAttribute('onKeyDown', 'if(event.keyCode==13){insertOneTime();}');
	inputDetail7.setAttribute('onKeyDown', 'if(event.keyCode==13){insertOneTime();}');
	inputDetailButton.innerHTML = '추가';
}
/* 한 타임 수정 툴 보기 */
function showUpdateDetailTool(dIdx, tIdx){
	/*set Value*/
	var t = pBoxAM[dIdx].timeList[tIdx];
	inputDetail1.value=t.PAPERTIMESTART1;
	inputDetail2.value=t.PAPERTIMESTART2;
	inputDetail3.value=t.PAPERTIMEEND1;
	inputDetail4.value=t.PAPERTIMEEND2;
	inputDetail5.value=t.PAPERINSIDE;
	inputDetail6.value=t.PAPERMEMO;
	inputDetail7.value=t.PAPERCOST;
	inputDetail8.value=t.ICONCD;	
	selectIcon("icon" + t.ICONCD);
	/*document.getElementById("icon" + t.ICONCD).style.border="2px solid red";*/
	
	/*dark swarm*/
	inputDetailToolMask();
	/*change UPDATE TYPE INPUTTOOL*/
	inputDetailButton.setAttribute('onClick', 'updateOneTime(' +t.TIMESEQ+ ')');
	inputDetail1.setAttribute('onKeyDown', 'if(event.keyCode==13){updateOneTime(' +t.TIMESEQ+ ');}');
	inputDetail2.setAttribute('onKeyDown', 'if(event.keyCode==13){updateOneTime(' +t.TIMESEQ+ ');}');
	inputDetail3.setAttribute('onKeyDown', 'if(event.keyCode==13){updateOneTime(' +t.TIMESEQ+ ');}');
	inputDetail4.setAttribute('onKeyDown', 'if(event.keyCode==13){updateOneTime(' +t.TIMESEQ+ ');}');
	inputDetail5.setAttribute('onKeyDown', 'if(event.keyCode==13){updateOneTime(' +t.TIMESEQ+ ');}');
	inputDetail6.setAttribute('onKeyDown', 'if(event.keyCode==13){updateOneTime(' +t.TIMESEQ+ ');}');
	inputDetail7.setAttribute('onKeyDown', 'if(event.keyCode==13){updateOneTime(' +t.TIMESEQ+ ');}');
	inputDetailButton.innerHTML = '수정';
}







/* 사진 업데이트 */
function viewPhoto(){
	inputPlan8.src = '/planpang/resources/upload/'
					+ getArticlePhoto().PLANPHOTO;
	inputPlan8.style.width = "auto";
	inputPlan8.style.height = "auto";
}
function replacePhoto(){
	inputPlan82.value = nowPlanSeq;
	/*pForm.submit();
	viewPhoto();*/
}








/* DB 데이터를 쏙~! */
function getArticle(planSeq){
	var url = "/planpang/bbs/planwriter/getarticle";
	var params = {planSeq: planSeq};
	return getAjaxVal(url, params);	
}


function getArticlePhoto(){
	var url = "/planpang/bbs/planwriter/getarticlephoto";
	var params = {planSeq: nowPlanSeq};
	return getAjaxVal(url, params);
}


function insertDay(){
	var url = "/planpang/bbs/planwriter/insertday";
	var params = {planSeq: nowPlanSeq};			
	return getAjaxVal(url, params);
}
function updateDay(daySeq, paperSeq){
	var url = "/planpang/bbs/planwriter/updateday";
	var params = {		planSeq: nowPlanSeq
					,	daySeq: daySeq
					,	paperSeq: paperSeq};			
	return getAjaxVal(url, params);
}
function deleteDay(){
	var url = "/planpang/bbs/planwriter/deleteday";
	var params = {planSeq: nowPlanSeq};			
	return getAjaxVal(url, params);
}




function deletePaper(paperSeq){
	var url = "/planpang/bbs/planwriter/deletepaper";
	var params = {		planSeq: nowPlanSeq
					,	paperSeq: paperSeq};			
	return getAjaxVal(url, params);
}
function getTimeList(paperSeq){
	var url = "/planpang/bbs/planwriter/gettimelist";
	var params = {		planSeq: nowPlanSeq
					,	paperSeq: paperSeq};			
	return getAjaxVal(url, params);
}
function insertInitOneTime(){
	var url = "/planpang/bbs/planwriter/insertonetime";
	var params = {		planSeq: nowPlanSeq
					,	paperSeq: nowPaperSeq
					,	paperTimeStart1: '01'
					, 	paperTimeStart2: '01'
					,	paperTimeEnd1: '01'
					, 	paperTimeEnd2: '01'
					, 	paperInside: '플랜'
					, 	paperMemo: '팡'
					, 	paperCost: 0
					,	iconCd: '1'};
	getAjaxVal(url, params);	
}
function insertOneTime(){
	var url = "/planpang/bbs/planwriter/insertonetime";
	var params = {		planSeq: nowPlanSeq
					,	paperSeq: nowPaperSeq
					,	paperTimeStart1: inputDetail1.value
					, 	paperTimeStart2: inputDetail2.value
					,	paperTimeEnd1: inputDetail3.value
					, 	paperTimeEnd2: inputDetail4.value
					, 	paperInside: inputDetail5.value
					, 	paperMemo: inputDetail6.value
					, 	paperCost: inputDetail7.value
					,	iconCd: inputDetail8.value}; 
	getAjaxVal(url, params);
	showDayDetail(getIdxByPaperSeq(nowPaperSeq));
	clearInputTool();
}


function updateOneTime(timeSeq){
	var url = "/planpang/bbs/planwriter/updateonetime";
	var params = {		planSeq: nowPlanSeq
					,	paperSeq: nowPaperSeq
					,	timeSeq: timeSeq
					,	paperTimeStart1: inputDetail1.value
					, 	paperTimeStart2: inputDetail2.value
					,	paperTimeEnd1: inputDetail3.value
					, 	paperTimeEnd2: inputDetail4.value
					, 	paperInside: inputDetail5.value
					, 	paperMemo: inputDetail6.value
					, 	paperCost: inputDetail7.value
					,	iconCd: inputDetail8.value}; 
	getAjaxVal(url, params);
	showDayDetail(getIdxByPaperSeq(nowPaperSeq));
	clearInputTool();
}
function deleteOneTime(timeSeq){
	var url = "/planpang/bbs/planwriter/deleteonetime";
	var params = {		planSeq: nowPlanSeq
					,	paperSeq: nowPaperSeq
					,	timeSeq: timeSeq}; 	
	getAjaxVal(url, params);
	showDayDetail(getIdxByPaperSeq(nowPaperSeq));
	clearInputTool();
}
function clearInputTool(){
	inputDetail1.value="";
	inputDetail2.value="";
	inputDetail3.value="";
	inputDetail4.value="";
	inputDetail5.value="";
	inputDetail6.value="";
	inputDetail7.value="";
	inputDetail8.value="";
	closeInputDetailMask();
}


function getPBoxSeqList(){
	var url = "/planpang/bbs/planwriter/getpboxseqlist";
	var params = {planSeq: nowPlanSeq};			
	return getAjaxVal(url, params);
}
function getDBoxSeqList(){
	var url = "/planpang/bbs/planwriter/getdboxseqlist";
	var params = {planSeq: nowPlanSeq};			
	return getAjaxVal(url, params);
}


