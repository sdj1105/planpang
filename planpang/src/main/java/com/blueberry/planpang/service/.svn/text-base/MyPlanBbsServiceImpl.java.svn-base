package com.blueberry.planpang.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blueberry.lib.PagingHelper;
import com.blueberry.mybatis.MyPlanBbsMapper;

@Service
public class MyPlanBbsServiceImpl implements MyPlanBbsService {
	
	@Autowired
	MyPlanBbsMapper mapper;
	
	@Override
	public ArrayList<HashMap<String, Object>> getArticleList(HashMap<String, Object> params) {
		return mapper.getArticleList(params);
	}

	@Override
	public int getTotalArticleCnt(HashMap<String, Object> params) {
		return mapper.getTotalArticleCnt(params);
	}

	@Override
	public void insertArticle(HashMap<String, Object> params) {

	}

	@Override
	public void deleteArticle(HashMap<String, Object> params) {

	}

	@Override
	public HashMap<String, Object> getPagingHelper(
			HashMap<String, Object> params) {
		
		PagingHelper pagingHelper = new PagingHelper();
		return pagingHelper.getPagingHelper(params);
	}

		

	@Override
	public void del(HashMap<String, Object> hashmap) {
		mapper.del(hashmap);
	}

	@Override
	public void addcnt(HashMap<String, Object> hashmap) {
		
	}
	
	public void del2(HashMap<String, Object> hashmap) {
		mapper.del2(hashmap);
	}

}
