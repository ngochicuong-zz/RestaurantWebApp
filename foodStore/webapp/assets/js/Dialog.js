function Dialog() {
	this.contextMenuClassName = "dialog-popup";
	
	this.busyBackground = Dom.newDOMElement({
		_name: "div",
		style: "position: absolute; height:100%; width:100%; z-index: 99; top: 0px"
	});
	this.container = Dom.newDOMElement({
		_name : "vbox",
		class : this.contextMenuClassName,
		_children: [
			{
				_name : "hbox",
				_children : [
					{
						_name: "h4",
						id: "title"
					}
				]
			},
			{
				_name : "hbox",
				style: "padding-left: 1em",
				_children : [
					{
						_name: "p",
						id: "info"
					}
				]
			},
			{
				_name : "hbox",
				flex: "1",
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
						flex: "1",
						style: "justify-content: flex-end",
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
	this.extraButton = this.container.querySelector("#extra");
	this.extraButton.style.display= "none";
	this.closeButton.style.display= "none";
	this.acceptButton.addEventListener("click", function(event) {
		if(thiz.onAccept != null) thiz.onAccept();
		thiz.close();
	});
	this.closeButton.addEventListener("click", function(event) {
		if(thiz.onCancel != null) thiz.onCancel();
		thiz.close();
	});
	
	this.extraButton.addEventListener("click", function(event) {
		var callback = function(){
			thiz.close();
		}
		if(thiz.onExtra != null) thiz.onExtra(thiz.container, callback);
		
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

Dialog.prototype.show = function(title, info, acceptBtnName,onAccept, cancelBtnName, onCancel, extraButnName, onExtra) {
	var thiz = this;
	this.title = thiz.container.querySelector("#title");
	this.info = thiz.container.querySelector("#info");
	this.title.innerHTML = title;
	this.info.innerHTML = info;
	this.acceptBtnName.innerHTML = acceptBtnName;
	this.onAccept = onAccept;
	if (extraButnName != null || onExtra != null) {
		this.extraButton.style.display= "inherit";
		extraButnName != null ? this.extraButton.innerHTML = extraButnName : "";
		onExtra != null ? this.onExtra = onExtra : "";
		
	} 
	if (cancelBtnName != null || onCancel != null) {
		this.closeButton.style.display= "inherit";
		this.closeButton.innerHTML = cancelBtnName;
		this.onCancel = onCancel;
	}
	
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

Dialog.alert = function (title, info, acceptBtnName, onAccept, cancelBtnName, onCancel,  extraButnName, onExtra) {
	var dgl = new Dialog(); 
	dgl.show(title, info, acceptBtnName, onAccept, cancelBtnName, onCancel,  extraButnName, onExtra);
}





