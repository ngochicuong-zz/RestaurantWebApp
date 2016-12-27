function CalendarDialog() {
	this.contextMenuClassName = "combo-popup";
	this.contextMenuItemClassName = "combo-popup__item";
	this.contextMenuLinkClassName = "context-menu__link";
	this.contextMenuActive = "context-menu--active";
	
	this.container = this.menu = Dom.newDOMElement({
		_name : "vbox",
		class : "combo-popup",
		_children: [
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Customer Name:"
					},
					{
						_name: "input",
						id: "customer-name",
						type: "text"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Phone: "
					},
					{
						_name: "input",
						id: "customer-phone",
						type: "text"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "button",
						id: "accept",
						_text: "Ok "
					},
					{
						_name: "button",
						id: "customer-phone",
						type: "text"
					}
				]
			}
		]
	});
	
	this.handleItem;
	this.targetNode;
	
	this.actions={};
	this.renderHandler;
	var thiz = this;
	this.menu.addEventListener("click", function(e){
		if (thiz.action == null) return;
		var item = Dom.findUpward(e.target, {
			eval : function(node) {
				return node.data != null;
			}
		})
		thiz.action(item);
	})
}

/*
 * [{name: " ", handler: function}] <nav id="context-menu" class="context-menu">
 * <ul class="context-menu__items"> <li class="context-menu__item"> <a href="#"
 * class="context-menu__link" data-action="View"><i class="fa fa-eye"></i>
 * View Task</a> </li> <li class="context-menu__item"> <a href="#"
 * class="context-menu__link" data-action="Edit"><i class="fa fa-edit"></i>
 * Edit Task</a> </li> <li class="context-menu__item"> <a href="#"
 * class="context-menu__link" data-action="Delete"><i class="fa fa-times"></i>
 * Delete Task</a> </li> </ul> </nav>
 * 
 * 
 */

CalendarDialog.prototype.renderItems = function() {
	if (this.renderHandler == null) return;
	this.renderHandler(this.menu, items);
	
}

CalendarDialog.prototype.getMenu = function() {
	return this.menu;
}

CalendarDialog.prototype.show = function() {
	this.positionMenu(targetNode);
//	this.renderItems();
	document.body.appendChild(this.menu);
//	this.handleItem = e.dataNode;
	this.flag = true;
	
}

CalendarDialog.prototype.close = function() {
	document.body.removeChild(this.menu);
}

CalendarDialog.prototype.positionMenu = function(targetNode){
	var menu = this.menu;
	menu.style.width = targetNode.offsetWidth + "px";
	menu.style.height = "200px";
	menu.style.left = targetNode.offsetLeft + "px";
	menu.style.top = targetNode.offsetTop - 202 + "px";
	
}





