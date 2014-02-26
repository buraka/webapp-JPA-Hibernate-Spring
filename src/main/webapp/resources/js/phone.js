
function phonePanel(response){
	var bPhonePanel = Ext.getCmp('bPhonePanel'), gridPhone = Ext.getCmp('gridPhone');

	if(bPhonePanel){
		Ext.create('Ext.data.Store', {
			storeId:'newGridStore',
			fields: ["business_card_name",'phone_area_code', 'phone_number'],
			data:{'items':Ext.decode(response.responseText)[0].phones},
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					root: 'items'
				}
			}
		});
		gridPhone.getStore().load();
		bPhonePanel.show();
	} else{
		Ext.create('Ext.data.Store', {
			storeId:'newGridStore',
			fields: ["business_card_name",'phone_area_code', 'phone_number'],
			data:{'items':Ext.decode(response.responseText)[0].phones},
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
				var cardComboPhone = Ext.getCmp('cardComboPhone').getValue(), phone_area_code = Ext.getCmp('phone_area_code').getValue(),phone_number = Ext.getCmp('phone_number').getValue();

				Ext.Ajax.request({
					url: 'insertPhone',
					method: "POST",
					params: {
						"cardId":cardComboPhone,
						"phone_area_code":phone_area_code,
						"phone_number":phone_number
					},
					success: function(response, opts) {
						Ext.create('Ext.data.Store', {
							storeId:'newGridStore',
							fields: ["business_card_name",'phone_area_code', 'phone_number'],
							data:{'items':Ext.decode(response.responseText)[0].phones},
							proxy: {
								type: 'memory',
								reader: {
									type: 'json',
									root: 'items'
								}
							}
						});
						var gridPhone = Ext.getCmp('gridPhone');
						gridPhone.reconfigure('newGridStore',[
						           			           {header: 'Name',  dataIndex: 'business_card_name'},
						        			           {header: 'phone_area_code', dataIndex: 'phone_area_code', flex:1},
						        			           {header: 'phone_number', dataIndex: 'phone_number', flex:1}
						        			           ]);
						gridPhone.getStore().load();
						gridPhone.getView().refresh();
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

		var combo = Ext.create('Ext.form.ComboBox', {
			fieldLabel: 'Business Card',
			id: 'cardComboPhone',
			store: cardStore,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id',
			renderTo: Ext.getBody()
		});

		var gridPhone = Ext.create('Ext.grid.Panel', {
			id : 'gridPhone',
			title: 'Business Phone Grid',
			store: Ext.data.StoreManager.lookup('newGridStore'),
			columns: [
			           {header: 'Name',  dataIndex: 'business_card_name'},
			           {header: 'phone_area_code', dataIndex: 'phone_area_code', flex:1},
			           {header: 'phone_number', dataIndex: 'phone_number', flex:1}
			           ],
			height: 270,
			width: 600,
			renderTo: Ext.getBody()
		});

		var bPhonePanel = Ext.create('Ext.panel.Panel', {
			id: 'bPhonePanel',
			title: 'Business Phone Grid',
			width: 600,
			height: 400,
			renderTo: Ext.getBody(),
			layout: {
				type: 'vbox',       // Arrange child items vertically
				align: 'stretch',    // Each takes up full width
				padding: 5
			},
			items: [combo,{
				xtype: 'textfield',
				id: 'phone_area_code',
				maxLength: 5,
				name: 'phone_area_code',
				fieldLabel: 'Phone Area Code',
				allowBlank: false  // requires a non-empty value
			},{
				xtype: 'textfield',
				id: 'phone_number',
				name: 'phone_number',
				maxLength: 15,
				fieldLabel: 'Phone Number',
				allowBlank: false  // requires a non-empty value
			}, {
				xtype: 'splitter'   // A splitter between the two child items
			},insertPhoneBtn, gridPhone] // An array of form fields

		});

		refreshPanelCenter(bPhonePanel);
	}
	
}