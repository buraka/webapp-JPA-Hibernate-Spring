package com.force.samples.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.springframework.orm.jpa.support.JpaDaoSupport;

import com.force.samples.entity.Business_Phone;

public class BusinessPhoneDAOImpl extends JpaDaoSupport implements
		BusinessPhoneDAO {

	@SuppressWarnings("unchecked")
	public List<Business_Phone> getAllBusinessPhones() {
		return getJpaTemplate().find("select b from Business_Phone b");
	}

	public Business_Phone getBusinessPhoneById(Long id) {
		return getJpaTemplate().find(Business_Phone.class, id);
	}

	public void insertPhone(Business_Phone phone) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("exampleHibernateJPA");

		EntityManager em = emf.createEntityManager();

		EntityTransaction tx = em.getTransaction();
		tx.begin();

		em.merge(phone);

		tx.commit();
	}

}
