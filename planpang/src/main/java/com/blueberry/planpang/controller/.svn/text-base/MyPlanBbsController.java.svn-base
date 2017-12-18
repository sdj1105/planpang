package com.blueberry.planpang.controller;

import java.util.HashMap;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.blueberry.lib.MakeMapParameter;
import com.blueberry.planpang.service.MyPlanBbsServiceImpl;


@Controller
@RequestMapping(value = "/bbs/myplan")
public class MyPlanBbsController {
	
	@Autowired
	MyPlanBbsServiceImpl svc;
	
	private static final Logger logger = LoggerFactory.getLogger(MyPlanBbsController.class);

	@RequestMapping(value = "/", method = {RequestMethod.GET,RequestMethod.POST})
	public String home(Locale locale, Model model, HttpServletRequest req,HttpSession session) {
		logger.info("Welcome home! The client locale is {}.", locale);
		return getArticleList(locale,model,req,session);
	}
	@RequestMapping(value = "/list", method = {RequestMethod.GET,RequestMethod.POST})
	public String getArticleList(Locale locale, Model model, HttpServletRequest req
								, HttpSession session) {
		logger.info("Welcome home! The client locale is {asdf}.", locale);
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		/* 아래 세 줄 설명 : '총 게시물 수'를 구하고  
		 * params에 넣어서 PagingHelper를 이용하면 
		 * params안에 페이징 관련 데이터가 추가 됩니다.*/
		//총 게시물 수 
		
		if(session.getAttribute("loginSeq") != null){
			params.put("memSeq", session.getAttribute("loginSeq"));
			params.put("hmAtcN", 9);
			int ttAtcCnt = svc.getTotalArticleCnt(params);
			params.put("ttAtcCnt", ttAtcCnt);
			svc.getPagingHelper(params);		
			
			System.out.println("////////123123//"+params.get("searchWord")+params.get("nowPgPgN")+"gettotal"+ttAtcCnt+"/////"+params.put("memSeq", session.getAttribute("loginSeq")));
			
			//게시물 리스트를 모델에 담기
			model.addAttribute("ArticleList", svc.getArticleList(params));
			model.addAttribute("ph", svc.getPagingHelper(params));
			
			return "bbs/myplan/list";
		}else{
			return "/login";
		}
	   }
	@RequestMapping(value="/del",method={RequestMethod.GET, RequestMethod.POST})
	public  String del(Locale locale, Model model, HttpServletRequest req,HttpSession session){
		logger.info("Welcome home! The client locale is {del}.", locale);
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		svc.del(params); 
		model.addAttribute("del",params);
		System.out.println(params);
		
		return getArticleList(locale,model,req,session);
		}
	@RequestMapping(value="/del2",method={RequestMethod.GET, RequestMethod.POST})
	public  String del2(Locale locale, Model model, HttpServletRequest req,HttpSession session){
		logger.info("Welcome home! The client locale is {del2}.", locale);
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		System.out.println("//////////"+params.get("searchWord")+params.get("nowPgPgN"));

		
		String[] a = req.getParameterValues("checked");
		
		if(a==null){
			return getArticleList(locale,model,req,session);
		}else{
			for (int i=0; i<a.length; i++){
				
		}
		}
		svc.del2(params); 
		model.addAttribute("del2",params);
		System.out.println("del2");
		return getArticleList(locale,model,req,session);
		}
	
/*	@RequestMapping(value="/search", method = {RequestMethod.GET,RequestMethod.POST})
	public String search(Locale locale, Model model, HttpServletRequest req,HttpSession session){
		logger.info("Welcome home! The client locale is {search}.", locale);
		
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		model.addAttribute("search",params);
		
		return  getArticleList(locale,model,req,session);
	}*/
	@RequestMapping(value="/adddata", method = {RequestMethod.GET,RequestMethod.POST})
	public String adddata(Locale locale, Model model, HttpServletRequest req){
		logger.info("Welcome home! The client locale is {add}.", locale);
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
	
		
		model.addAttribute("adddata",params);
		return "bbs/plan/content";
	}	
	
	}

	
