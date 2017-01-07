function InputPopup() {
	this.contextMenuClassName = "combo-popup";
	this.contextMenuItemClassName = "combo-popup__item";
	this.contextMenuLinkClassName = "context-menu__link";
	this.contextMenuActive = "context-menu--active";

	this.taskItemClassName = "task";
	this.taskItemInContext;

	this.clickCoords;
	this.clickCoordsX;
	this.clickCoordsY;

	this.menu = this.menu = Dom.newDOMElement({
		_name : "nav",
		class : "combo-popup",
		style : "overflow-y: auto"
	});
	this.menuItems;
	this.menuState = 0;
	this.menuWidth;
	this.menuHeight;
	this.menuPosition;
	this.menuPositionX;
	this.menuPositionY;

	this.windowWidth;
	this.windowHeight;
	this.flag = false;
	
	this.handleItem;
	this.targetNode;
	
//	this.body = document.getElementById("main-container");
	this.actions={};
	var thiz = this;
	document.addEventListener("click", function(e) {
		if (thiz.flag && e.button == 0) {
			thiz.flag = false;
			thiz.toggleMenuOff();
		}
		
	}, true);
	
	this.renderHandler;
	
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

InputPopup.prototype.renderItems = function(items) {
	if (this.renderHandler == null) return;
	this.renderHandler(this.menu, items);
	
}

InputPopup.prototype.getMenu = function() {
	return this.menu;
}

InputPopup.prototype.toggleMenuOn = function(targetNode) {
	this.positionMenu(targetNode);
	this.flag = true;
	
	var thiz = this;
	window.setTimeout(function() {
		targetNode.appendChild(thiz.menu);
	})
}

InputPopup.prototype.toggleMenuOnCenter = function() {
	var w = 300;
	var h = 300;
	this.menu.style.width = w + "px";
	this.menu.style.height = h + "px";
	this.menu.style.left = (window.innerWidth - w) / 2 + "px";
	this.menu.style.top = (window.innerHeight - h) / 2 + "px";
	
	this.flag = true;
	
	var thiz = this;
	window.setTimeout(function() {
		document.body.appendChild(thiz.menu);
	})
}

InputPopup.prototype.toggleMenuOff = function() {
	document.body.removeChild(this.menu);
}

InputPopup.prototype.positionMenu = function(targetNode){
	this.menu.style.width = targetNode.offsetWidth + "px";
	this.menu.style.height = targetNode.offsetHeight + "px";
}

