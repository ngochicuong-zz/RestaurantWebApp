function AddAccountDialog(account, callback) {
	
	this.account = account;
	this.callback = callback;
	this.contextMenuClassName = "Event-popup";
	this.contextMenuItemClassName = "Event__item";
	
	this.calendarItem;
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
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Account:"
					},
					{
						_name: "input",
						id: "user",
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
						_text: "Password: "
					},
					{
						_name: "input",
						id: "pass",
						type: "password"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Email: "
					},
					{
						_name: "input",
						id: "email",
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
						_text: "Role:  "
					},
					{
						_name: "input",
						id: "role",
						type: "number"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				style: "justify-content: center",
				_children : [
					{
						_name: "button",
						id: "accept",
						_text: "OK "
					},
					{
						_name: "button",
						id: "close",
						_text: "Cancel"
					}
				]
			}
		]
	});
	var thiz = this;
	window.setTimeout(function() {
		thiz.user = thiz.container.querySelector("#user");
		thiz.pass = thiz.container.querySelector("#pass");
		thiz.email = thiz.container.querySelector("#email");
		thiz.role = thiz.container.querySelector("#role");
		
		thiz.acceptButton = thiz.container.querySelector("#accept");
		thiz.closeButton = thiz.container.querySelector("#close");
		
		if (thiz.account != null) {
			thiz.acceptButton.innerHTML = "Save";
			thiz.user.value = thiz.account.user;
			thiz.pass.value = thiz.account.pass;
			thiz.email.value = thiz.account.email;
			thiz.role.value = thiz.account.role;
		}
		
		thiz.acceptButton.addEventListener("click", function(event) {
			thiz.onAccept();
		});
		thiz.closeButton.addEventListener("click", function(event) {
			thiz.onCancel();
		});
	}, 10);
	
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

AddAccountDialog.prototype.onAccept = function() {
	var thiz = this;
	if (this.account) {
		var callback = function(updated){
		}
		serverReport.getJson("/updateAccount.do", "POST", callback, {
			"userId" : thiz.account.id,
			"user" : thiz.user.value,
			"pass" : thiz.pass.value,
			"email" : thiz.email.value,
			"role": thiz.role.value,
		});
	} else {
		var callback = function(created){
			if (!created) return;
		}
		serverReport.getBoolean("/createAccount.do", "POST", callback, {
					"user" : thiz.user.value,
					"pass" : thiz.pass.value,
					"email" : thiz.email.value,
					"role": thiz.role.value,
				});
	}
	
//	var args = this.calendarItem;
//	args.start = new DayPilot.Date(moment(start).format('YYYY-MM-DDTHH:mm:ss').toString());
//	args.end = new DayPilot.Date(moment(end).format('YYYY-MM-DDTHH:mm:ss').toString());
//	var e = new DayPilot.Event({
//	      start: args.start,
//	      end: args.end,
//	      id: DayPilot.guid(),
//	      resource: args.resource,
//	      text: thiz.customerName.value + "<br/>" + thiz.customerPhone.value + "<br/>" + thiz.customerCapacity.value + "<br/>" + thiz.customerMail.value, 
//	      cusName: thiz.customerName.value,
//	      cusPhone: thiz.customerPhone.value,
//	      cusMail: thiz.customerMail.value,
//	      cusCapacity: thiz.customerCapacity.value
//	  });
//	
//	

	this.close();
}

AddAccountDialog.prototype.onCancel = function() {
	this.close();
}

AddAccountDialog.prototype.getContainer = function() {
	return this.container;
}

AddAccountDialog.prototype.show = function() {
	var thiz = this;
	document.body.appendChild(this.container);
	document.body.appendChild(this.busyBackground);
	window.setTimeout(function(){
		thiz.positionContainer();
	}, 10)
	
}

AddAccountDialog.prototype.close = function() {
	document.body.removeChild(this.container);
	document.body.removeChild(this.busyBackground);
	if (this.callback) this.callback();
}

AddAccountDialog.prototype.positionContainer = function(){
	var container = this.container;
	container.style.left = (window.innerWidth - container.offsetWidth) / 2 + "px";
	container.style.top = (window.innerHeight - container.offsetHeight) / 2 + "px";
	
}





