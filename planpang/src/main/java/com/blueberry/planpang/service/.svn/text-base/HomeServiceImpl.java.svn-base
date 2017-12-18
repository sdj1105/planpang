package com.blueberry.planpang.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blueberry.mybatis.HomeMapper;

/**
 * @FileName  : HomeServiceImpl.java
 * @Project   : planpang
 * @Date      : 2015. 4. 13. 
 * @작성자      : 구지연
 * @프로그램 설명     : 홈/관리자화면 및 로그인/회원가입처리 Service
 */
@Service
public class HomeServiceImpl implements HomeService {
	@Autowired
	HomeMapper mapper;

	// 추천 베스트 게시글 목록
	public ArrayList<HashMap<String, Object>> getBestList(
			HashMap<String, Object> params) {
		return mapper.getBestList(params);
	}

	// 회원 가입
	public void insertMember(HashMap<String, Object> hashmap) {
		mapper.insertMember(hashmap);
	}
	
	// 유저 권한 주기
	public void giveRoleUser(HashMap<String, Object> hashmap){
		mapper.giveRoleUser(hashmap);
	}
	
	// FaceBook 회원가입
	public void insertFbMember(HashMap<String, Object> hashmap){
		mapper.insertFbMember(hashmap);
	}
	
	// 회원가입 여부 체크
	public int chkMember(HashMap<String, Object> hashmap){
		return mapper.chkMember(hashmap);
	}
	
	// 회원 Seq가져오기 
	public int getMemberSeq(HashMap<String, Object> hashmap){
		return mapper.getMemberSeq(hashmap);
	}
	
	// 접속시간 업데이트
	public void updateConnectDt(HashMap<String, Object> hashmap){
		mapper.updateConnectDt(hashmap);
	}
	
	/***************** 방문자 세션 관리 *****************/ 
	// 전체 방문자 수 +1
	public void setVisitTotalCount(HashMap<String, Object> hashmap){
		mapper.setVisitTotalCount(hashmap);
	}
	
	// 전체 방문자 수
	public int getVisitTotalCount(){
		return mapper.getVisitTotalCount();
	}
	
	// 오늘 방문자 수
	public int getVisitTodayCount(){
		return mapper.getVisitTodayCount();
	}
	
	/***************** ADMIN PAGE *****************/ 	
	// 최근 7일간 방문자 수
	public HashMap<String, Object> getLatestWeekVisit(){
		return mapper.getLatestWeekVisit();
	}
	
	// 최근 7일간 가입자 수
	public HashMap<String, Object> getLatestWeekJoin(){
		return mapper.getLatestWeekJoin();
	}
	
	// 최근 7일간 게시물 수
	public HashMap<String, Object> getLatestWeekPlan(){
		return mapper.getLatestWeekPlan();
	}
	
	// 전체 멤버 수
	public int getTotalMem(HashMap<String, Object> hashmap){
		return mapper.getTotalMem(hashmap);
	}
	
	// 전체 게시글 수
	public int getTotalPlan(HashMap<String, Object> hashmap){
		return mapper.getTotalPlan(hashmap);
	}
	
	// 전체 댓글 수
	public int getTotalComments(){
		return mapper.getTotalComments();
	}
	
	// 회원가입/탈퇴한 모든 회원정보 
	public ArrayList<HashMap<String, Object>> getMemberInfo(HashMap<String, Object> hashmap){
		return mapper.getMemberInfo(hashmap);
	}
	
	// 등록/삭제된  모든 게시글 정보 
	public ArrayList<HashMap<String, Object>> getPlanInfo(HashMap<String, Object> hashmap){
		return mapper.getPlanInfo(hashmap);
	}
	
	// 가입된 회원 권한 수정
	public void editRole(HashMap<String, Object> hashmap){
		mapper.editRole(hashmap);
	}
	
	// 회원 탈퇴 및 복구 처리
	public void editUnregMember(HashMap<String, Object> hashmap){
		mapper.editUnregMember(hashmap);
	}
	
	// 게시글 삭제 및 복구 처리
	public void editDelPlan(HashMap<String, Object> hashmap){
		mapper.editDelPlan(hashmap);
	}
	
	// 엑셀 다운로드를 위한 회원 전체 정보
	public  ArrayList<HashMap<String, Object>> getAllMember(){
		return mapper.getAllMember();
	}
}
