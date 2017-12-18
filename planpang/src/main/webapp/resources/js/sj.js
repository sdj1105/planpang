

/**
 * 작성자 : 김수중
 * SJ CREATES NEW BOX 
 * @param classVal is String(ClassName)
 * @param inner is String(innerHTML)
 */
function getNewDiv(classVal, inner){
	var newDiv = document.createElement('div');		
	newDiv.setAttribute('class', classVal);
	newDiv.innerHTML = inner;
	return newDiv;
}			


/**
 * 작성자 : 김수중 * 
 * 작성일 : 15. 04. 09
 * 천장에 고정!! 스크롤 이벤트 발생시 호출 시킨다.
 * 
 * @param obj는 원하는 div의 id
 */
var qMenuY = 0;
function sjTopFixed(obj){	
	if(obj.style.position != "fixed"){
		qMenuY = obj.offsetTop;		
	}
	/*천장에 닿으면*/
	if(0 > qMenuY - $(window).scrollTop()){
		obj.style.top = "0";
		obj.style.left = "0";
		obj.style.position = "fixed";
				
	}else{
		obj.style.position = "";
		obj.style.top = qMenuY;
	}
};


	
/** ****** ***** ***** ***** *****
 * 		SJ PROVIDES NICE ajax
 * 		- url is String
 * 		- tempParams is Map
 ***** ***** ***** ***** ***** */
function getAjaxVal(url, tempParams){ 
	var returnData;
	var params = "dumi=" +new Date();
	for (var i in tempParams){
		params += '&' +i+ '=' +tempParams[i];
	}
						
	$.ajax({
		type:"post" 
		,url:url 
		,data:params
		,async:false
		,dataType:"json"
		,success:function(args){
			returnData = args.data;					
			return returnData;
		}
		,error:function(e){
			alert('에런데!');
			return;
		}
	});		
	
	return returnData;
}






/**
 * 작성자 : 김수중 
 * 내용 : 다크스웜 그리고 밝은 창 
 * 작성일 : 15. 04. 09
 */
var onDarkSwarm = false;

function goDarkSwarm(obj, width, height, backgroundColor){
	onDarkSwarm=true;
	/*if(onDarkSwarm==true){return;}*/
	/*기존의 자식 비우기*/
	for(var i=0; i<onlyThis.children.length; i++){
		onlyThis.children[i].style.display = "none";
	}
	/*표시될 자식만 표시하기 */
	obj.style.display="block";
	/*다크스웜 뿌리기*/
	$("#onlyThis").css("position", "fixed");
	$("#onlyThis").css("display", "block");
	$("#onlyThis").css("box-shadow", "rgba(0,0,0,0.5) 0 0 0 9999px, rgba(0,0,0,0.5) 2px 2px 3px 3px");	
	$("#onlyThis").css("z-index", "71");
	$("#onlyThis").css("width", width);
	$("#onlyThis").css("height", height);
	$("#onlyThis").css("background-color", backgroundColor);
	$("#onlyThis").css("border-radius", "15px");
	$("#onlyThis").css("text-align", "center");
	$("#"+ obj.id).css("text-align", "center");
	$("#darkSwarm").css("position", "fixed");
	$("#darkSwarm").css("display", "block");
	$("#darkSwarm").css("top", "0");
	$("#darkSwarm").css("left", "0");
	$("#darkSwarm").css("width", "100%");
	$("#darkSwarm").css("height", "100%");
	$("#darkSwarm").css("z-index", "70");
	/*창위치 정하기 */
	var y = ($(window).height()/3) - (($("#onlyThis").height()/2));
	var x = ($(window).width()/2) - ($("#onlyThis").width()/2);   	
	$("#onlyThis").css("top", "100px");
	$("#onlyThis").css("left", x);	
	/*onlyThis에 원하는 DIV를 자식으로 넘기기*/
	onlyThis.appendChild(obj);
	
}
function closeDarkSwarm(){
	onDarkSwarm=false;
	$("#onlyThis").css("position", "fixed");
	$("#onlyThis").css("display", "none");
	$("#onlyThis").css("box-shadow", "");	
	$("#onlyThis").css("z-index", "0");
	$("#darkSwarm").css("position", "fixed");
	$("#darkSwarm").css("display", "none");
	$("#darkSwarm").css("width", "100%");
	$("#darkSwarm").css("height", "100%");
	$("#darkSwarm").css("z-index", "0");
}	

$(document).ready(function(){	
	$("#darkSwarm").click(function(){
		if (onDarkSwarm==true){
			closeDarkSwarm();	
		}			
	});	
	$(document).keydown(function(e){
		if (onDarkSwarm==true && e.keyCode==27){
			closeDarkSwarm();
		}
	});		
});









/**
 * 작성자 : 김수중
 * @param event
 * @param target
 * @returns {Boolean}
 */
function isInBox(event, target){	
	var body = document.body;	
	if(target.offsetLeft < event.clientX + body.scrollLeft
	&& target.offsetLeft+target.offsetWidth > event.clientX + body.scrollLeft
	&& target.offsetTop < event.clientY + body.scrollTop
	&& target.offsetTop+target.offsetHeight > event.clientY + body.scrollTop){
		return true;		
	}
	return false;
}


/**
 * 작성자 : 김수중
 * @param event
 * @param target
 * @param fixedBar
 * @returns {Boolean}
 */
function isInBoxOnFixedBar(event, target, fixedBar){
	var body;
	/* 일반적인 경우 */
	if(document.body!=null){
		body = document.body;	
	}
	/* 대상 박스가 기능바 안에 존재하며, 기능바가 fixed되었을  경우 body의 scroll값을 0을 매긴다.*/
	if (fixedBar.style.position=="fixed"){
		body = {};
		body.scrollLeft = 0;
		body.scrollTop = 0;
	}
	
	if(target.offsetLeft < event.clientX + body.scrollLeft
	&& target.offsetLeft+target.offsetWidth > event.clientX + body.scrollLeft
	&& target.offsetTop < event.clientY + body.scrollTop
	&& target.offsetTop+target.offsetHeight > event.clientY + body.scrollTop){
		return true;		
	}
	return false;
}














/**
 * 데이트 포맷 라이브러리
 */
// date format 함수  : Date 내장 객체에 format함수 추가
Date.prototype.format = function(f) {    
    if (!this.valueOf()) return " ";     
    
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];    
    var d = this;         
    
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {        
        switch ($1) {            
           case "yyyy": return d.getFullYear();            
           case "yy": return (d.getFullYear() % 1000).zf(2);            
           case "MM": return (d.getMonth() + 1).zf(2);            
           case "dd": return d.getDate().zf(2);            
           case "E": return weekName[d.getDay()];            
           case "HH": return d.getHours().zf(2);            
           case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);            
           case "mm": return d.getMinutes().zf(2);            
           case "ss": return d.getSeconds().zf(2);            
           case "a/p": return d.getHours() < 12 ? "오전" : "오후";            
           default: return $1;        
         }    
    });}; 

//한자리일경우 앞에 0을 붙여준다.
String.prototype.string = function(len){
    var s = '', i = 0; 
    while (i++ < len) { s += this; } 
    return s;
}; 
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

// 예제 
//2014년 01월 30일 오후 01시 45분 02초
//console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초")); 
//2014-01-30
//console.log(new Date().format("yyyy-MM-dd")); 
//'14 01.30
//console.log(new Date().format("'yy MM.dd")); 
//2014-01-30 목요일
//console.log(new Date().format("yyyy-MM-dd E")); 
//현재년도 : 2014
//console.log("현재년도 : " + new Date().format("yyyy"));



