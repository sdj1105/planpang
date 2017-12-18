package com.blueberry.planpang.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.blueberry.lib.JSONHelper;
import com.blueberry.lib.MakeMapParameter;
import com.blueberry.planpang.service.PlanWriterServiceImpl;

@Controller
@RequestMapping(value = "/bbs/planwriter")
public class PlanWriterController {
	
	@Autowired
	PlanWriterServiceImpl svc;
	
	private static final Logger logger = LoggerFactory.getLogger(PlanWriterController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, HttpServletRequest req) {
		logger.info("Go PlanWriter!");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);		
		
		model.addAttribute("planSeq", params.get("planSeq"));
		return "bbs/writeform/writeplandetailform";
	}
	
	
	
	@RequestMapping(value = "/getarticle", method = {RequestMethod.GET, RequestMethod.POST})
	public void getArticle(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("getrticle!");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, svc.getArticle(params));
	}
	@RequestMapping(value = "/updatearticle", method = {RequestMethod.GET, RequestMethod.POST})
	public void updateArticle(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("updatearticle");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.updateArticle(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	@RequestMapping(value = "/insertarticle", method = {RequestMethod.GET, RequestMethod.POST})
	public void insertArticle(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("insertarticle");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.insertArticle(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	@RequestMapping(value = "/deletearticle", method = {RequestMethod.GET, RequestMethod.POST})
	public void deleteArticle(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("deletearticle");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.deleteArticle(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	
	
	
	
	@RequestMapping(value = "/getarticlephoto", method = {RequestMethod.GET, RequestMethod.POST})
	public void getarticlephoto(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("getarticlephoto");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, svc.getArticlePhoto(params));
	}
	
	@RequestMapping(value = "/updatearticlephoto", method = {RequestMethod.GET, RequestMethod.POST})
	public void updateArticlePhoto(Locale locale, Model model, HttpServletRequest req
			, HttpServletResponse resp
			, HttpSession session) throws IOException {
		logger.info("updatearticlephoto");	
		System.out.println("/////////////////////ㅁㄴㅇㄹ//////////");
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		
		params.put("memSeq", session.getAttribute("loginSeq"));
		
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
		svc.updateArticlePhoto(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	
	
	
	
	
	
	@RequestMapping(value = "/insertday", method = {RequestMethod.GET, RequestMethod.POST})
	public void insertDay(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("insertday");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.insertDay(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	@RequestMapping(value = "/updateday", method = {RequestMethod.GET, RequestMethod.POST})
	public void updateDay(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("updateday");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.updateDay(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	@RequestMapping(value = "/deleteday", method = {RequestMethod.GET, RequestMethod.POST})
	public void deleteDay(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("deleteday");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.deleteDay(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	
	
	
	
	
	@RequestMapping(value = "/deletepaper", method = {RequestMethod.GET, RequestMethod.POST})
	public void deletePaper(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("deletepaper");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.deletePaper(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	@RequestMapping(value = "/gettimelist", method = {RequestMethod.GET, RequestMethod.POST})
	public void getTimeList(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("getTimeList!");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, svc.getTimeList(params));
	}
	@RequestMapping(value = "/insertonetime", method = {RequestMethod.GET, RequestMethod.POST})
	public void insertOneTime(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("insertOneTime!");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.insertOneTime(params);		
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	@RequestMapping(value = "/updateonetime", method = {RequestMethod.GET, RequestMethod.POST})
	public void updateOneTime(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("updateOneTime!");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.updateOneTime(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	@RequestMapping(value = "/deleteonetime", method = {RequestMethod.GET, RequestMethod.POST})
	public void deleteOneTime(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("deleteOneTime!");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.deleteOneTime(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	
	
	
	@RequestMapping(value = "/getdboxseqlist", method = {RequestMethod.GET, RequestMethod.POST})
	public void getDBoxSeqList(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("getdboxseqList!");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, svc.getDBoxSeqList(params));
	}
	@RequestMapping(value = "/getpboxseqlist", method = {RequestMethod.GET, RequestMethod.POST})
	public void getPBoxSeqList(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("getpboxseqList!");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, svc.getPBoxSeqList(params));
	}
	@RequestMapping(value = "/updateshareyn", method = {RequestMethod.GET, RequestMethod.POST})
	public void updateShareYN(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("getpboxseqList!");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		svc.updateShareYN(params);
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, null);
	}
	
	
	
	@RequestMapping(value = "/getplanicons", method = {RequestMethod.GET, RequestMethod.POST})
	public void getPlanIcons(Locale locale, Model model, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("getplanicons!");		
		/* 아래 두 줄 설명 : request의 모든 parameter를  params라는 map에 넣습니다. */
		MakeMapParameter mkMapParam = new MakeMapParameter();
		HashMap<String, Object> params = mkMapParam.madeFrom(req);
		
		/* 아래 한 줄 설명 : ajax가 2번째 인자값의 데이터를 가져갑니다. */
		new JSONHelper(resp, svc.getPlanIcons(params));
	}
	
	
	
}

