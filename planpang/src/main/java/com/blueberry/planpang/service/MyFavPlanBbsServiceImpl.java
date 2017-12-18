package com.blueberry.planpang.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blueberry.lib.PagingHelper;
import com.blueberry.mybatis.MyFavPlanBbsMapper;

@Service
public class MyFavPlanBbsServiceImpl implements MyFavPlanBbsService {

	@Autowired
	MyFavPlanBbsMapper mapper;
	
	@Override
	public ArrayList<HashMap<String, Object>> getArticleList(HashMap<String, Object> params) {
		return mapper.getArticleList(params);
	}

	@Override
	public int getTotalArticleCnt(HashMap<String, Object> params) {
		return mapper.getTotalArticleCnt(params);
	}

	@Override
	public void updateTitle(HashMap<String, Object> params) {
		mapper.updateTitle(params);
	}
	
	@Override
	public void insertArticle(HashMap<String, Object> params) {

	}
	
	@Override
	public void deleteCheck(String chkNum) {
			mapper.deleteCheck(chkNum);
	}
	

	@Override
	public HashMap<String, Object> getPagingHelper(HashMap<String, Object> params) {
		
		PagingHelper pagingHelper = new PagingHelper();
		return pagingHelper.getPagingHelper(params);
	}

	@Override
	public void myFavPlanDelete(HashMap<String, Object> params) {
		mapper.myFavPlanDelete(params);
		
	}

	



}
