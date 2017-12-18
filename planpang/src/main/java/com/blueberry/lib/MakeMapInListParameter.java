package com.blueberry.lib;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.blueberry.planpang.controller.MyFavPlanBbsController;

/*
 * 작성자 : 김수중
 * 작성일 : 15.03.29 
 * */

public class MakeMapInListParameter {
	
	private static final Logger logger = LoggerFactory.getLogger(MyFavPlanBbsController.class);	
	
	public ArrayList<HashMap<String, String>> madeFrom(HttpServletRequest req){
		ArrayList<HashMap<String, String>> milParams = new ArrayList<HashMap<String, String>>();
				
		//최장 길이 조사
		int longestLength = 0;
		Enumeration<String> en = req.getParameterNames();		
		while(en.hasMoreElements()){
			String elNm = en.nextElement();
			if (longestLength < req.getParameterValues(elNm).length){
				longestLength = req.getParameterValues(elNm).length;
			}
		}		

		//최장 길이 만큼 공간 창출
		for (int i=0; i<longestLength; i++){
			HashMap<String, String> params = new HashMap<String, String>();
			milParams.add(params);
		}		
		
		//데이터 넣기
		Enumeration<String> en2 = req.getParameterNames();		
		while(en2.hasMoreElements()){
			String elNm = en2.nextElement();
			for(int i=0; i< req.getParameterValues(elNm).length; i++){
				milParams.get(i).put(elNm, req.getParameterValues(elNm)[i]);	
			}
		}		
		
		logger.info("\n ★WEB으로부터 받은 parameter를 ArrayList<HashMap>으로 변경완료 \n::{}.", milParams);
				
		return milParams;
	}

}
