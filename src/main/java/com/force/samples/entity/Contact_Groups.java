package com.force.samples.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class Contact_Groups {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="contact_groups_id_seq")
    @SequenceGenerator(name="contact_groups_id_seq", sequenceName="contact_groups_id_seq", allocationSize=1)
	private Long id;
	private String group_name;
	private String group_description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGroup_name() {
		return group_name;
	}

	public void setGroup_name(String group_name) {
		this.group_name = group_name;
	}

	public String getGroup_description() {
		return group_description;
	}

	public void setGroup_description(String group_description) {
		this.group_description = group_description;
	}
}
