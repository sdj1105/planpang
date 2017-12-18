package com.blueberry.mybatis;

import java.util.ArrayList;
import java.util.HashMap;


public interface PlanBbsMapper {	
	//게시판 목록 
	public ArrayList<HashMap<String, Object>> getArticleList(HashMap<String, Object> hashmap);
	/** 게시물 수 */
	public int getTotalArticleCnt(HashMap<String, Object> hashmap);
	/** 게시글 상세보기 */  
	public HashMap<String, Object> getArticle(HashMap<String, Object> hashmap);
	/** 게시글  조회수 증가 */
	public void updateArticleHit(HashMap<String, Object> hashmap);
	/** 게시글 수정*/
	public void planUpdate(HashMap<String, Object> params) ;
	/** 게시글 디테일 수정 */
	public void updateArticle(HashMap<String, Object> hashmap);
	/** 게시글 추가 */
	public void insertArticle(HashMap<String, Object> hashmap);
	/**게시글 디테일 추가*/
	public void insertArtDetail(HashMap<String, Object> hashmap);
	/** 게시글 삭제 */
	public void deleteArticle(HashMap<String, Object> hashmap);
	/** 게시물 좋아요 */
	public void likeArticle(HashMap<String, Object> hashmap);
	/** 게시글 좋아요 중복 검사 */
	public int chkLikeArticle(HashMap<String, Object> params);
	/** 게시물 좋아요 중복 검사 추가 */
	public void insertIdLikeArticle(HashMap<String, Object> params);
	/** 게시물 페이징 */
	public HashMap<String, Object> getPagingHelper(HashMap<String, Object> params);
	/** 마지막 게시물 번호 */
	public int getLatestPlanSeq(HashMap<String, Object> params);
	
	
	
	// 댓글 목록
	public ArrayList<HashMap<String, Object>> getCommentList (HashMap<String, Object> paramC);
	/** 댓글 수 */
	public int getTotalCommentCnt(HashMap<String, Object> hashmap);
	/** 댓글 입력 */
	public void insertComment (HashMap<String, Object> paramC);
	/** 댓글 수정 */
	public void updateComment (HashMap<String, Object> paramC);
	/** 댓글 삭제 */
	public void deleteComment (HashMap<String, Object> paramC);
	/** 댓글 좋아요 */
	public void likeComment(HashMap<String, Object> hashmap);
	/** 댓글 좋아요 중복 검사 */
	public int chkLikeComment(HashMap<String, Object> params);
	/** 댓글 좋아요 중복 검사 추가 */
	public void insertIdLikeComment(HashMap<String, Object> params);
	
	
	// 댓글댓글 목록
	public ArrayList<HashMap<String, Object>> getCmtCmtList (HashMap<String, Object> paramC);
	/** 댓글댓글 수 */
	public int getTotalCmtCMtCnt(HashMap<String, Object> hashmap);
	/** 댓글댓글 입력 */
	public void insertCmtCmt (HashMap<String, Object> paramC);
	/** 댓글댓글 수정 */
	public void updateCmtCmt (HashMap<String, Object> paramC);
	/** 댓글댓글 삭제 */
	public void deleteCmtCmt (HashMap<String, Object> paramC);
	/** 댓글댓글 좋아요 */
	public void likeCmtCmt (HashMap<String, Object> hashmap);
	/** 댓글댓글 좋아요 중복 검사 
	 * @return */
	public int chkLikeCmtCmt(HashMap<String, Object> params);
	/** 댓글댓글 좋아요 중복 검사 추가 */
	public void insertIdLikeCmtCmt(HashMap<String, Object> params);
	
	// 첨부파일 목록
	public ArrayList<HashMap<String, Object>> getAttachFileList(HashMap<String, Object> paramC);
	/** 첨부파일 입력 */
	public void insertAttachFile (HashMap<String, Object> paramC); 
	/** 첨부파일 수정 */
	public void updateAttachFile (HashMap<String, Object> paramC);
	/** 첨부파일 삭제 */
	public void deleteAttachFile (HashMap<String, Object> paramC);
	
	
	// 즐겨 찾기 등록
	public void insertMyFavPlan (HashMap<String, Object> params);
	//즐겨찾기 중복 체크
	public int chkMyFavPlan(HashMap<String, Object> params);
	//댓글 좋아요 순위
	public ArrayList<HashMap<String, Object>> getBestLike(HashMap<String, Object> params);
}
