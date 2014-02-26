package com.force.samples.dao;

import java.util.List;

import com.force.samples.entity.Contact_Groups;

public interface ContactGroupDAO {

	List<Contact_Groups> getAllContactGroups();

	Contact_Groups getBusinessContactGroupById(Long id);

	void insertPhone(Contact_Groups contactGroup);
}
