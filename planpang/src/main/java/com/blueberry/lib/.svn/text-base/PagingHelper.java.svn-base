package com.blueberry.lib;

import java.util.ArrayList;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.blueberry.planpang.controller.MyFavPlanBbsController;



/*
 * 작성자 : 김수중
 * 작성일 : 15.03.30 
 * */
public class PagingHelper {
	
		private static final Logger logger = LoggerFactory.getLogger(MyFavPlanBbsController.class);
		/*
		 * params에 다음 키값으로 원하는 페이징을 설정 할 수 있습니다.
		 * "nowPgN"	몇 번 페이지를 표시할지 
		 * "hmAtcN"	게시물을 몇개 표시할지
		 * "hmPgN"	페이지 번호를 몇 개 표시할지
		 * 
		 * */
		//페이징 헬퍼   		
		public HashMap<String, Object> getPagingHelper(HashMap<String, Object> params) {
			
			//초기설정
			int nowPgN = 1;		int hmAtcN = 10;		int hmPgN = 10;		
			
			if(params.get("nowPgN")!=null){			
				nowPgN = Integer.parseInt(params.get("nowPgN").toString());
			}
			if(params.get("hmAtcN")!=null){
				hmAtcN = Integer.parseInt(params.get("hmAtcN").toString());
			}
			if(params.get("hmPgN")!=null){
				hmPgN = Integer.parseInt(params.get("hmPgN").toString());
			}			
			
			//총 게시물 수
			int ttAtcCnt = (Integer)params.get("ttAtcCnt");		
			//총 페이지 수
			int ttPgCnt = (int)Math.ceil((double)ttAtcCnt / (double)hmAtcN);
			//총 페이지의 페이지 수 
			int ttPgPgCnt = (int)Math.ceil((double)ttPgCnt / (double)hmPgN);
			//현재 페이지의 페이지 번호 
			int nowPgPgN = (int)Math.ceil((double)nowPgN / (double)hmPgN);
			
			//표시될 게시물 시작 번호
			int startAtcIdx = (nowPgN-1) * hmAtcN  + 1;
			//표시될 게시물 끝 번호
			int endAtcIdx = startAtcIdx + hmAtcN - 1;
			
			//표시될 페이지 시작 번호
			int pgF = ((nowPgPgN -1) * hmPgN)+ 1;
			//표시될 페이지 끝 번호
			int pgL = ttPgCnt;		
			if(pgF + hmPgN-1 >= ttPgCnt){
			}else{
				pgL = pgF + hmPgN - 1;				
			}
			
			//표시될 페이지 번호들 
			ArrayList<Integer> pgBtnNumC = new ArrayList<Integer>();
			for(int i=pgF; i<=pgL;i++){
				pgBtnNumC.add(i);
			}

			//버튼 표시 여부
			boolean hasPrev = true;
			boolean hasFirst = true;
			boolean hasNext = true;
			boolean hasLast = true;
			if (nowPgPgN==1){
				hasPrev = false;
				hasFirst = false;
			};
			if (nowPgPgN>=ttPgPgCnt){
				hasNext = false;
				hasLast = false;
			};
			
			
			params.put("nowPgN", nowPgN);
			params.put("hmAtcN", hmAtcN);
			params.put("hmPgN", hmPgN);
			
			params.put("ttAtcCnt", ttAtcCnt);
			params.put("ttPgCnt",ttPgCnt);
			params.put("ttPgPgCnt",ttPgPgCnt);
			params.put("nowPgN", nowPgN) ;
			params.put("nowPgPgN",nowPgPgN) ;
			
			params.put("startAtcIdx", startAtcIdx);
			params.put("endAtcIdx", endAtcIdx);
			params.put("pgF", pgF) ;
			params.put("pgL", pgL);
			params.put("pgBtnNumC", pgBtnNumC);
			
			params.put("hasPrev", hasPrev);
			params.put("hasFirst", hasFirst);
			params.put("hasNext", hasNext);
			params.put("hasLast", hasLast);
			
			logger.info("\n ★ paging 정보를  params에 저장 완료 \n::{}.", params);
			
			return params;
		}
}
