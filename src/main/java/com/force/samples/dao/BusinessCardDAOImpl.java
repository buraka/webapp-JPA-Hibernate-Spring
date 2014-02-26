package com.force.samples.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.springframework.orm.jpa.support.JpaDaoSupport;

import com.force.samples.entity.Business_Card;

public class BusinessCardDAOImpl extends JpaDaoSupport implements
		BusinessCardDAO {

	@SuppressWarnings("unchecked")
	public List<Business_Card> getAllBusinessCards() {
		return getJpaTemplate().find("select b from Business_Card b");
	}

	public Business_Card getBusinessCardById(Long id) {
		return getJpaTemplate().find(Business_Card.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<Business_Card> getBusinessCardByName(String name) {
		return getJpaTemplate().find("select b from Business_Card b where b.name=?1", name);
	}

	public void insertCard(Business_Card card) {
		EntityManagerFactory emf = Persistence
				.createEntityManagerFactory("exampleHibernateJPA");

		EntityManager em = emf.createEntityManager();

		EntityTransaction tx = em.getTransaction();
		tx.begin();

		em.persist(card);

		tx.commit();
	}

}
