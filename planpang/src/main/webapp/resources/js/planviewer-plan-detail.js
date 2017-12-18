/**
 * 
 */



/**
 * 일정관리 뷰어 
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
		inputPlan8.value = this.atc.PLANPHOTO;
		inputPlan9.value = this.atc.SHAREYN;
		nowPlanSeq = this.atc.PLANSEQ;
		hmDays = this.atc.FEWDAYS;
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
	idx = dBoxAM.length - 1;
	dBoxAM[idx].paperSeq = -1;
	dBoxAM[idx].obj = null;
	dBoxAM[idx].setPaperSeq = function(idx){
		/*초기 기존값 로드*/
		this.paperSeq = dBoxSeqList[idx];
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
	idx = pBoxAM.length-1;
	pBoxAM[idx].paperSeq = -1;
	pBoxAM[idx].obj = null;
	pBoxAM[idx].timeList = [];
	
	pBoxAM[idx].setPaperSeq = function(idx){
		/*초기 기존값 로드*/
		this.paperSeq = pBoxSeqList[idx];
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
					}	
				}	
				/*새dBox 연결고리 연결*/
				dBoxAM[i].appendPBox(getPBoxMByObj(mvObj));				
				/*여행비 총 계산하기*/
				sumDBoxCost();
				mvObj = null;
				return;								
			}
		}
		/*  *** confirm mvObj is out of the dBox *** */
		/* 기존 dBox에 있었다면 연결고리 끊기*/
		for (var j=0; j<dBoxAM.length; j++){
			if(dBoxAM[j].paperSeq == getPBoxMByObj(mvObj).paperSeq){
				dBoxAM[j].paperSeq = -1;
			}	
		}	
		view.appendChild(mvObj);
		/*여행비 총 계산하기*/
		sumDBoxCost();
		mvObj = null;
		return;
	}
};
document.onmousedown =function(){
	isOnMoving = false;	
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
		if (onDayDetailEmp==true && e.keyCode==27){
			closeDayDetailMask();
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




function viewPhoto(){	
	inputPlan8.src = '/planpang/resources/upload/'
					+ getArticlePhoto().PLANPHOTO;
	inputPlan8.style.width = "auto";
	inputPlan8.style.height = "auto";
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


function getTimeList(paperSeq){
	var url = "/planpang/bbs/planwriter/gettimelist";
	var params = {		planSeq: nowPlanSeq
					,	paperSeq: paperSeq};			
	return getAjaxVal(url, params);
}

function clearInputTool(){
	inputDetail1.value="";
	inputDetail2.value="";
	inputDetail3.value="";
	inputDetail4.value="";
	inputDetail5.value="";
	inputDetail6.value="";
	inputDetail7.value="";
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


