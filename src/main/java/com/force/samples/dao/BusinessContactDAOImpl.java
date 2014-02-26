package com.force.samples.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.springframework.orm.jpa.support.JpaDaoSupport;

import com.force.samples.entity.Business_Contact;

public class BusinessContactDAOImpl extends JpaDaoSupport implements BusinessContactDAO{

	@SuppressWarnings("unchecked")
	public List<Business_Contact> getAllBusinessContacts() {
		return getJpaTemplate().find("select b from Business_Contact b");
	}

	public Business_Contact getBusinessContactById(Long id) {
		return getJpaTemplate().find(Business_Contact.class, id);
	}

	public void insertContact(Business_Contact contact) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("exampleHibernateJPA");

		EntityManager em = emf.createEntityManager();

		EntityTransaction tx = em.getTransaction();
		tx.begin();

		em.merge(contact);

		tx.commit();
	}

}
