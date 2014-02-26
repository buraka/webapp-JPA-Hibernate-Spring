package com.force.samples.model;

import java.io.Serializable;

public class InsertBusinessContactModel implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long cardId;
	private Long groupId;

	public Long getCardId() {
		return cardId;
	}

	public void setCardId(Long cardId) {
		this.cardId = cardId;
	}

	public Long getGroupId() {
		return groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

}
