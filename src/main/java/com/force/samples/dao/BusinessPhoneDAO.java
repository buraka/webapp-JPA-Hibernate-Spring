package com.force.samples.dao;

import java.util.List;

import com.force.samples.entity.Business_Phone;

public interface BusinessPhoneDAO {

	List<Business_Phone> getAllBusinessPhones();

	Business_Phone getBusinessPhoneById(Long id);

	void insertPhone(Business_Phone phone);

}
