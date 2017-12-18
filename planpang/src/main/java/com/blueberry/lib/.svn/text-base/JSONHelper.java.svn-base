package com.blueberry.lib;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.blueberry.planpang.controller.MyFavPlanBbsController;

public class JSONHelper {
	
	private static final Logger logger = LoggerFactory.getLogger(MyFavPlanBbsController.class);
	
	public JSONHelper(HttpServletResponse resp, Object data) {
		sendData(resp, data);
	}
	
	public void sendData(HttpServletResponse resp, Object data) {
		JSONObject ja = new JSONObject();
		ja.put("data", data);		
		resp.setContentType("text/html; charset-UTF-8");
		PrintWriter out;
		try {
			out = resp.getWriter();
			out.print(ja.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		logger.info("\n ★AJAX가 가져간 데이터 \n::{}", data);
	}
}
