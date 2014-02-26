Ext.onReady(function () {

	var menu = Ext.create('Ext.menu.Menu', {
		floating: false,  // usually you want this set to True (default)
		renderTo: Ext.getBody(),  // usually rendered by it's containing component
		items: [{                        
			text: 'Select Business Card',
			handler:selectBusinessCard
		},{
			text: 'Select Business Phone',
			handler : selectBusinessPhone
		},{
			text: 'Select Contact Groups',
			handler : selectContactGroups
		}, {
			text: 'Select Business Contact',
			handler : selectBusinessContact
		}]
	});

	Ext.create('Ext.container.Viewport', {
		id : 'mainView',
		layout: 'border',
		items: [{
			region: 'north',
			html: '<h1 class="x-panel-header">Meb-Webapp</h1>',
			border: false,
		}, {
			region: 'west',
			collapsible: true,
			title: 'Navigation',
			items: menu
		},{
			region: 'center',
			activeTab: 0
		}]
	});

	selectBusinessCard();
	function selectBusinessCard(){
		Ext.Ajax.request({
			url: 'listCards',
			success: function(response, opts) {
				clear();
				cardPanel(response);
			},
			failure: function(response, opts) {
				console.log('server-side failure with status code ' + response.status);
			}
		});
	}

	function selectBusinessPhone() {
		Ext.Ajax.request({
			url: 'listPhones',
			success: function(response, opts) {
				clear();
				phonePanel(response);
			},
			failure: function(response, opts) {
				console.log('server-side failure with status code ' + response.status);
			}
		});
	};
	
	function selectContactGroups(){
		Ext.Ajax.request({
			url: 'listContactGroups',
			success: function(response, opts) {
				clear();
				contactGroupsPanel(response);
			},
			failure: function(response, opts) {
				console.log('server-side failure with status code ' + response.status);
			}
		});
	}
	
	function selectBusinessContact(){
		Ext.Ajax.request({
			url: 'listBusinessContact',
			success: function(response, opts) {
				clear();
				businessContactPanel(response);
			},
			failure: function(response, opts) {
				console.log('server-side failure with status code ' + response.status);
			}
		});
	}

});
