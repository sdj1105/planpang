<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>



<div id="planIconBox">
</div>

<div align="left" >
	시간  
	<input id="inputDetail1" maxlength="2" type="text" />
	:
	<input id="inputDetail2" maxlength="2" type="text" />
	 ~ 
	<input id="inputDetail3" maxlength="2" type="text" />
	: 
	<input id="inputDetail4" maxlength="2" type="text" />  
	<br/>
	 
	장소  
	<input id="inputDetail5" type="text" placeholder="장소"> 
	<br/>
	 
	메모  
	<input id="inputDetail6" type="text" placeholder="메모"> 
	<br/>
	 
	금액  
	<input id="inputDetail7" type="text" value="0">
	원
	<br/>
	 
	<input id="inputDetail8" type="hidden" placeholder="아이콘" value="1">
</div>

<div align="right">
	<button id="inputDetailButton" onclick=""></button> 
</div>
 



<script>
function getPlanIcons(){
	var url = "/planpang/bbs/planwriter/getplanicons";
	var params = {};			
	return getAjaxVal(url, params);
}
function selectIcon(objId){	
	inputDetail8.value = objId.replace('icon', '');	
	for(var i=0; i<iconList.length; i++){
		var haha = document.getElementById("icon"+(i+1));		
		if (haha.id==objId){
			haha.style.border = "2px solid red";	
		}else{
			haha.style.border = "2px solid";
		}
	}
}

var iconList = [];
iconList = getPlanIcons();
for(var i=0; i<iconList.length; i++){
	obj = getNewDiv('planicon','<img src="' +iconList[i]+ '">');
	obj.id = 'icon' + (i+1);	
	obj.setAttribute('onClick','selectIcon("' +obj.id+ '");');	
	planIconBox.appendChild(obj);
}
</script>