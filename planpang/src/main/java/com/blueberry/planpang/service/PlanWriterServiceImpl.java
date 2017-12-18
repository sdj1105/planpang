package com.blueberry.planpang.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blueberry.mybatis.PlanWriterMapper;

@Service
public class PlanWriterServiceImpl implements PlanWriterService {
	
	@Autowired
	PlanWriterMapper mapper;	

	@Override
	public HashMap<String, Object> getArticle(HashMap<String, Object> params) {
		return mapper.getArticle(params);
	}
	@Override
	public void insertArticle(HashMap<String, Object> params) {
		mapper.insertArticle(params);
	}
	@Override
	public void updateArticle(HashMap<String, Object> params) {
		mapper.updateArticle(params);
	}
	@Override
	public void deleteArticle(HashMap<String, Object> params) {
		mapper.deleteArticle(params);
	}
	
	
	public HashMap<String, Object> getArticlePhoto(HashMap<String, Object> params){
		return mapper.getArticlePhoto(params);
	}
	public void updateArticlePhoto (HashMap<String, Object> params){
		mapper.updateArticlePhoto(params);
	}
	
	
	@Override
	public void insertDay(HashMap<String, Object> params) {
		mapper.insertDay(params);
	}
	@Override
	public void updateDay(HashMap<String, Object> params) {
		mapper.updateDay(params);
	}
	@Override
	public void deleteDay(HashMap<String, Object> params) {
		mapper.deleteDay(params);
	}
	
	
	
	@Override
	public void deletePaper(HashMap<String, Object> params){
		mapper.deletePaper(params);
	}
	@Override
	public ArrayList<HashMap<String, Object>> getTimeList(HashMap<String, Object> params) {
		return mapper.getTimeList(params);
	}
	@Override
	public void insertOneTime(HashMap<String, Object> params) {
		mapper.insertOneTime(params);
	}
	@Override
	public void updateOneTime(HashMap<String, Object> params) {
		mapper.updateOneTime(params);
	}
	@Override
	public void deleteOneTime(HashMap<String, Object> params) {
		mapper.deleteOneTime(params);
	}
	
	
	@Override
	public ArrayList getPBoxSeqList(HashMap<String, Object> params) {
		return mapper.getPBoxSeqList(params);
	}
	@Override
	public ArrayList getDBoxSeqList(HashMap<String, Object> params) {
		return mapper.getDBoxSeqList(params);
	}
	
	
	@Override
	public void updateShareYN(HashMap<String, Object> params) {
		mapper.updateShareYN(params);
	}
	@Override
	
	public ArrayList getPlanIcons(HashMap<String, Object> params) {
		return mapper.getPlanIcons(params);
	}
	
}
