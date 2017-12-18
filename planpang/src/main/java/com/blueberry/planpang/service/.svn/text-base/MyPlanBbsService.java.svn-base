package com.blueberry.planpang.service;

import java.util.ArrayList;
import java.util.HashMap;

public interface MyPlanBbsService {
	//게시판 목록 
	public ArrayList<HashMap<String, Object>> getArticleList(HashMap<String, Object> params);
	/** 게시물 수 */
	public int getTotalArticleCnt(HashMap<String, Object> params);	
	/** 게시글 추가 */
	public void insertArticle(HashMap<String, Object> params);
	/** 게시글 삭제 */
	public void deleteArticle(HashMap<String, Object> params);
	
	/** 게시물 페이징 */
	public HashMap<String, Object> getPagingHelper(HashMap<String, Object> params);	
	
	public void del(HashMap<String, Object> hashmap);
	
	public void addcnt(HashMap<String, Object> hashmap);
	
}
