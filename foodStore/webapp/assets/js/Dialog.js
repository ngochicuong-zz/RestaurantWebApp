function Dialog() {
	this.contextMenuClassName = "combo-popup";
	this.contextMenuItemClassName = "combo-popup__item";
	this.contextMenuLinkClassName = "context-menu__link";
	this.contextMenuActive = "context-menu--active";
	
	this.busyBackground = Dom.newDOMElement({
		_name: "div",
		style: "position: absolute; height:100%; width:100%; z-index: 99; top: 0px"
	});
	this.container = Dom.newDOMElement({
		_name : "vbox",
		class : "combo-popup",
		_children: [
			{
				_name : "hbox",
				_children : [
					{
						_name: "h5",
						id: "title"
					}
				]
			},
			{
				_name : "hbox",
				_children : [
					{
						_name: "p",
						id: "info"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name : "hbox",
						class: "InputRow",
						_children : [
							{
								_name: "button",
								id: "extra",
								_text: "extra "
							}
						]
					},
					{
						_name : "hbox",
						class: "InputRow",
						_children : [
							{
								_name: "button",
								id: "close",
								_text: "Cancel"
							},
							{
								_name: "button",
								id: "accept",
								_text: "Ok "
							}
						]
					}
				]
			}
		]
	});
	var thiz = this;
	this.acceptButton = this.container.querySelector("#accept");
	this.closeButton = this.container.querySelector("#close");
	this.acceptButton.addEventListener("click", function(event) {
		if(thiz.onAccept != null) thiz.onAccept();
		thiz.close();
	});
	this.closeButton.addEventListener("click", function(event) {
		if(thiz.onCancel != null) thiz.onCancel();
		thiz.close();
	});
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



Dialog.prototype.getContainer = function() {
	return this.container;
}

Dialog.prototype.show = function(title, info, acceptBtnName,onAccept, cancelBtnName, onCancel) {
	var thiz = this;
	this.title = thiz.container.querySelector("#title");
	this.info = thiz.container.querySelector("#info");
	this.title.innerHTML = title;
	this.info.innerHTML = info;
	this.acceptButton.innerHTML = acceptBtnName;
	this.closeButton.innerHTML = cancelBtnName;
	this.onAccept = onAccept;
	this.onCancel = onCancel;
	document.body.appendChild(this.container);
	document.body.appendChild(this.busyBackground);
	window.setTimeout(function(){
		thiz.positionContainer();
	}, 10)
	
}

Dialog.prototype.close = function() {
	document.body.removeChild(this.container);
	document.body.removeChild(this.busyBackground);
}

Dialog.prototype.positionContainer = function(){
	var container = this.container;
	container.style.left = (window.innerWidth - container.offsetWidth) / 2 + "px";
	container.style.top = (window.innerHeight - container.offsetHeight) / 2 + "px";
	
}

Dialog.alert = function (title, info, acceptBtnName, onAccept, cancelBtnName, onCancel) {
	var dgl = new Dialog(); 
	dgl.show(title, info, acceptBtnName, onAccept, cancelBtnName, onCancel);
}





