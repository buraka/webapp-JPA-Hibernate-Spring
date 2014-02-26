package com.force.samples.model;

import java.io.Serializable;

public class InsertPhoneModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String phone_area_code;
	private String phone_number;
	private Long cardId;

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

	public Long getCardId() {
		return cardId;
	}

	public void setCardId(Long cardId) {
		this.cardId = cardId;
	}

}
