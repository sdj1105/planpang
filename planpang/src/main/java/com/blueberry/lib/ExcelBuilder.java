package com.blueberry.lib;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.springframework.web.servlet.view.document.AbstractExcelView;


/**
 * @FileName  : ExcelBuilder.java
 * @Project   : planpang
 * @Date      : 2015. 4. 13. 
 * @작성자      : 구지연
 * @프로그램 설명     : 엑셀 다운로드를 위한 클래스
 */
public class ExcelBuilder extends AbstractExcelView {

	@Override
	protected void buildExcelDocument(	Map<String, Object> model	
									,	HSSFWorkbook workbook,	HttpServletRequest request
									,	HttpServletResponse response) throws Exception {
		
		// 컨트롤러에서 보내준 리스트 이름으로 모델을 받아옴
		ArrayList<HashMap<String, String>> listMember 
								= (ArrayList<HashMap<String, String>>) model.get("listMember"); 
		
		// 엑셀의 sheet 생성
		HSSFSheet sheet = workbook.createSheet("PangMember");
		sheet.setDefaultColumnWidth(30);
		
		// 스타일 지정
		CellStyle style = workbook.createCellStyle();
		Font font = workbook.createFont();
		font.setFontName("Arial");
		style.setFillForegroundColor(HSSFColor.BLUE_GREY.index);
		style.setFillPattern(CellStyle.SOLID_FOREGROUND);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		font.setColor(HSSFColor.WHITE.index);
		style.setFont(font);
		
		// 엑셀 열 이름 지정
		HSSFRow header = sheet.createRow(0);
		
		header.createCell(0).setCellValue("아이디");
		header.getCell(0).setCellStyle(style);
		
		header.createCell(1).setCellValue("이름");
		header.getCell(1).setCellStyle(style);
		
		header.createCell(2).setCellValue("가입일");
		header.getCell(2).setCellStyle(style);
		
		header.createCell(3).setCellValue("최종접속일");
		header.getCell(3).setCellStyle(style);
		
		header.createCell(4).setCellValue("권한");
		header.getCell(4).setCellStyle(style);
		
		header.createCell(5).setCellValue("닉네임");
		header.getCell(5).setCellStyle(style);
		
		header.createCell(6).setCellValue("연락처");
		header.getCell(6).setCellStyle(style);
		
		header.createCell(7).setCellValue("주소");
		header.getCell(7).setCellStyle(style);
		
		header.createCell(8).setCellValue("탈퇴여부");
		header.getCell(8).setCellStyle(style);
		
		int rowCount = 1;
		
		// 셀을 생성해서 데이터를 넣는다
		for(HashMap<String, String> params : listMember){
			HSSFRow aRow = sheet.createRow(rowCount++);
			aRow.createCell(0).setCellValue(params.get("MEMBERID"));
			aRow.createCell(1).setCellValue(params.get("MEMNM"));
			aRow.createCell(2).setCellValue(params.get("JOINDT"));
			aRow.createCell(3).setCellValue(params.get("CONNECTDT"));
			aRow.createCell(4).setCellValue(params.get("ROLE"));
			aRow.createCell(5).setCellValue(params.get("NICKNM"));
			aRow.createCell(6).setCellValue(params.get("MEMTEL"));
			aRow.createCell(7).setCellValue(params.get("MEMADDR"));
			aRow.createCell(8).setCellValue(params.get("UNREGYN"));
		}
		
		response.setContentType("application/x-msdownload");
		response.setHeader("Content-Disposition", "attachment; filename=\"PangMember.xls\"");
	}

}