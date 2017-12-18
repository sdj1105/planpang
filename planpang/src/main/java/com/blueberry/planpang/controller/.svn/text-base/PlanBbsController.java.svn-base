package com.blueberry.planpang.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.blueberry.lib.JSONHelper;
import com.blueberry.lib.MakeMapParameter;
import com.blueberry.planpang.service.PlanBbsServiceImpl;

/**
 * project name: planpang
 * @author 	   :배진용
 * 공유 게시판
 */
@Controller
@RequestMapping(value = "/bbs/plan")
public class PlanBbsController {
	
	@Autowired
	PlanBbsServiceImpl planServiceImpl;
	
	private static final Logger logger = LoggerFactory.getLogger(PlanBbsController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, HttpServletRequest req,HttpSession session) {
		logger.info("Welcome home! The client locale is {}.", locale);
		return list(locale,model,req,session);	//임시로 바로 이동
	}
	
	/**
	 * planpang
	 * 배진용
	 * 공유 게시판 리스트화면
	 * @return:list.jsp
	 */
	@RequestMapping(value = "/list", method = {RequestMethod.GET, RequestMethod.POST})
	public String list(Locale locale, Model model, HttpServletRequest req,HttpSession session) {
		logger.info("Welcome home! The client locale is {}.", locale);		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		/* 아래 세 줄 설명 : '총 게시물 수'를 구하고  
		 * params에 넣어서 PagingHelper를 이용하면 
		 * params안에 페이징 관련 데이터가 추가 됩니다.*/
		if(session.getAttribute("isLogined") == null){
			session.setAttribute("isLogined", false);
		}
		//총 게시물 수 
		int ttAtcCnt = planServiceImpl.getTotalArticleCnt(params);
		params.put("ttAtcCnt", ttAtcCnt);
		params.put("memSeq", session.getAttribute("loginSeq"));
		
		//한페이지에 게시물 9개만 나오게함
		params.put("hmAtcN", 9);
		
		
		model.addAttribute("memSeq",session.getAttribute("loginSeq"));
		//페이징 모델에 담기
		model.addAttribute("ph",planServiceImpl.getPagingHelper(params) );
		
		ArrayList<HashMap<String, Object>> atcList = planServiceImpl.getArticleList(params);
		
		System.out.println("*************"+ttAtcCnt);
		//게시물 리스트를 모델에 담기
		model.addAttribute("atcList",atcList);
		
		return "bbs/plan/list";
	}
	
	@RequestMapping(value = "/getbestlike", method = {RequestMethod.GET, RequestMethod.POST})	
	 public void getBestLike(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp){
		logger.info("Welcome getBestLike The client locale is {}.", locale);		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		//리스트 마우스 오버 할 경우 댓글 좋아요 많은 3개를 랜덤으로 리스트에 뿌려줌 아직 구현 안됨 
		new JSONHelper(resp, planServiceImpl.getBestLike(params));
	 }
	
	/**
	 * planpang
	 * 배진용
	 * 공유 게시판 상세화면
	 * @params:${planSeq} 게시판 순번
	 * @return:list.jsp
	 */
	@RequestMapping(value = "/content", method = RequestMethod.GET)
	public String content(Locale locale, Model model, HttpServletRequest req
						  ,HttpServletResponse resp ,HttpSession session){
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		planServiceImpl.updateArticleHit(params);
		
		model.addAttribute("memberId",session.getAttribute("loginId"));
		model.addAttribute("searchWord",params.get("searchWord"));
		model.addAttribute("loginSeq",session.getAttribute("loginSeq"));
		model.addAttribute("planSeq",params.get("planSeq"));
		model.addAttribute("atc", planServiceImpl.getArticle(params));
		
		// 댓글과 댓글의 댓글 구현 
		ArrayList<HashMap<String, Object>> cmtList = planServiceImpl.getCommentList(params);	
		for (int i=0; i<cmtList.size(); i++){	
			params.put("commentSeq", String.valueOf(cmtList.get(i).get("COMMENTSEQ")));
			cmtList.get(i).put("cmtcmt", planServiceImpl.getCmtCmtList(params));						
		}
		model.addAttribute("comentList",cmtList);
		
		return "bbs/plan/content";
		
	}
	
