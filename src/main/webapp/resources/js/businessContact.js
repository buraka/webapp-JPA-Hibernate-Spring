
function businessContactPanel(response){
	var bContactPanel = Ext.getCmp('bContactPanel'), gridBusContact = Ext.getCmp('gridBusContact');

	if(bContactPanel){
		Ext.create('Ext.data.Store', {
			storeId:'gridStore',
			fields: ["business_card_name",'contact_groups_name'],
			data:{'items':Ext.decode(response.responseText)[0].businessContacts},
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					root: 'items'
				}
			}
		});
		gridBusContact.getStore().load();
		bContactPanel.show();
	} else{
		Ext.create('Ext.data.Store', {
			storeId:'gridStore',
			fields: ["business_card_name",'contact_groups_name'],
			data:{'items':Ext.decode(response.responseText)[0].businessContacts},
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					root: 'items'
				}
			}
		});

		var insertPhoneBtn = Ext.create('Ext.Button', {
			text: 'insert',
			renderTo: Ext.getBody(),
			handler: function() {
				var cardCombo = Ext.getCmp('cardCombo').getValue(), groupCombo = Ext.getCmp('groupCombo').getValue();

				Ext.Ajax.request({
					url: 'insertBusinessContact',
					method: "POST",
					params: {
						"cardId":cardCombo,
						"groupId":groupCombo
					},
					success: function(response, opts) {
						Ext.create('Ext.data.Store', {
							storeId:'gridStore',
							fields: ["business_card_name",'contact_groups_name'],
							data:{'items':Ext.decode(response.responseText)[0].businessContacts},
							proxy: {
								type: 'memory',
								reader: {
									type: 'json',
									root: 'items'
								}
							}
						});
						var gridBusContact = Ext.getCmp('gridBusContact');
						gridBusContact.reconfigure('gridStore',[
						                                        {header: 'Business Card Name',  dataIndex: 'business_card_name'},
						                                        {header: 'Contact Group', dataIndex: 'contact_groups_name', flex:1}
						                                        ]);
						gridBusContact.getStore().load();
						gridBusContact.getView().refresh();
					},
					failure: function(response, opts) {

					}
				});
			}
		});

		var cardStore = Ext.create('Ext.data.Store', {
			fields: ['name', 'description'],
			data : Ext.decode(response.responseText)[0].cards
		});

		var cardCombo = Ext.create('Ext.form.ComboBox', {
			fieldLabel: 'Business Card',
			id: 'cardCombo',
			store: cardStore,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id',
			renderTo: Ext.getBody()
		});

		var groupStore = Ext.create('Ext.data.Store', {
			fields: ['group_name', 'group_description'],
			data : Ext.decode(response.responseText)[0].contactGroups
		});

		var groupCombo = Ext.create('Ext.form.ComboBox', {
			fieldLabel: 'Group Contacts',
			id: 'groupCombo',
			store: groupStore,
			queryMode: 'local',
			displayField: 'group_name',
			valueField: 'id',
			renderTo: Ext.getBody()
		});

		var gridBusContact = Ext.create('Ext.grid.Panel', {
			id : 'gridBusContact',
			title: 'Business Groups Grid',
			store: Ext.data.StoreManager.lookup('gridStore'),
			columns: [
			          {header: 'Business Card Name',  dataIndex: 'business_card_name'},
			          {header: 'Contact Group', dataIndex: 'contact_groups_name', flex:1}
			          ],
			          height: 270,
			          width: 600,
			          renderTo: Ext.getBody()
		});

		var bContactPanel = Ext.create('Ext.panel.Panel', {
			id: 'bContactPanel',
			title: 'Business Contact Grid',
			width: 600,
			height: 400,
			renderTo: Ext.getBody(),
			layout: {
				type: 'vbox',       // Arrange child items vertically
				align: 'stretch',    // Each takes up full width
				padding: 5
			},
			items: [cardCombo,groupCombo, {
				xtype: 'splitter'   // A splitter between the two child items
			},insertPhoneBtn, gridBusContact] // An array of form fields

		});

		refreshPanelCenter(bContactPanel);
	}

}