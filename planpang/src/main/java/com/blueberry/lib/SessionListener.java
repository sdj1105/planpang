package com.blueberry.lib;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.blueberry.planpang.service.HomeServiceImpl;

public class SessionListener {
	@Autowired
	HomeServiceImpl svc;
	
	public void sessionCreated(HttpSession session, HttpServletRequest req) {
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		 // 클라이언트 ip 받아오기
		 req = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		 
		 if(req.getHeader("X-FORWARDED-FOR") != null){
			 params.put("connectIp", req.getHeader("X-FORWARDED-FOR"));
		 }else if (req.getHeader("X-FORWARDED-FOR") == null || req.getHeader("X-FORWARDED-FOR") == ""){
			params.put("connectIp", req.getRemoteAddr());
		 }
		 
		// 전체 방문자 수 +1
		svc.setVisitTotalCount(params);
		 
		// 오늘 방문자 수
		int todayCount = svc.getVisitTodayCount();
		 
		// 전체 방문자 수
		int totalCount = svc.getVisitTotalCount();
		
		 // 세션 속성에 담아준다.
		 session.setAttribute("totalCount", totalCount); // 전체 방문자 수
		 session.setAttribute("todayCount", todayCount); // 오늘 방문자 수 
	}
}
