package com.force.samples.dao;

import java.util.List;

import com.force.samples.entity.Business_Card;

public interface BusinessCardDAO {
	
	List<Business_Card> getAllBusinessCards();
	
	Business_Card getBusinessCardById(Long id);

	List<Business_Card> getBusinessCardByName(String name);
	
	void insertCard(Business_Card card);
}
