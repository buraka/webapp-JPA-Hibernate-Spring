package com.force.samples.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.springframework.orm.jpa.support.JpaDaoSupport;

import com.force.samples.entity.Contact_Groups;

public class ContactGroupDAOImpl extends JpaDaoSupport implements
		ContactGroupDAO {

	@SuppressWarnings("unchecked")
	public List<Contact_Groups> getAllContactGroups() {
		return getJpaTemplate().find("select c from Contact_Groups c");
	}

	public Contact_Groups getBusinessContactGroupById(Long id) {
		return getJpaTemplate().find(Contact_Groups.class, id);
	}

	public void insertPhone(Contact_Groups contactGroup) {
		EntityManagerFactory emf = Persistence
				.createEntityManagerFactory("exampleHibernateJPA");

		EntityManager em = emf.createEntityManager();

		EntityTransaction tx = em.getTransaction();
		tx.begin();

		em.persist(contactGroup);

		tx.commit();
	}

}
