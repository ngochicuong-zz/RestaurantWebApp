function InputPopup(targetNode, quality) {
	this.contextMenuClassName = "combo-popup";
	this.contextMenuItemClassName = "combo-popup__item";
	this.contextMenuLinkClassName = "context-menu__link";
	this.contextMenuActive = "context-menu--active";
	
	this.targetNode = targetNode;
	this.onAccept;
	this.menu = Dom.newDOMElement({
		_name : "nav",
		style: "background-color: #fff; box-shadow: none",
		class : "combo-popup",
		_children : [
			{
				_name : "hbox",
				flex:"1",
				style: "padding: 0.5em; justify-content: center",
				class: "combo-popup__item",
				_children: [
					{
						_name : "input",
						style: "width: 4em; text-align: center",
						id: "quality",
						value : quality,
						type: "number"
					
					},
					{
						_name : "button",
						id: "acceptButton",
						style: "background-color: #f5790000",
						_children: [
							{
								_name : "i",
								class : "material-icons md-dark md-12",
								_text : "check"
							}
						]
					
					},
					{
						_name : "button",
						id: "cancelButton",
						style: "background-color: #f5790000",
						_children: [
							{
								_name : "i",
								class : "material-icons md-dark md-12",
								_text : "clear"
							}
						]
					
					}
				]
			}
		]
	});
	this.quality = this.menu.querySelector("#quality");
	this.cancelButton = this.menu.querySelector("#cancelButton");
	this.acceptButton = this.menu.querySelector("#acceptButton");
	this.acceptButton.addEventListener("click", function() {
		if (thiz.onAccept != null) thiz.onAccept(thiz.quality.value);
		thiz.toggleMenuOff();
	}, false);
	this.cancelButton.addEventListener("click", function() {
		thiz.toggleMenuOff();
	}, false);
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
	
	this.renderHandler;
	document.addEventListener("click", function(e) {
		if (e.target != thiz.quality) {
			thiz.toggleMenuOff();
		}
		
	}, true);
	this.menu.addEventListener("click", function(e){
		if (thiz.action == null) return;
		var item = Dom.findUpward(e.target, {
			eval : function(node) {
				return node.data != null;
			}
		})
		thiz.action(item);
	})
	window.setTimeout(function() {
		thiz.quality.focus();
	}, 10);
}

InputPopup.prototype.getMenu = function() {
	return this.menu;
}

InputPopup.prototype.toggleMenuOn = function() {
	this.positionMenu();
	this.flag = true;
	var thiz = this;
	window.setTimeout(function() {
		thiz.targetNode.appendChild(thiz.menu);
	})
}

InputPopup.prototype.toggleMenuOff = function() {
	this.targetNode.removeChild(this.menu);
}

InputPopup.prototype.positionMenu = function(){
	this.menu.style.width = this.targetNode.offsetWidth + "px";
	this.menu.style.height = this.targetNode.offsetHeight + "px";
	this.menu.style.left = this.targetNode.offsetLeft + "px";
	this.menu.style.top = this.targetNode.offsetTop + "px";
}

