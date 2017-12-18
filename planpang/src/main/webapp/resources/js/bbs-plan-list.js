/**
 * 
 */



/* 천장에 딱! 붙으시오! */
document.onscroll=function(){sjTopFixed(fn);sjTopFixed(tit);};


/* SJ MAKE BOX MOVES ANOTHER PLACE */
var mvObj;
var startX;
var startY;
var isOnDown = false;
var isOnMoving = false;	
document.onmouseup=function(){	
	if(isOnDown==true){
		isOnDown = false;
		$(".atc").css("transition-duration", "1s");
		$(".atc").css("z-index", "20");
	}
	if(isOnMoving==true){
	/*	 *** id가 bbs인 DIV의 밖일  경우  *** 
		if(!isInBox(event, view)){			
			mvObj.style.top = startY;
			mvObj.style.left = startX;
			mvObj = null;
			return;	
		}*/
		/* *** deleteBox 안에 들어왔을 경우  *** */
		if(isInBoxOnFixedBar(event, deleteBox, fn)){
			deleteAtc(mvObj.id);
			mvObj.style.top = startY;
			mvObj.style.left = startX;
			mvObj = null;
			return;	
		}
		/* *** addFavBox 안에 들어왔을 경우  *** */
		if(isInBoxOnFixedBar(event, addFavBox, fn)){
			addFavAtc(mvObj.id);
			mvObj.style.top = startY;
			mvObj.style.left = startX;
			mvObj = null;
			return;	
		}
		
		/*  *** confirm mvObj is out of the box *** */
		view.appendChild(mvObj);
		mvObj = null;
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

function objStartMove(obj){
	var body = document.body;
	mvObj = obj;
	/*mvObj = event.srcElement;*/	
	mvObj.adjustX = event.clientX - mvObj.offsetLeft + body.scrollLeft; 
	mvObj.adjustY = event.clientY - mvObj.offsetTop + body.scrollTop;
	startX = mvObj.offsetLeft;
	startY = mvObj.offsetTop;
	isOnDown = true;
	isOnMoving = false;
	$(".atc").css("transition-duration", "0s");
	$(".atc").css("z-index", "500");
}



/* WHEN mouse on box, SJ CREATE moving box(pBox, dBox ) */
function objMouseOver(){
	$("#detailPreviewer").css("display", "block");
}
function objMouseOut(){		
	$("#detailPreviewer").css("display", "none");
}
function objMouseMove(){		
	var body = document.body;
	$("#detailPreviewer").css("top", event.clientY + body.scrollTop + 2);
	$("#detailPreviewer").css("left", event.clientX + body.scrollLeft + 12);
}	









/* WHEN YOU CLICK PLANBOX, SJ SHOW pretty emp CONTENT*/
var onDetailEmp = false;
function detailMask(){
	if(isOnMoving==true){return;}
	if(onDetailEmp==true){return;}
	$("#detail").toggleClass("emp");            
	$("#detailMask").toggleClass("mask");
	var y = ($(window).height()/2) - (($("#detail").height()/3)*2);
	var x = ($(window).width()/2) - ($("#detail").width()/2);   	
	$("#detail").css("top", y);
	$("#detail").css("left", x);	   		
	$("#detail").css("display", "block");
	$("#detailMask").css("display", "block");
	onDetailEmp=true;		
}
function closeDetailMask(){
	$("#detail").toggleClass("emp");				
	$("#detailMask").toggleClass("mask");
	$("#detail").css("display", "none");
	$("#detailMask").css("display", "none");
	onDetailEmp=false;
}	

$(document).ready(function(){	
	$("#detailMask").click(function(){
		if (onDetailEmp==true){
			closeDetailMask();	
		}			
	});	
	$(document).keydown(function(e){
		if (onDetailEmp==true && e.keyCode==27){
			closeDetailMask();
		}
	});		
});
















/**
 * 작성자 : 김수중
 * 최신 댓글 3개 랜덤위치 뿌리기
 * @param obj
 * @param planSeq
 */
function showBestCmt(obj, planSeq){
	url = "/planpang/bbs/plan/getbestlike";
	params = {planSeq: planSeq};					
	var bestCmt = [];
	bestCmt = getAjaxVal(url, params);					
	for (var i=0; i<3; i++){
		if(bestCmt[i]!=null){
			var cmt = '[' +bestCmt[i].NICKNM+ ']  ' +bestCmt[i].COMMENTMEMO;
			if (i==0){
				bestCmt1.style.top = obj.offsetTop + (Math.random() * 50) -50;
				bestCmt1.style.left = obj.offsetLeft + (Math.random() * 50) -30;
				bestCmt1.innerHTML = cmt;
				bestCmt1.style.display = "block";
			}else if (i==1){
				bestCmt2.style.top = obj.offsetTop + (Math.random() * 50) +30;
				bestCmt2.style.left = obj.offsetLeft + (Math.random() * 50) +230;
				bestCmt2.innerHTML = cmt;
				bestCmt2.style.display = "block";
			}else if (i==2){
				bestCmt3.style.top = obj.offsetTop + (Math.random() * 50) +250;
				bestCmt3.style.left = obj.offsetLeft + (Math.random() * 50) -30;
				bestCmt3.innerHTML = cmt;
				bestCmt3.style.display = "block";
			}
		}
	}
	
}
function hideBestCmt(){
	bestCmt1.style.display = "none";
	bestCmt2.style.display = "none";
	bestCmt3.style.display = "none";
}
 






