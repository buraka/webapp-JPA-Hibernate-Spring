

function contactGroupsPanel(response){
	var cGroupPanel = Ext.getCmp('cGroupPanel'), gridContact = Ext.getCmp('gridContact');

	if(cGroupPanel){
		Ext.create('Ext.data.Store', {
			storeId:'gridStore',
			fields:['group_name', 'group_description'],
			data:{'items':Ext.decode(response.responseText)[0].contactGroups},
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					root: 'items'
				}
			}
		});
		gridContact.reconfigure('gridStore',[
		            			          {header: 'Group Name',  dataIndex: 'group_name'},
		            			          {header: 'Group Description', dataIndex: 'group_description', flex:1}
		            			          ]);
		gridContact.getStore().load();
		cGroupPanel.show();
	} else{
		Ext.create('Ext.data.Store', {
			storeId:'gridStore',
			fields:['group_name', 'group_description'],
			data:{'items':Ext.decode(response.responseText)[0].contactGroups},
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					root: 'items'
				}
			}
		});
		
		var grid = Ext.create('Ext.grid.Panel', {
			id : 'gridContact',
			title: 'Contact Groups Grid',
			store: Ext.data.StoreManager.lookup('gridStore'),
			columns: [
			          {header: 'Group Name',  dataIndex: 'group_name'},
			          {header: 'Group Description', dataIndex: 'group_description', flex:1}
			          ],
			          height: 280,
			          width: 600,
			          renderTo: Ext.getBody()
		});

		var insertBtn = Ext.create('Ext.Button', {
			text: 'insert',
			id: 'insertCardBtn',
			renderTo: Ext.getBody(),
			handler: function() {
				var name = Ext.getCmp('g_name').getValue(),desc = Ext.getCmp('g_desc').getValue();

				Ext.Ajax.request({
					url: 'insertContact',
					method: "POST",
					params: {
						"name":name,
						"desc":desc
					},
					success: function(response, opts) {
						Ext.create('Ext.data.Store', {
							storeId:'gridStore',
							fields:['group_name', 'group_description'],
							data:{'items':Ext.decode(response.responseText)[0].contactGroups},
							proxy: {
								type: 'memory',
								reader: {
									type: 'json',
									root: 'items'
								}
							}
						});
						var gridContact = Ext.getCmp('gridContact');
						gridContact.reconfigure('gridStore',[
						               			          {header: 'Group Name',  dataIndex: 'group_name'},
						            			          {header: 'Group Description', dataIndex: 'group_description', flex:1}
						            			          ]);
						gridContact.getStore().load();
						gridContact.getView().refresh();
					},
					failure: function(response, opts) {

					}
				});
			}
		});

		var cGroupPanel = Ext.create('Ext.panel.Panel', {
			id: 'cGroupPanel',
			title: 'Contact Groups Panel',
			width: 600,
			height: 400,
			renderTo: Ext.getBody(),
			layout: {
				type: 'vbox',       // Arrange child items vertically
				align: 'stretch',    // Each takes up full width
				padding: 5
			},
			items: [{
				xtype: 'textfield',
				id: 'g_name',
				name: 'g_name',
				fieldLabel: 'Group Name',
				allowBlank: false  // requires a non-empty value
			},{
				xtype: 'textfield',
				id: 'g_desc',
				name: 'g_desc',
				fieldLabel: 'Group Description',
				allowBlank: false  // requires a non-empty value
			}, {
				xtype: 'splitter'   // A splitter between the two child items
			}, insertBtn, grid] // An array of form fields

		});
		refreshPanelCenter(cGroupPanel);
	}
	
}
