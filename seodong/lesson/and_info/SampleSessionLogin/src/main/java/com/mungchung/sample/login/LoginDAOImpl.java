package com.mungchung.sample.login;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Component;

@Component
public class LoginDAOImpl implements LoginDAO {
    
    @Autowired
    private SqlMapClientTemplate sqlMapClientTemplate;

	public User findByUserIdAndPassword(String userId, String password) {
        Map<String, String> paramMap = new HashMap<String, String>();
        paramMap.put("userId", userId);
        paramMap.put("password", password);

        return (User) sqlMapClientTemplate.queryForObject("login.selectLoginUser", paramMap);
	}

}