	/**
	 * planpang
	 * 배진용
	 * 여행 등록
	 * @return : writepalnfrom.jsp
	 */
	@RequestMapping(value = "/writepaln", method = {RequestMethod.GET,RequestMethod.POST})
	public String writepaln(Locale locale, Model model, HttpServletRequest req){
		
		model.addAttribute("memSeq",req.getParameter("memSeq"));
		return "bbs/plan/writepalnfrom";
	}
	
	@RequestMapping(value = "insertatc", method = {RequestMethod.GET,RequestMethod.POST})
	public String insertAtc(Locale locale, Model model, HttpServletRequest req
							,HttpSession session) throws IOException{
		
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		
		params.put("memSeq", session.getAttribute("loginSeq"));
	
	//	파일 업로드 
		MultipartHttpServletRequest multi = (MultipartHttpServletRequest) req;
        MultipartFile file = multi.getFile("planPhoto");
        
        // 날짜 생성
        java.util.Date currentDate = new java.util.Date();  
        java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyyMMddHHmmss_");
        String dateString = format.format(currentDate);
        
        System.out.println(session.getServletContext().getRealPath("/"));
        
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
                    //파일이 저장된경로 + 파일 명
                    organizedfilePath = uploadPath + dateString + params.get("memSeq") + "_" + file.getOriginalFilename();
                    
                    editFileName = dateString + params.get("memSeq") + "_" + file.getOriginalFilename();
                    System.out.println("수정된 파일명 : "+editFileName);
                    
                    outputStream = new FileOutputStream(organizedfilePath);
                    params.put("planPhoto", editFileName);
                    
                    int readByte = 0;
                    byte[] buffer = new byte[8192];
   
                    while ((readByte = inputStream.read(buffer, 0, 8120)) != -1) {
                        outputStream.write(buffer, 0, readByte); //파일 생성 ! 
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
            	if(outputStream != null){
            		outputStream.close();
            	}
            	if(inputStream != null){
            		inputStream.close();
            	}
            }
                   
        }
    // 파일 업로드 끝   
        
		planServiceImpl.insertArticle(params);	
		model.addAttribute("planSeq",planServiceImpl.getLatestPlanSeq(params));
		
