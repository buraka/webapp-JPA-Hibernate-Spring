package com.force.samples.dao;

import java.util.List;

import com.force.samples.entity.Business_Contact;

public interface BusinessContactDAO {

	List<Business_Contact> getAllBusinessContacts();

	Business_Contact getBusinessContactById(Long id);

	void insertContact(Business_Contact contact);
}
