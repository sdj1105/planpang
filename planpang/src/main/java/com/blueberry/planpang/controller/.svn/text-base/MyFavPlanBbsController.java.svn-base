package com.blueberry.planpang.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.blueberry.lib.MakeMapParameter;
import com.blueberry.lib.PagingHelper;
import com.blueberry.planpang.service.HomeServiceImpl;
import com.blueberry.planpang.service.MyFavPlanBbsServiceImpl;


/**
 * @FileName 	: MyFavPlanBbsController.java
 * @Project 	: planpang
 * @Date 		: 2015. 4. 13.
 * @프로그램설명 : 즐겨찾기 컨트롤 Event 정보  
 */

@Controller
@RequestMapping(value = "/bbs/myfavplan")
public class MyFavPlanBbsController {
	
	@Autowired
	MyFavPlanBbsServiceImpl svc;
	
	@Autowired
	HomeServiceImpl homeSvc;
	
	private static final Logger logger = LoggerFactory.getLogger(MyFavPlanBbsController.class);

	/**
	 * @Method Name  : home
	 * @작성일   : 2015. 4. 13. 
	 * @작성자   : c402-10
	 * @변경이력  : 
	 * @Method 설명 : 처음 생성시 만들어지는 home, list로 값을 리턴한다
	 * @param locale
	 * @param model
	 * @param req
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, HttpServletRequest req,HttpSession session) {
		logger.info("Welcome home! The client locale is {}.", locale);
		return getArticleList(locale, model, req, session);
	}

	
	
	/**
	 * @Method Name  : getArticleList
	 * @작성일   : 2015. 4. 13. 
	 * @작성자   : c402-10
	 * @변경이력  :
	 * @Method 설명 : 즐겨찾기 목록을 출력해주는 코드
	 * @param locale
	 * @param model
	 * @param req
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/list", method = {RequestMethod.GET, RequestMethod.POST})
	public String getArticleList(Locale locale, Model model, HttpServletRequest req,
								HttpSession session) {
		logger.info("Welcome home! The client locale is {}.", locale);
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		/* 아래 세 줄 설명 : '총 게시물 수'를 구하고  
		 * params에 넣어서 PagingHelper를 이용하면 
		 * params안에 페이징 관련 데이터가 추가 됩니다.*/
		//총 게시물 수 
		
//		Integer.toString(ttAtcCnt)
//		session.getAttribute("loginSeq");
		if(session.getAttribute("loginSeq") != null){
			
			params.put("hmAtcN", 9);
//			req.setAttribute("memSeq", session.getAttribute("loginSeq"));
			
			params.put("searchWord", req.getParameter("searchWord"));
			params.put("memSeq", session.getAttribute("loginSeq"));
			int ttAtcCnt = svc.getTotalArticleCnt(params);
			
			 
			// 총게시물수구하기
			params.put("ttAtcCnt", ttAtcCnt);
			svc.getPagingHelper(params);		
			
			/*model.addAttribute("commentNum", svc.getCommentNum(params));*/
			//페이징 모델에 담기
			PagingHelper pagingHelper = new PagingHelper();
			model.addAttribute("ph", svc.getPagingHelper(params));
			
			//게시물 리스트를 모델에 담기	
			model.addAttribute("atcList", svc.getArticleList(params));
			
			
			return "bbs/myfavplan/list";
			
		}else{
			return "/login";
		}		
		
		

////////////////////////// test code ///////////////////////////////////
		//		String searchWord = req.getParameter("searchWord");
		
//		String aa = null;
//		try {
//			 aa = URLEncoder.encode(req.getParameter("searchWord"), "UTF-8");
//		} catch (UnsupportedEncodingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		req.getParameter("searchWord")
		
//		params.put("searchWord",aa);
		
	}
	
	
	/**
	 * @Method Name  : updatetitle
	 * @작성일   : 2015. 4. 13. 
	 * @작성자   : c402-10
	 * @변경이력  :
	 * @Method 설명 : 즐겨찾기 목록에서, 제목을 수정하는 Event
	 * @param locale
	 * @param model
	 * @param req
	 * @param resp
	 */
	@RequestMapping(value = "/updatetitle", method = {RequestMethod.GET, RequestMethod.POST})
	public void updatetitle(Locale locale, Model model
			,	HttpServletRequest req
			,	HttpServletResponse resp) {
		logger.info("Welcome updatetitle! The client locale is {}.", locale);

		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		//타이틀 업데이트
		svc.updateTitle(params);
		
		//셀렉트 해서 뿌려 줄 때 씀.
		JSONObject ja = new JSONObject();
		ja.put("data", params);		
		resp.setContentType("text/html; charset-UTF-8");
		PrintWriter out;

		try {
			out = resp.getWriter();
			out.print(ja.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	
	/**
	 * @Method Name  : deleteCheck
	 * @작성일   : 2015. 4. 13. 
	 * @작성자   : c402-10
	 * @변경이력  :
	 * @Method 설명 : 즐겨찾기 목록에서 게시글 1개 & 여러 다수의 글들을 <선택> 삭제할떄 사용
	 * @param model
	 * @param req
	 * @param resp
	 * @return
	 */
	@RequestMapping(value="/deletecheck", method = {RequestMethod.GET, RequestMethod.POST})
	public String deleteCheck(Model model, HttpServletRequest req, HttpServletResponse resp){
		
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		// 체크한 chk 값을 갖고와서 chkNumbers 변수에 담음
		String[] chkNumbers = req.getParameterValues("chk") ;
		
		// 체크값chkNumbers를 삭제될 데이터 1개씩에 업데이트후 반복
		for (String chkNum : chkNumbers) {
			svc.deleteCheck(chkNum);
		}
		
		
//////////////////////////test code ///////////////////////////////////
/*		//삭제될 데이터 json 처리
		JSONObject ja = new JSONObject();
		ja.put("data", params);
		resp.setContentType("text/html; charset-UTF-8");
		PrintWriter out;
		try {
			out = resp.getWriter();
			out.print(ja.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		*/
		
		return "redirect:/bbs/myfavplan/";
	}
	

	/**
	 * @Method Name  : loginCheck
	 * @작성일   : 2015. 4. 13. 
	 * @작성자   : c402-10
	 * @변경이력  :
	 * @Method 설명 : 메뉴에서 즐겨찾기 클릭시 아이디값을 확인하여
	 *                아이디 값이 있으면 -> <즐겨찾기 목록>
	 *                아이디 값이 없으면 -> 로그인
	 * @param model
	 * @param req
	 * @param locale
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/logincheck")
	public String loginCheck(Model model, HttpServletRequest req, Object locale, HttpSession session){
		logger.info("Welcome home! The client locale is {add}.", locale);
		
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		
		session.getAttribute("loginSeq");
		
		// 세션에 로그인 값이 있으면 -> myfavplan
		if(session.getAttribute("loginSeq") != null){
			
			req.setAttribute("memSeq", session.getAttribute("loginSeq"));
			return "bbs/myfavplan";
		
		// 세션에 로그인 값이 없으면 -> 로그인창
		}else{
			return "/login";
		}
		
		
	}
	
	/**
	 * @Method Name  : myFavPlnaDelete
	 * @작성일   : 2015. 4. 13. 
	 * @작성자   : c402-10
	 * @변경이력  :
	 * @Method 설명 : 목록에서 글을 삭제시 이메소드를 사용함
	 * @param model
	 * @param req
	 * @param locale
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/delete", method = {RequestMethod.GET, RequestMethod.POST})
	public String myFavPlnaDelete(Model model, HttpServletRequest req, Object locale, HttpSession session){
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.myFavPlanDelete(params);
		
		// 목록으로 리턴
		return  "redirect:/bbs/myfavplan/";
		
	}
}






