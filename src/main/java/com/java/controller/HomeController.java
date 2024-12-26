package com.java.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.java.service.HomeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class HomeController {
	
	private final HomeService homeService;
	
	@GetMapping("/")
	public String home(Model model, HttpServletRequest req) {
		return homeService.home(model, req);
	}
	
	@GetMapping("/input")
	public String input() {
		return "input";
	}
	
	@GetMapping("/detail")
	public String detail(Model model, HttpServletRequest req) {
		return homeService.detail(model, req);
	}
	
}
