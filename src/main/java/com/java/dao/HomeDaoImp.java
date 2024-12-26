package com.java.dao;

import org.springframework.stereotype.Repository;
import com.java.mapper.HomeMapper;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class HomeDaoImp implements HomeDao {

	private final HomeMapper homeMapper;
	
}
