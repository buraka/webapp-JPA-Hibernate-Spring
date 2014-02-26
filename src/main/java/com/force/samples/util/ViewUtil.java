package com.force.samples.util;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import com.force.samples.entity.Business_Contact;
import com.force.samples.entity.Business_Phone;

public class ViewUtil {
	
	public static ArrayList<Map<String,Object>> beatufyBusinessPhone(List<Business_Phone> phones){
		ArrayList<Map<String, Object>> resultMap = new ArrayList<Map<String,Object>>();
		
		for(Business_Phone phone : phones){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("business_card_name", phone.getBusiness_card().getName());
			map.put("phone_area_code", phone.getPhone_area_code());
			map.put("phone_number", phone.getPhone_number());
			resultMap.add(map);
		}
		
		return resultMap;
	}

	public static ArrayList<Map<String,Object>> beatufyBusinessContacts(List<Business_Contact> businessContacts){
		ArrayList<Map<String, Object>> resultMap = new ArrayList<Map<String,Object>>();
		
		for(Business_Contact businessContact : businessContacts){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("business_card_name", businessContact.getBusiness().getName());
			map.put("contact_groups_name", businessContact.getGroups().getGroup_name());
			resultMap.add(map);
		}
		
		return resultMap;
	}
	
	public static void sendJSON(HttpServletResponse response,Map<String, Object> resultMap) throws IOException{
		JSONArray jsonObject = JSONArray.fromObject(resultMap);
		response.setContentType("application/json; charset=UTF-8");
		PrintWriter printout = response.getWriter();

		printout.print(jsonObject.toString());
		printout.flush();
	}
}
