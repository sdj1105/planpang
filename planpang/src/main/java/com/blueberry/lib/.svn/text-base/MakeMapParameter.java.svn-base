package com.blueberry.lib;

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

public class MakeMapParameter {
	
	private static final Logger logger = LoggerFactory.getLogger(MyFavPlanBbsController.class);
	
	public HashMap<String, Object> madeFrom(HttpServletRequest req){
		HashMap<String, Object> params = new HashMap<String, Object>();
		
		Enumeration<String> en = req.getParameterNames();				
		while(en.hasMoreElements()){
			String elNm = en.nextElement();
			params.put(elNm, req.getParameterValues(elNm)[0]);			
		}
		
		logger.info("\n ★WEB으로부터 받은 parameter를 HashMap으로 변경완료 \n::{}.", params);
		return params;
	}
	
}
