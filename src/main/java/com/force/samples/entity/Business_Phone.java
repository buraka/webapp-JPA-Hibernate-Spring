package com.force.samples.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity
public class Business_Phone {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="business_phone_id_seq")
    @SequenceGenerator(name="business_phone_id_seq", sequenceName="business_phone_id_seq", allocationSize=1)
	private Long id;

	@ManyToOne(cascade = { CascadeType.PERSIST })
	private Business_Card business_card;

	private String phone_area_code;
	private String phone_number;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Business_Card getBusiness_card() {
		return business_card;
	}

	public void setBusiness_card(Business_Card business_card) {
		this.business_card = business_card;
	}

	public String getPhone_area_code() {
		return phone_area_code;
	}

	public void setPhone_area_code(String phone_area_code) {
		this.phone_area_code = phone_area_code;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

}
