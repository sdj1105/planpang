package com.blueberry.mybatis;

import java.util.ArrayList;
import java.util.HashMap;


public interface MyFavPlanBbsMapper {	
	//게시판 목록 
	public ArrayList<HashMap<String, Object>> getArticleList(HashMap<String, Object> params); 
	
	/** 게시글 타이틀 업데이트 */
	public void updateTitle(HashMap<String, Object> params);
	/** 게시글 추가 */
	public void insertArticle(HashMap<String, Object> params);
	/** 게시글 체크 삭제 */
	public void deleteCheck(String chkNum);
	/** 총게시물 수 */
	public int getTotalArticleCnt(HashMap<String, Object> params);
	
	/** 게시글 삭제 */
	public void myFavPlanDelete(HashMap<String, Object> params);
	
	
}
