package com.blueberry.mybatis;

import java.util.ArrayList;
import java.util.HashMap;

public interface HomeMapper {
	// 추천 베스트 게시글 목록
	public ArrayList<HashMap<String, Object>> getBestList(HashMap<String, Object> hashmap);
	
	// 회원가입
	public void insertMember(HashMap<String, Object> hashmap);
	
	// 유저 권한 주기
	public void giveRoleUser(HashMap<String, Object> hashmap);
	
	// FaceBook 회원가입
	public void insertFbMember(HashMap<String, Object> hashmap);
	
	// 회원가입 여부 체크
	public int chkMember(HashMap<String, Object> hashmap);
	
	// 회원 Seq가져오기 
	public int getMemberSeq(HashMap<String, Object> hashmap);
	
	// 접속시간 업데이트
	public void updateConnectDt(HashMap<String, Object> hashmap);
	
	//--------------- ADMIN PAGE ---------------
	// 전체 방문자 수 +1
	public void setVisitTotalCount(HashMap<String, Object> hashmap);
	
	// 전체 방문자 수
	public int getVisitTotalCount();
	
	// 오늘 방문자 수
	public int getVisitTodayCount();
	
	// 7일간 방문자 수
	public HashMap<String, Object> getLatestWeekVisit();
	
	// 전체 멤버 수
	public int getTotalMem(HashMap<String, Object> hashmap);
	
	// 7일간 가입자 수
	public HashMap<String, Object> getLatestWeekJoin();
	
	// 전체 게시글 수
	public int getTotalPlan(HashMap<String, Object> hashmap);
	
	// 7일간 게시물 수
	public HashMap<String, Object> getLatestWeekPlan();
	
	// 전체 댓글 수
	public int getTotalComments();
	
	// 전체 회원정보 
	public ArrayList<HashMap<String, Object>> getMemberInfo(HashMap<String, Object> hashmap);
	
	// 전체 게시글 정보 
	public ArrayList<HashMap<String, Object>> getPlanInfo(HashMap<String, Object> hashmap);
	
	// 권한 수정
	public void editRole(HashMap<String, Object> hashmap);
	
	// 회원 탈퇴 및 복구 처리
	public void editUnregMember(HashMap<String, Object> hashmap);
	
	// 게시글 삭제 및 복구 처리
	public void editDelPlan(HashMap<String, Object> hashmap);
	
	// 회원 전체 정보
	public  ArrayList<HashMap<String, Object>> getAllMember();
	
}
