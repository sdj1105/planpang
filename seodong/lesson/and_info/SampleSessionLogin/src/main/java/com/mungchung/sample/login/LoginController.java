package com.mungchung.sample.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
	@Autowired
	private LoginBO loginBO;
	
	// 세션사용 화면
	@RequestMapping("page1")
	public String page1() {
		return "page1";
	}
	// 세션 사용 안하는 화면
	@RequestMapping("page2")
	public String page2() {
		return "page2";
	}
	// 로그인 화면
	@RequestMapping("login")
	public String login() {
		return "login";
	}
	// 로그아웃
	@RequestMapping("logout")
	public String logout(HttpSession session) {
		session.setAttribute("userLoginInfo", null);
		return "redirect:login";
	}
	// 로그인 처리 
	@RequestMapping(value="loginProcess", method = RequestMethod.POST)
	public ModelAndView loginProcess(User user, HttpSession session, HttpServletRequest request) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("redirect:login");
		
		User loginUser = loginBO.findByUserIdAndPassword(user.getUserId(), user.getPassword());
		
		if (loginUser != null) {
			session.setAttribute("userLoginInfo", loginUser);
		}
		return mav;
	}
}
