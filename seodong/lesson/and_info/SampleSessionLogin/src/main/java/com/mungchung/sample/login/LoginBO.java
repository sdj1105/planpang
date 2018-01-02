package com.mungchung.sample.login;

public interface LoginBO {
	public User findByUserIdAndPassword(String userId, String password);
}
