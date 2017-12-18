package com.blueberry.planpang.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.blueberry.lib.MakeMapParameter;
import com.blueberry.planpang.service.HomeServiceImpl;
import com.blueberry.planpang.service.PlanBbsServiceImpl;

/**
 * @FileName  : HomeController.java
 * @Project   : planpang
 * @Date      : 2015. 4. 13. 
 * @작성자      : 구지연
 * @프로그램 설명     : 홈/관리자화면 및 로그인/회원가입처리 Controller
 */
@Controller
@RequestMapping(value = "/")
public class HomeController {
	
	@Autowired
	HomeServiceImpl svc;
	
	@Autowired
	PlanBbsServiceImpl planSvc;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model
			, 	HttpServletRequest req
			,	HttpSession session) {
		
		return "home";
	}
	
	/**
	 * @Method Name  : login
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 자체 사이트 로그인
	 * 파라미터 		 : @param model, @param req, @param session
	 * 파라미터 		 : @return
	 */
	@RequestMapping(value = "/login", method = {RequestMethod.GET, RequestMethod.POST})
	public String login(Model model, HttpServletRequest req
				,	HttpSession session) {
		// SPRING SECURITY가 처리함
		session.setAttribute("isLogined", true);
		return "login";
	}
	
	/**
	 * @Method Name  : accesssDenied
	 * @작성일         : 2015. 4. 17. 
	 * @작성자         : 구지연
	 * @Method 설명         : 게스트 및 일반회원 접근 거부
	 * 파라미터 		 : @param model, @param req, @param session
	 * 파라미터 		 : @return
	 * 파라미터 		 : @throws Exception
	 */
	@RequestMapping(value = "/403", method = {RequestMethod.GET, RequestMethod.POST})
	public String accesssDenied(Model model, HttpServletRequest req
			,	HttpSession session) throws Exception {
		// security-context.xml에서 설정함.
		
		// 로그인 정보
		accesssPermit(model, session, req);
				
		return "403";
	}

	/**
	 * @Method Name  : main
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 메인화면
	 * 파라미터 		 : @param model, @param session, @param req, @param resp
	 * 파라미터 		 : @return
	 * 파라미터 		 : @throws Exception
	 */
	@RequestMapping(value = "/main", method = {RequestMethod.GET, RequestMethod.POST})
	public String main(Model model, HttpSession session
			, HttpServletRequest req, HttpServletResponse resp) throws Exception {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		// 로그인 정보
		accesssPermit(model, session, req);
		
		// 세션에 방문자수 담기
		sessionCount(model, session, req);
		
		//게시물 리스트를 모델에 담기
		model.addAttribute("bestList",svc.getBestList(params));
		
		return "main";
	}
	
	/**
	 * @Method Name  : accesssPermit
	 * @작성일         : 2015. 4. 17. 
	 * @작성자         : 구지연
	 * @Method 설명         : 정상로그인 후 정보 가지고오기
	 * 파라미터 		 : @param model, @param session, @param req
	 * 파라미터 		 : @throws Exception
	 */
	public void accesssPermit(Model model, HttpSession session
			, HttpServletRequest req) throws Exception {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
				
		// 로그인시 SPRING SECURITY가 가지고 온 권한
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		// 로그인처리를 위한 변수
		boolean isLogin = false;
		
		//페북 로그인
		if(params.get("accessToken") != null){
			
			session.setAttribute("loginName", (URLDecoder.decode((String) params.get("fbName"),"UTF-8")));
			session.setAttribute("fbName", (URLDecoder.decode((String) params.get("fbName"),"UTF-8")));
			session.setAttribute("loginId", params.get("memberId"));

			// 로그인된 회원의 MEMBERSEQ얻기
			svc.getMemberSeq(params);
			session.setAttribute("loginSeq", svc.getMemberSeq(params));
			// 로그인된 회원의 접속시간 업데이트
			svc.updateConnectDt(params);
			
			isLogin = true;
			session.setAttribute("ppRole", "USER_ROLE");
			
		// 자체 로그인
		// 익명의 토큰이 아닐 경우
		}else if(!(auth instanceof AnonymousAuthenticationToken)){
			// 로그인된 유저의 권한을 가지고 온다 (ROLE_ADMIN OR ROLE_USER)
			UserDetails userDetail = (UserDetails) auth.getPrincipal();			
			session.setAttribute("loginId", userDetail.getUsername());
			params.put("memberId", userDetail.getUsername());
			
			// 로그인된 회원의 MEMBERSEQ얻기
			svc.getMemberSeq(params);
			session.setAttribute("loginSeq", svc.getMemberSeq(params));
			System.out.println("로그인시퀀스 구햇니니니니니"+svc.getMemberSeq(params));
			// 로그인된 회원의 접속시간 업데이트
			svc.updateConnectDt(params);
			isLogin = true;
			
			// 자체 로그인시 유저와 관리자 권한 분리하기
			if(userDetail.getAuthorities().toString().indexOf("ROLE_ADMIN") != -1){
				session.setAttribute("ppRole", "ROLE_ADMIN");
			}
			else if (userDetail.getAuthorities().toString().indexOf("ROLE_USER") != -1){
				session.setAttribute("ppRole", "ROLE_USER");
			} 
		}
		
		if(isLogin == true){
			session.setAttribute("isLogined", true);
		}else{
			session.setAttribute("isLogined", false);
		}
	}
	
	/**
	 * @Method Name  : sessionCount
	 * @작성일         : 2015. 4. 17. 
	 * @작성자         : 구지연
	 * @Method 설명         : 세션에 방문자수 담기
	 * 파라미터 		 : @param model, @param session, @param req
	 * 파라미터 		 : @throws Exception
	 */
	public void sessionCount(Model model, HttpSession session
			, HttpServletRequest req) throws Exception {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		 // 클라이언트 ip 받아오기
		 req = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		 
		 // 프록시 타고 왔을때 IP 받아오기
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
	
	/**
	 * @Method Name  : joinForm
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 회원가입 폼으로 연결
	 * 파라미터 		 : @param model, @param req
	 * 파라미터 		 : @return
	 */
	@RequestMapping(value = "/joinform", method = {RequestMethod.GET, RequestMethod.POST})
	public String joinForm(Model model, HttpServletRequest req) {
		return "join/join";
	}
	
	/**
	 * @Method Name  : join
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 회원가입 처리
	 * 파라미터 		 : @param model, @param req, @param session
	 * 파라미터 		 : @return
	 * 파라미터 		 : @throws IOException
	 */
	@RequestMapping(value = "/join", method = {RequestMethod.GET, RequestMethod.POST})
	public String join(Locale locale, Model model
				, HttpServletRequest req
				, HttpSession session) throws IOException {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) req;
        MultipartFile file = multi.getFile("memPhoto");//jsp 페이지에서 input type="file"의 파라미터명
        
        // 날짜 생성
        java.util.Date currentDate = new java.util.Date();  
        java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyyMMddHHmmss_");
        String dateString = format.format(currentDate);
        System.out.println(dateString);

        
        if(file!=null){
        	
        	String rootPath = session.getServletContext().getRealPath("/");
            //실제 디플로이되는 폴더의 root path를 따온다
        	String uploadPath = rootPath+"resources/upload/";
     
            System.out.println("UPLOAD_PATH : "+uploadPath);
            System.out.println("파일크기" + file.getSize());
            System.out.println("파일 존재" + file.isEmpty());
            System.out.println("오리지날 파일 이름" + file.getOriginalFilename());
          
            InputStream inputStream = null;
            OutputStream outputStream = null;
            
            String organizedfilePath="";
            String editFileName="";
            
            try {
                if (file.getSize() > 0) {
                    inputStream = file.getInputStream();
                    File realUploadDir = new File(uploadPath);
                    
                    if (!realUploadDir.exists()) {//업로드하려는 path에 폴더가 없을경우
                        realUploadDir.mkdirs();//폴더생성.
                    }
                    
                    organizedfilePath = uploadPath +dateString + params.get("memberId") + "_" + file.getOriginalFilename();
                    System.out.println(organizedfilePath);//파일이 저장된경로 + 파일 명
                    
                    editFileName = dateString + (String) params.get("memberId") + "_" + file.getOriginalFilename();
                    System.out.println(editFileName);
                    
                    outputStream = new FileOutputStream(organizedfilePath);
                    params.put("memPhoto", editFileName);
                    
                    int readByte = 0;
                    byte[] buffer = new byte[8192];
   
                    while ((readByte = inputStream.read(buffer, 0, 8120)) != -1) {
                        outputStream.write(buffer, 0, readByte); //파일 생성 ! 
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
   
            } finally {
                outputStream.close();
                inputStream.close();
            }
           }    
		
		svc.insertMember(params);
		svc.giveRoleUser(params);
		
		return login(model, req, session);
	}
	
	/**
	 * @Method Name  : fblogin
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 페이스북 로그인
	 * 파라미터 		 : @param model, @param session, @param req, @param resp
	 */
	@RequestMapping(value = "/fblogin", method = {RequestMethod.GET, RequestMethod.POST})
	public void fblogin(Model model
			,	HttpSession session
			,	HttpServletRequest req
			,	HttpServletResponse resp) {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		if( svc.chkMember(params) != 0){
		}
		else if (svc.chkMember(params) == 0){
			svc.insertFbMember(params);
			svc.giveRoleUser(params);
		}
		
		//셀렉트 해서 뿌려 줄 때 씀.
		JSONObject ja = new JSONObject();
		ja.put("chkCount", svc.chkMember(params));		
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
	 * @Method Name  : logout
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 로그아웃
	 * 파라미터 		 : @param model, @param session, @param req, @param resp
	 * 파라미터 		 : @return
	 * 파라미터 		 : @throws Exception
	 */
	@RequestMapping(value = "/logout", method = {RequestMethod.GET, RequestMethod.POST})
	public String logout(Model model
			,	HttpSession session
			,	HttpServletRequest req
			,	HttpServletResponse resp) throws Exception {
		
		session.setAttribute("isLogined", false);		
		session.removeAttribute("ppRole");
		session.removeAttribute("fbName");
		session.removeAttribute("loginName");
		session.removeAttribute("loginId");
		session.removeAttribute("loginSeq");
		
		return main(model, session, req, resp);
	}
	
	/**
	 * @Method Name  : chkId
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 아이디 중복 체크
	 * 파라미터 		 : @param model, @param req, @param resp
	 */
	@RequestMapping(value = "/chkid", method = {RequestMethod.GET, RequestMethod.POST})
	public void chkId(Model model
			,	HttpServletRequest req
			,	HttpServletResponse resp) {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		//셀렉트 해서 뿌려 줄 때 씀.
		JSONObject ja = new JSONObject();
		ja.put("chkCount", svc.chkMember(params));
		
		resp.setContentType("text/html; charset-UTF-8");
		PrintWriter out;
		try {
			out = resp.getWriter();
			out.print(ja.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/*************************** 관리자 홈 관련 컨트롤러 ***************************/
	/**
	 * @Method Name  : adminmain
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 관리자 홈
	 * 파라미터 		 : @param session, @param model, @param req
	 * 파라미터 		 : @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/adminmain", method = {RequestMethod.GET, RequestMethod.POST})
	public String adminmain(HttpSession session, Model model, HttpServletRequest req) throws Exception {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		// 로그인 정보 
		accesssPermit(model, session, req);
		
		params.put("delyn", "N");
		params.put("unregyn", "N");
		
		//게시물 리스트를 모델에 담기
		model.addAttribute("totalMem", svc.getTotalMem(params));
		model.addAttribute("totalPlan", svc.getTotalPlan(params));
		model.addAttribute("totalComments", svc.getTotalComments());
		model.addAttribute("latestWeekJoin", svc.getLatestWeekJoin());
		model.addAttribute("latestWeekPlan", svc.getLatestWeekPlan());
		model.addAttribute("latestWeekVisit", svc.getLatestWeekVisit());
		
		return "adminmain";
	}
	
	/**
	 * @Method Name  : editRole
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 회원 권한 및 탈퇴 관리
	 * 파라미터 		 : @param model,@param req,@param resp
	 * 파라미터 		 : @return
	 */
	@RequestMapping(value = "/editMember", method = {RequestMethod.GET, RequestMethod.POST})
	public String editRole(Model model
			,	HttpServletRequest req
			,	HttpServletResponse resp) {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		String[] checkedMem = req.getParameterValues("memchk") ;
		
		if(params.get("btnValue").equals("권한변경")){
			for (String memberId : checkedMem) {
				params.put("memberId", memberId);
				svc.editRole(params);
			}
		}else if(params.get("btnValue").equals("회원복구")){
			params.put("unregyn", "N");
			for (String memberId : checkedMem) {
				params.put("memberId", memberId);
				svc.editUnregMember(params);
			}
		}else if(params.get("btnValue").equals("강제탈퇴")){
			params.put("unregyn", "Y");
			for (String memberId : checkedMem) {
				params.put("memberId", memberId);
				svc.editUnregMember(params);
			}
		}
		return "redirect:/adminmember";
	}
	
	/**
	 * @Method Name  : adminmember
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 회원관리 페이지
	 * 파라미터 		 : @param session,@param model,@param req
	 * 파라미터 		 : @return
	 */
	@RequestMapping(value = "/adminmember", method = {RequestMethod.GET, RequestMethod.POST})
	public String adminmember(HttpSession session, Model model, HttpServletRequest req) {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);

		// select 박스 선택을 위한 함수
		if(req.getParameter("unregyn") == null || req.getParameter("unregyn") == ""){
			params.put("unregyn", "N");
			model.addAttribute("selOption","N");
		}else if(params.get("unregyn").equals("Y")){
			model.addAttribute("selOption","Y");
		}
		
		//총 게시물 수 
		int ttAtcCnt = svc.getTotalMem(params);
		params.put("ttAtcCnt", ttAtcCnt);

		//페이징 모델에 담기
		model.addAttribute("ph",planSvc.getPagingHelper(params) );
				
		//게시물 리스트를 모델에 담기
		model.addAttribute("totalMem", svc.getTotalMem(params));
		model.addAttribute("memberInfo", svc.getMemberInfo(params));
		
		return "adminmember";
	}
	
	/**
	 * @Method Name  : adminplan
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 게시글 관리 페이지
	 * 파라미터 		 : @param session, @param model, @param req, @param resp
	 * 파라미터 		 : @return
	 */
	@RequestMapping(value = "/adminplan", method = {RequestMethod.GET, RequestMethod.POST})
	public String adminplan(HttpSession session, Model model, HttpServletRequest req) {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		// select 박스 선택을 위한 함수
		if(req.getParameter("delyn") == null || req.getParameter("delyn") == ""){
			params.put("delyn", "N");
			model.addAttribute("selOption","N");
		}else if(params.get("delyn").equals("Y")){
			params.put("delyn", "Y");
			model.addAttribute("selOption","Y");
		}
		
		//총 게시물 수 
		int ttAtcCnt = svc.getTotalPlan(params);
		params.put("ttAtcCnt", ttAtcCnt);
		
		//페이징 모델에 담기
		model.addAttribute("ph",planSvc.getPagingHelper(params) );
		
		//게시물 리스트를 모델에 담기
		model.addAttribute("totalPlan", svc.getTotalPlan(params));
		model.addAttribute("planInfo", svc.getPlanInfo(params));
		
		return "adminplan";
	}
	
	/**
	 * @Method Name  : editPlan
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 게시글 삭제 관리
	 * 파라미터 		 : @param model, @param req, @param resp
	 * 파라미터 		 : @return
	 */
	@RequestMapping(value = "/editPlan", method = {RequestMethod.GET, RequestMethod.POST})
	public String editPlan(Model model
			,	HttpServletRequest req
			,	HttpServletResponse resp) {
		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		String[] checkedPlan = req.getParameterValues("planchk") ;
		
		if(params.get("btnValue").equals("삭제")){
			System.out.println("삭제하러 들어옴!!!!!!!!!!!!!!!!!");
			params.put("delyn", "Y");
			for (String planSeq : checkedPlan) {
				params.put("planSeq", planSeq);
				svc.editDelPlan(params);
			}
		}else if(params.get("btnValue").equals("복구")) {
			params.put("delyn", "N");
			for (String planSeq : checkedPlan) {
				params.put("planSeq", planSeq);
				svc.editDelPlan(params);
			}
		}

		return "redirect:/adminplan";
	}
	
	/**
	 * @Method Name  : downloadExcel
	 * @작성일         : 2015. 4. 13. 
	 * @작성자         : 구지연
	 * @Method 설명         : 엑셀로 회원목록 다운로드 컨트롤러 
	 * 파라미터 		 : @return
	 */
	@RequestMapping(value = "/downloadExcel", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView downloadExcel(){
		ArrayList<HashMap<String, Object>> listMember = svc.getAllMember();
		return new ModelAndView ("excelView","listMember",listMember);
	}
}