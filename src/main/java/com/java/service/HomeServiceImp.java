package com.java.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import com.java.dao.HomeDao;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class HomeServiceImp implements HomeService {
	
	private final HomeDao homeDao;

	@Override
	public String home(Model model, HttpServletRequest req) {
		return "home";
	}
	
	@Override
	public String detail(Model model, HttpServletRequest req) {
		return "detail";
	}
	
	@Override
	public String accept(HttpServletRequest req) {
		return "redirect:/detail?no=";
	}
	
}
