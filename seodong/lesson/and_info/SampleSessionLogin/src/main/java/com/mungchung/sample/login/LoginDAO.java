package com.mungchung.sample.login;

public interface LoginDAO {
	public User findByUserIdAndPassword(String userId, String password);
}
