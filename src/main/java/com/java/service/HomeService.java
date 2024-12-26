package com.java.service;

import org.springframework.ui.Model;

import jakarta.servlet.http.HttpServletRequest;

public interface HomeService {
	
	public String home(Model model, HttpServletRequest req);
	public String detail(Model model, HttpServletRequest req);
	public String accept(HttpServletRequest req);

}
