package com.blueberry.planpang.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.blueberry.lib.PagingHelper;
import com.blueberry.mybatis.PlanBbsMapper;

@Service
public class PlanBbsServiceImpl implements PlanBbsService {
	
	@Autowired
	PlanBbsMapper mapper;	

	@Override
	public ArrayList<HashMap<String, Object>> getArticleList(HashMap<String, Object> params) {
		return mapper.getArticleList(params);
	}

	@Override
	public int getTotalArticleCnt(HashMap<String, Object> params) {
		return mapper.getTotalArticleCnt(params);
	}

	@Override
	public HashMap<String, Object> getPagingHelper(HashMap<String, Object> params) {
		
		PagingHelper ph = new PagingHelper();
		
		return ph.getPagingHelper(params);
	}

	@Override
	public HashMap<String, Object> getArticle(HashMap<String, Object> params) {			
		
		return mapper.getArticle(params);
	}
	
	@Override
	public void insertArticle(HashMap<String, Object> params) {
		mapper.insertArticle(params);

	}
	
	@Override
	public void inserArtDetail(HashMap<String, Object> params) {
		mapper.insertArtDetail(params);
	}

	@Override
	public void updateArticleHit(HashMap<String, Object> params) {
		mapper.updateArticleHit(params);

	}
	/*게시물 수정*/
	@Override
	public void planUpdate(HashMap<String, Object> params) {
		mapper.planUpdate(params);
	}
	/*게시물 디테일 수정*/
	@Override
	public void updateArticle(HashMap<String, Object> params) {

			mapper.updateArticle(params);
	}

	@Override
	public void deleteArticle(HashMap<String, Object> params) {
		
		mapper.deleteArticle(params);
	}

	@Override
	public void likeArticle(HashMap<String, Object> params) {

		mapper.likeArticle(params);
	}
	@Override
	public int chkLikeArticle(HashMap<String, Object> params) {
		return mapper.chkLikeArticle(params);
		
	}

	@Override
	public void insertIdLikeArticle(HashMap<String, Object> params) {
		mapper.insertIdLikeArticle(params);
	}
	
	@Override
	public int getLatestPlanSeq(HashMap<String, Object> params) {
		
		return mapper.getLatestPlanSeq(params);
	}

	
	/*///////////////////// 댓글 ////////////////*/ 
	@Override
	public ArrayList<HashMap<String, Object>> getCommentList(
			HashMap<String, Object> params) {

		return mapper.getCommentList(params);
	}

	@Override
	public void insertComment(HashMap<String, Object> params) {
		mapper.insertComment(params);

	}

	@Override
	public void updateComment(HashMap<String, Object> params) {
		mapper.updateComment(params);
	}

	@Override
	public void deleteComment(HashMap<String, Object> params) {
		mapper.deleteComment(params);

	}

	@Override
	public void likeComment(HashMap<String, Object> params) {
		mapper.likeComment(params);
	}
	
	@Override
	public int chkLikeComment(HashMap<String, Object> params) {
		return mapper.chkLikeComment(params);
	}

	@Override
	public void insertIdLikeComment(HashMap<String, Object> params) {
		mapper.insertIdLikeComment(params);
	}
	
	/*////////////댓글댓글///////// */
	@Override
	public ArrayList<HashMap<String, Object>> getCmtCmtList(
			HashMap<String, Object> params) {

		return mapper.getCmtCmtList(params);
	}

	@Override
	public void insertCmtCmt(HashMap<String, Object> params) {
		mapper.insertCmtCmt(params);

	}

	@Override
	public void updateCmtCmt(HashMap<String, Object> params) {
		mapper.updateCmtCmt(params);
	}

	@Override
	public void deleteCmtCmt(HashMap<String, Object> params) {
		mapper.deleteCmtCmt(params);

	}

	@Override
	public void likeCmtCmt(HashMap<String, Object> params) {
		mapper.likeCmtCmt(params);
		
	}

	@Override
	public int chkLikeCmtCmt(HashMap<String, Object> params) {
	 
		return  mapper.chkLikeCmtCmt(params);	
	}

	@Override
	public void insertIdLikeCmtCmt(HashMap<String, Object> params) {
		mapper.insertIdLikeCmtCmt(params);
	}

	
	@Override
	public void insertMyFavPlan(HashMap<String, Object> params) {
		mapper.insertMyFavPlan(params);
	}
	
	
	@Override
	public int chkMyFavPlan(HashMap<String, Object> params) {
		return mapper.chkMyFavPlan(params);
	}
	
	
	@Override
	public ArrayList<HashMap<String, Object>> getBestLike(
			HashMap<String, Object> params){
		return mapper.getBestLike(params);
	}
	
	@Override
	public ArrayList<HashMap<String, Object>> getAttachFileList(
			HashMap<String, Object> params) {

		return null;
	}

	@Override
	public void insertAttachFile(HashMap<String, Object> params) {


	}

	@Override
	public void updateAttachFile(HashMap<String, Object> params) {


	}

	@Override
	public void deleteAttachFile(HashMap<String, Object> params) {


	}








}
