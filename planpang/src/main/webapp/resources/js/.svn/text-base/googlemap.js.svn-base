/** Google Map 객체. **/  
GoogleMap = {   
    /* 초기화. */  
    initialize : function() {
    	//지도 생성.(기본 위치 서울.)   
        var latlng = new google.maps.LatLng(37.56641923090,126.9778741551);   
        var myOptions = {   
            zoom: 13,   
            center: latlng,   
            mapTypeId: google.maps.MapTypeId.ROADMAP   
        };   
        this.map = new google.maps.Map(   
                document.getElementById("GoogleMap_map"),myOptions);
        
        this.input = document.getElementById("GoogleMap_input");   
        this.address = document.getElementById("GoogleMap_addr");  
        this.saveAddr = document.getElementById("GoogleMap_saveAddr");
        this.geocoder = new google.maps.Geocoder();   
        this.infowindow = new google.maps.InfoWindow();
        
        this.addrArray = [];
        
        //*** 마크, 동선을 그리고 난 후 해당 위치를 array에 저장합니다.
        this.MarkersArray = [];
        this.Coordinates= [];
        this.travelPathArray = [];
        
    	
        google.maps.event.addListener(this.marker, 'click', function() {
        	GoogleMap.removeMark();
        });
    },   
    /* 주소 검색.(지오코딩) */  
    codeAddress : function() {   
        var address = this.input.value;   
        //콜백 함수 호출.   
        this.geocoder.geocode( { 'address': address},    
                       function(results, status) {   
            if (status == google.maps.GeocoderStatus.OK) {   
                //검색 된 주소 목록.   
                GoogleMap.address.innerHTML = "";   
                var ul = document.createElement('ul');   
                for(var i=0; i<results.length; i++){   
                    var li = document.createElement('li');   
                    var a = document.createElement('a');   
                    a.href = "#";   
                    a.innerHTML = results[i].formatted_address;
                    GoogleMap.clickAddress(a, results[i].geometry.location,   
                            results[i].formatted_address);   
                    
                    li.appendChild(a);   
                    ul.appendChild(li); 
                }   
                GoogleMap.address.appendChild(ul); 
            }
        });   
    },
    //주소 클릭 이벤트.   
    clickAddress : function(a, addr,content){
    	//마커 생성.   
        this.marker = new google.maps.Marker({   
            map : this.map,   
            animation: google.maps.Animation.DROP   
        });
        a.onmousedown = function(){   
            //지도와 마커이동.   
            GoogleMap.map.setCenter(addr);   
            GoogleMap.marker.setPosition(addr);   
            GoogleMap.marker.setAnimation(google.maps.Animation.DROP);   
            GoogleMap.infowindow.setContent(content);   
            GoogleMap.infowindow.open(GoogleMap.map,GoogleMap.marker);
            //*** 선을 그리기 위해 좌표를 넣는다.
            GoogleMap.Coordinates.push(addr); 
            //*** 마커 담기
            GoogleMap.MarkersArray.push(GoogleMap.marker);
            //*** array에 담은 위도,경도 데이타를 가지고 동선 그리기
            GoogleMap.flightPath();
            
            GoogleMap.addrArray.push(content);
            alert(GoogleMap.addrArray);
            
            for(var i=0; i<GoogleMap.addrArray.length; i++){   
            	/*GoogleMap.saveAddr.innerHTML = GoogleMap.addrArray;*/
            	var vdDiv = document.createElement('div');
            	GoogleMap.saveAddr.appendChild(vdDiv);
            	vdDiv.innerHTML = GoogleMap.addrArray.pop(i);
            }
        };  
    },
    //*** 동선그리기
    flightPath : function(){
    	for (i in GoogleMap.travelPathArray){
    		GoogleMap.travelPathArray[i].setMap(null);
    	}
    	var flightPath = new google.maps.Polyline({
    		path: GoogleMap.Coordinates,
    		strokeColor: "#FF3366",
    		strokeOpacity: 0.7,
    		strokeWeight: 2
    	});
    	flightPath.setMap(GoogleMap.map);
    	GoogleMap.travelPathArray.push(flightPath);
    },
    // 마크 삭제하기
    removeMark : function(){
		this.marker.setOptions({
            map: null,
            visible: false
        });
        this.marker = null;
    }
};

window.onload = function(){   
    GoogleMap.initialize();   
};  