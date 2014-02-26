

function cardPanel(response){
	var bCardPanel = Ext.getCmp('bCardPanel'), gridCard = Ext.getCmp('gridCard');

	if(bCardPanel){
		Ext.create('Ext.data.Store', {
			storeId:'gridStore',
			fields:['name', 'description'],
			data:{'items':Ext.decode(response.responseText)[0].cards},
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					root: 'items'
				}
			}
		});
		gridCard.reconfigure('gridStore',[
		            			          {header: 'Name',  dataIndex: 'name'},
		            			          {header: 'Description', dataIndex: 'description', flex:1}
		            			          ]);
		gridCard.getStore().load();
		bCardPanel.show();
	} else{
		Ext.create('Ext.data.Store', {
			storeId:'gridStore',
			fields:['name', 'description'],
			data:{'items':Ext.decode(response.responseText)[0].cards},
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					root: 'items'
				}
			}
		});
		
		var grid = Ext.create('Ext.grid.Panel', {
			id : 'gridCard',
			title: 'Business Card Grid',
			store: Ext.data.StoreManager.lookup('gridStore'),
			columns: [
			          {header: 'Name',  dataIndex: 'name'},
			          {header: 'Description', dataIndex: 'description', flex:1}
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
				var name = Ext.getCmp('name').getValue(),desc = Ext.getCmp('desc').getValue();

				Ext.Ajax.request({
					url: 'insertCard',
					method: "POST",
					params: {
						"name":name,
						"desc":desc
					},
					success: function(response, opts) {
						Ext.create('Ext.data.Store', {
							storeId:'gridStore',
							fields:['name', 'description'],
							data:{'items':Ext.decode(response.responseText)[0].cards},
							proxy: {
								type: 'memory',
								reader: {
									type: 'json',
									root: 'items'
								}
							}
						});
						var gridCard = Ext.getCmp('gridCard');
						gridCard.reconfigure('gridStore',[
						            			          {header: 'Name',  dataIndex: 'name'},
						            			          {header: 'Description', dataIndex: 'description', flex:1}
						            			          ]);
						gridCard.getStore().load();
						gridCard.getView().refresh();
					},
					failure: function(response, opts) {

					}
				});
			}
		});
		
		var searchBtn = Ext.create('Ext.Button', {
			text: 'search',
			id: 'searchBtn',
			renderTo: Ext.getBody(),
			handler: function() {
				var s_name = Ext.getCmp('s_name').getValue();

				Ext.Ajax.request({
					url: 'searchCard',
					method: "POST",
					params: {
						"s_name":s_name
					},
					success: function(response, opts) {
						Ext.create('Ext.data.Store', {
							storeId:'gridStore',
							fields:['name', 'description'],
							data:{'items':Ext.decode(response.responseText)[0].cards},
							proxy: {
								type: 'memory',
								reader: {
									type: 'json',
									root: 'items'
								}
							}
						});
						var gridCard = Ext.getCmp('gridCard');
						gridCard.reconfigure('gridStore',[
						            			          {header: 'Name',  dataIndex: 'name'},
						            			          {header: 'Description', dataIndex: 'description', flex:1}
						            			          ]);
						gridCard.getStore().load();
						gridCard.getView().refresh();
					},
					failure: function(response, opts) {

					}
				});
			}
		});


		var bCardPanel = Ext.create('Ext.panel.Panel', {
			id: 'bCardPanel',
			title: 'Business Card Panel',
			width: 600,
			height: 450,
			renderTo: Ext.getBody(),
			layout: {
				type: 'vbox',       // Arrange child items vertically
				align: 'stretch',    // Each takes up full width
				padding: 5
			},
			items: [{
				xtype: 'textfield',
				id: 'name',
				name: 'name',
				fieldLabel: 'Name',
				allowBlank: false  // requires a non-empty value
			},{
				xtype: 'textfield',
				id: 'desc',
				name: 'desc',
				fieldLabel: 'Description',
				allowBlank: false  // requires a non-empty value
			}, {
				xtype: 'splitter'   // A splitter between the two child items
			}, insertBtn, grid,
			{
				xtype: 'textfield',
				id: 's_name',
				name: 's_name',
				fieldLabel: 'Search by Name',
			},
			,searchBtn] // An array of form fields

		});
		refreshPanelCenter(bCardPanel);
	}
	
}