		return "redirect:/bbs/planwriter/";
	}
	
	
	/**
	 * planpang
	 * 배진용
	 * 여행상세일정 등록
	 * @return : list.jsp
	 */
	@RequestMapping(value = "insertatcdetail", method = {RequestMethod.GET,RequestMethod.POST})
	public String insertatcDetail(Locale locale, Model model, HttpServletRequest req,HttpSession session){
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		planServiceImpl.inserArtDetail(params);
		return list(locale,model,req,session);
	}
	
	/**
	 * planpang
	 * 배진용
	 * @return : edit.jsp
	 */
	@RequestMapping(value = "editatc", method = {RequestMethod.GET,RequestMethod.POST})
	public String editAtc(Locale locale, Model model, HttpServletRequest req){
//		edit폼으로 content의 값들을 보냄
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		
		HashMap<String, Object> oneList =  planServiceImpl.getArticle(params);
		
		model.addAttribute("planSeq",req.getParameter("planSeq"));
		model.addAttribute("memSeq",req.getParameter("memSeq"));	
		model.addAttribute("oneList",oneList);
		
		return "bbs/plan/edit";
	}
	
	/**
	 * planpang
	 * 배진용	
	 * 여행일정 수정
	 * @return : list.jsp
	 */
	@RequestMapping(value = "planupdate", method = {RequestMethod.GET,RequestMethod.POST})
	public String planUpdate(Locale locale, Model model, HttpServletRequest req,HttpSession session){
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		planServiceImpl.planUpdate(params);
		return list( locale,  model,  req,session);
	}
	
	/**
	 * planpang
	 * 배진용
	 * 여행상제일정 수정
	 * @return :list.jsp
	 */
	@RequestMapping(value = "updateatc", method = {RequestMethod.GET,RequestMethod.POST})
	public String updateAtc(Locale locale, Model model, HttpServletRequest req,HttpSession session){
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		
		planServiceImpl.updateArticle(params);
		
		return list( locale,  model,  req,session);	
	}
	
	
	/**
	 * planpang
	 * 배진용
	 * 여행일정 삭제
	 * @return
	 */
	@RequestMapping(value = "deleteatc", method = {RequestMethod.GET,RequestMethod.POST})
	public String deleteAtc(Locale locale, Model model, HttpServletRequest req,
							HttpSession session,HttpServletResponse resp){		
		HashMap<String, Object> params = new HashMap<String, Object>();		
		params.put("planSeq", req.getParameter("planSeq"));
		
		planServiceImpl.deleteArticle(params);
		
		return list(locale, model, req, session);
	}
	
	
	/**
	 * planpang
	 * 배진용
	 * 게시물 좋아요
	 * @return: ajax
	 */
	@RequestMapping(value = "like", method = {RequestMethod.GET,RequestMethod.POST})
	public void likeAtc(Locale locale, Model model, HttpServletRequest req
						  , HttpServletResponse resp , HttpSession session){
		
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		params.put("memSeq", session.getAttribute("loginSeq"));
		
		
		
		int chkLikeArticle = planServiceImpl.chkLikeArticle(params);
		int chkAlret =0;

		if(chkLikeArticle==0 && session.getAttribute("loginSeq")!=null){
			chkAlret=0;
			planServiceImpl.insertIdLikeArticle(params);
			planServiceImpl.likeArticle(params);
		}else if(chkLikeArticle ==1){
			chkAlret=1;
		}else if(session.getAttribute("loginSeq")==null){
			chkAlret=2;
		}
		
		//셀렉트 해서 뿌려 줄 때 씀.
		JSONObject ja = new JSONObject();
		ja.put("chkLikeAlret", chkAlret);		
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
	 * planpang
	 * 배진용
	 * 댓글 리스트
	 * @return :comment.jsp
	 */
	@RequestMapping(value = "comment", method = {RequestMethod.GET,RequestMethod.POST})
	public String comment(Locale locale, Model model, HttpServletRequest req
						, HttpSession session){
		
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		
		model.addAttribute("memberId",session.getAttribute("loginId"));
		model.addAttribute("loginSeq",session.getAttribute("loginSeq"));
		model.addAttribute("planSeq",params.get("planSeq"));
		
		
		return "bbs/plan/comment";
	}
	
	
	/**
	 * planpang
	 * 배진용
	 * 댓글등록
	 * @return : ajax
	 */
	@RequestMapping(value = "commentinsert", method = {RequestMethod.GET,RequestMethod.POST})
	public void commentInsert(Locale locale
							  ,Model model,HttpSession session
							  ,HttpServletRequest req
							  ,HttpServletResponse resq){
		
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		params.put("memSeq", session.getAttribute("loginSeq"));
	
		planServiceImpl.insertComment(params);
		
		//ajax 셀렉트 해서 뿌려 줄 때 씀.
		JSONObject ja = new JSONObject();
		ja.put("data", params);		
		
		resq.setContentType("text/html; charset-UTF-8");
		PrintWriter out;
		try {
			out = resq.getWriter();
			out.print(ja.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	/**
	 * planpang
	 * 배진용
	 * 댓글수정
	 * @return : ajax
	 */
	@RequestMapping(value ="commentupdate", method = {RequestMethod.GET,RequestMethod.POST})
	public void commentUpdate(Locale locale, Model model
							 ,HttpServletRequest req
							 ,HttpServletResponse resp){
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		
		planServiceImpl.updateComment(params);
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
	 * planpang
	 * 배진용
	 * 댓글삭제
	 * @return : ajax
	 */
	@RequestMapping(value ="commentdelete", method = {RequestMethod.GET,RequestMethod.POST})
	public void commentDelete(Locale locale, Model model
							  ,HttpServletRequest req
							  ,HttpServletResponse resp){
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		
		planServiceImpl.deleteComment(params);
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
	 * planpang
	 * 배진용
	 * 댓글좋아요
	 * @return : ajax
	 */
	@RequestMapping(value ="commentlike", method = {RequestMethod.GET,RequestMethod.POST})
	public void cmtlike(Locale locale, Model model
						,HttpServletRequest req
						,HttpServletResponse resp
						, HttpSession session){
		
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		params.put("memSeq", session.getAttribute("loginSeq"));
		
	//	댓글 좋아요 중복검사 
		int chkLikeCmt=planServiceImpl.chkLikeComment(params);
		int chkAlret =0;
		if(chkLikeCmt==0){
			chkAlret=0;
			planServiceImpl.insertIdLikeComment(params);
			planServiceImpl.likeComment(params);
		}else{
			chkAlret=1;
		}
		//셀렉트 해서 뿌려 줄 때 씀.
		JSONObject ja = new JSONObject();
		ja.put("chkLikeCmt", chkAlret);		
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
	 * planpang
	 * 배진용
	 * 댓글의댓글 수정
	 * @return : ajax
	 */
	@RequestMapping(value ="cmtcmtupdate", method = {RequestMethod.GET,RequestMethod.POST})
	public void cmtcmtupdate(Locale locale, Model model
							,HttpServletRequest req
							,HttpServletResponse resp){
						
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		
		planServiceImpl.updateCmtCmt(params);
		
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
	 * planpang
	 * 배진용
	 * 댓글의댓글 등록
	 * @return : ajax
	 */
	@RequestMapping(value ="cmtcmtinsert", method = {RequestMethod.GET,RequestMethod.POST})
	public void cmtcmtInsert(Locale locale, Model model
							,HttpServletRequest req
							,HttpServletResponse resp
							,HttpSession session){
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		params.put("memSeq", session.getAttribute("loginSeq"));
		
		planServiceImpl.insertCmtCmt(params);
		
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
	 * planpang
	 * 배진용
	 * 댓글의댓글 삭제
	 * @return : ajax
	 */
	@RequestMapping(value ="cmtcmtdelete", method = {RequestMethod.GET,RequestMethod.POST})
	public void cmtcmtDelete(Locale locale, Model model
							,HttpServletRequest req
							,HttpServletResponse resp){
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		
		planServiceImpl.deleteCmtCmt(params);
		
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
	 * planpang
	 * 배진용
	 * 댓글의댓글 좋아요
	 * @return : ajax
	 */
	@RequestMapping(value ="cmtcmtlike", method = {RequestMethod.GET,RequestMethod.POST})
	public void cmtcmtlike(Locale locale, Model model
						   ,HttpServletRequest req
						   ,HttpServletResponse resp
						   , HttpSession session){
		
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		params.put("memSeq", session.getAttribute("loginSeq"));
		
	//	댓글의 댓글 좋아요 중복 검사
		int chkLikeCmtCmt=planServiceImpl.chkLikeCmtCmt(params);
		int chkAlret =0;
		if(chkLikeCmtCmt==0){
			chkAlret=0;
			planServiceImpl.insertIdLikeCmtCmt(params);
			planServiceImpl.likeCmtCmt(params);
		}else{
			chkAlret=1;
		}
		//셀렉트 해서 뿌려 줄 때 씀.
		JSONObject ja = new JSONObject();
		ja.put("chkLikeCmtCmt", chkAlret);		
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
	 * planpang
	 * 배진용
	 * 나의 즐겨찾기 추가 
	 * @return: list.jsp
	 * @throws IOException
	 */
	@RequestMapping(value ="insertmyfav", method = {RequestMethod.GET,RequestMethod.POST})
	public String insertMyFavPlan( Locale locale, Model model
							   , HttpServletRequest req
							   , HttpServletResponse resp
							   , HttpSession session) throws IOException{
		
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);	
		params.put("memSeq",session.getAttribute("loginSeq"));
		params.put("planSeq",req.getParameter("planSeq"));
		
		int chkMyFavPlan=planServiceImpl.chkMyFavPlan(params);
		
		//즐겨찾기 중복 검사및 alret을 띄워 제목을 바로 수정할수있게 함 
		if(chkMyFavPlan==0){
			planServiceImpl.insertMyFavPlan(params);
		}else if(chkMyFavPlan>=1){
			     resp.setCharacterEncoding("UTF-8");
			     PrintWriter writer = resp.getWriter();
			     writer.println("<script type='text/javascript'>");
			     writer.println("alert('즐겨찾기가 이미 추가되었습니다');");
			     writer.println("history.back();");
			     writer.println("</script>");
			     writer.flush();
		}
		
		return list(locale, model, req, session);
	}

}





