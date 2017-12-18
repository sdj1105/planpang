/**
 * 
 */
/*
function goEditor(obj){
	obj.readOnly=false;	
	obj.style.border = "1px solid black";
	obj.focus();
}

function goText(obj){
	if (isValid(obj)){
		obj.readOnly=true;
		obj.style.border = "0px solid";	
		updatePlanInfo();
	}else{
		obj.focus();
	}		
}

function isValid(obj){
	1 ~ 31 까지 가능
	if (obj.id=="inputPlan4"){
		if (parseInt(obj.value)> 31){
			alert('최대 31일까지 입니다.');
			return false;
		}else if(parseInt(obj.value)< 1){
			alert('최소 하루입니다.');
			return false;
		}
	}
	
	return true;
}

function updatePlanInfo(){
	 데이터 갱신 
	planM.updateAtc();
	 fewDays에 dBox개체 수 맞추기
	adjustDBox();
	 각 객체에 적용 
	for(var i=0; i<hmDays; i++){
		setDBoxTitle(i);
	}
}

공유하기 토글 버튼
function share(obj){
	if (planM.atc.SHAREYN=="Y"){
		obj.value = "N";
	}else if(planM.atc.SHAREYN=="N"){
		obj.value = "Y";
	}
	planM.updateAtc();
}*/