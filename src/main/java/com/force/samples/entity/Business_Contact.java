package com.force.samples.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity
public class Business_Contact {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="business_contact_id_seq")
    @SequenceGenerator(name="business_contact_id_seq", sequenceName="business_contact_id_seq", allocationSize=1)
	private Long id;

	@ManyToOne(cascade = { CascadeType.PERSIST })
	private Business_Card business;

	@ManyToOne(cascade = { CascadeType.PERSIST })
	private Contact_Groups groups;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Business_Card getBusiness() {
		return business;
	}

	public void setBusiness(Business_Card business) {
		this.business = business;
	}

	public Contact_Groups getGroups() {
		return groups;
	}

	public void setGroups(Contact_Groups groups) {
		this.groups = groups;
	}

}
