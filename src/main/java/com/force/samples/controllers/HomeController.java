package com.force.samples.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.force.samples.dao.BusinessCardDAO;
import com.force.samples.dao.BusinessContactDAO;
import com.force.samples.dao.BusinessPhoneDAO;
import com.force.samples.dao.ContactGroupDAO;
import com.force.samples.entity.Business_Card;
import com.force.samples.entity.Business_Contact;
import com.force.samples.entity.Business_Phone;
import com.force.samples.entity.Contact_Groups;
import com.force.samples.model.InsertBusinessContactModel;
import com.force.samples.model.InsertCardModel;
import com.force.samples.model.InsertPhoneModel;
import com.force.samples.util.ViewUtil;

@Controller
public class HomeController {

	@Inject
	private BusinessCardDAO businessCardDAO;
	@Inject
	private BusinessPhoneDAO businessPhoneDAO;
	@Inject
	private ContactGroupDAO contactGroupDAO;
	@Inject
	private BusinessContactDAO businessContactDAO;

	@RequestMapping(method = RequestMethod.GET, value = { "/", "/home" })
	public String showHomePage(ModelAndView mv) {

		return "home";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/listCards")
	public String listCards(HttpServletRequest request,
			HttpServletResponse response, Model model) throws IOException {
		List<Business_Card> cards = businessCardDAO.getAllBusinessCards();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("cards", cards);

		ViewUtil.sendJSON(response, resultMap);
		return null;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/listPhones")
	public String listPhones(HttpServletRequest request,
			HttpServletResponse response, Model model) throws IOException {

		List<Business_Phone> phones = businessPhoneDAO.getAllBusinessPhones();

		List<Business_Card> cards = businessCardDAO.getAllBusinessCards();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("phones", ViewUtil.beatufyBusinessPhone(phones));
		resultMap.put("cards", cards);

		ViewUtil.sendJSON(response, resultMap);

		return null;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/listContactGroups")
	public String listContactGroups(HttpServletRequest request,
			HttpServletResponse response, Model model) throws IOException {
		List<Contact_Groups> contactGroups = contactGroupDAO
				.getAllContactGroups();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("contactGroups", contactGroups);

		ViewUtil.sendJSON(response, resultMap);

		return null;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/listBusinessContact")
	public String listBusinessContact(HttpServletRequest request,
			HttpServletResponse response, Model model) throws IOException {

		List<Contact_Groups> contactGroups = contactGroupDAO
				.getAllContactGroups();

		List<Business_Card> cards = businessCardDAO.getAllBusinessCards();

		List<Business_Contact> businessContacts = businessContactDAO
				.getAllBusinessContacts();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("contactGroups", contactGroups);
		resultMap.put("cards", cards);
		resultMap.put("businessContacts",
				ViewUtil.beatufyBusinessContacts(businessContacts));

		ViewUtil.sendJSON(response, resultMap);

		return null;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/insertCard")
	public String insertCard(HttpServletRequest request,
			HttpServletResponse response, InsertCardModel input, Model model)
			throws IOException {

		Business_Card card = new Business_Card();
		card.setName(input.getName());
		card.setDescription(input.getDesc());
		businessCardDAO.insertCard(card);

		List<Business_Card> cards = businessCardDAO.getAllBusinessCards();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("cards", cards);

		ViewUtil.sendJSON(response, resultMap);

		return null;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/insertPhone")
	public String insertPhone(HttpServletRequest request,
			HttpServletResponse response, InsertPhoneModel input, Model model)
			throws IOException {

		Business_Card card = businessCardDAO.getBusinessCardById(input
				.getCardId());

		Business_Phone phone = new Business_Phone();
		phone.setBusiness_card(card);
		phone.setPhone_area_code(input.getPhone_area_code());
		phone.setPhone_number(input.getPhone_number());

		businessPhoneDAO.insertPhone(phone);

		List<Business_Phone> phones = businessPhoneDAO.getAllBusinessPhones();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("phones", ViewUtil.beatufyBusinessPhone(phones));

		ViewUtil.sendJSON(response, resultMap);

		return null;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/insertContact")
	public String insertContact(HttpServletRequest request,
			HttpServletResponse response, InsertCardModel input, Model model)
			throws IOException {

		Contact_Groups contact = new Contact_Groups();
		contact.setGroup_name(input.getName());
		contact.setGroup_description(input.getDesc());
		contactGroupDAO.insertPhone(contact);

		List<Contact_Groups> contacts = contactGroupDAO.getAllContactGroups();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("contactGroups", contacts);

		ViewUtil.sendJSON(response, resultMap);

		return null;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/insertBusinessContact")
	public String insertBusinessContact(HttpServletRequest request,
			HttpServletResponse response, InsertBusinessContactModel input,
			Model model) throws IOException {

		Business_Card card = businessCardDAO.getBusinessCardById(input
				.getCardId());

		Contact_Groups cGroup = contactGroupDAO
				.getBusinessContactGroupById(input.getGroupId());

		Business_Contact bContact = new Business_Contact();
		bContact.setBusiness(card);
		bContact.setGroups(cGroup);

		businessContactDAO.insertContact(bContact);

		List<Business_Contact> businessContacts = businessContactDAO
				.getAllBusinessContacts();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("businessContacts",
				ViewUtil.beatufyBusinessContacts(businessContacts));

		ViewUtil.sendJSON(response, resultMap);

		return null;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/searchCard")
	public String searchCard(HttpServletRequest request,
			HttpServletResponse response, String s_name, Model model)
			throws IOException {
		List<Business_Card> cards = businessCardDAO
				.getBusinessCardByName(s_name);

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("cards", cards);

		ViewUtil.sendJSON(response, resultMap);

		return null;
	}
}
