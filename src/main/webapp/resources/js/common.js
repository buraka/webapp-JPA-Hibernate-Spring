

function refreshPanelCenter(panel){
	var mainView = Ext.getCmp('mainView');
	var center = mainView.down('[region=center]');
	center.add(panel);
}

function clear(){
	var bCardPanel = Ext.getCmp('bCardPanel'),bPhonePanel = Ext.getCmp('bPhonePanel'),cGroupPanel = Ext.getCmp('cGroupPanel'),
	bContactPanel = Ext.getCmp('bContactPanel');
	if(bCardPanel !== undefined)
		bCardPanel.hide();
	if(bPhonePanel !== undefined)
		bPhonePanel.hide();
	if(cGroupPanel !== undefined)
		cGroupPanel.hide();
	if(bContactPanel !== undefined)
		bContactPanel.hide();
}