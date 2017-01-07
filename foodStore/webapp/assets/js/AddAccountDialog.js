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
						_text: "Tài khoản:"
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
						_text: "Mật khẩu: "
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
						type: "email"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Phân quyền:  "
					},
					{
						_name: "select",
						id: "role",
						type: "number",
						_children: [
							{
								_name: "option",
								value: 0,
								_text: "User"
							},
							{
								_name: "option",
								value: 1,
								_text: "Manager"
							},
							{
								_name: "option",
								value: 2,
								_text: "Admin"
							},
							{
								_name: "option",
								value: 3,
								_text: "Recipt"
							},{
								_name: "option",
								value: 4,
								_text: "Kitchen"
							},
							{
								_name: "option",
								value: 5,
								_text: "Cashier"
							}
						]

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
						_text: "Đóng"
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
	if (!this.validate()) {
		alert("Vui lòng điền đầy đủ thông tin");
		return;
	};
	if (this.account) {
		var callback = function(updated){
			if (updated) {
				thiz.account.user = thiz.user.value;
				thiz.account.pass = thiz.pass.value,
				thiz.account.email = thiz.email.value;
				thiz.account.role = thiz.role.options[thiz.role.selectedIndex].value;
				if (thiz.callback) thiz.callback(thiz.account);
			}
		}
		serverReport.getJson("/updateAccount.do", "POST", callback, {
			"userId" : thiz.account.id,
			"user" : thiz.user.value,
			"pass" : thiz.pass.value,
			"email" : thiz.email.value,
			"role": thiz.role.options[thiz.role.selectedIndex].value,
		});
	} else {
		var callback = function(newAccount){
			if (newAccount) {
				thiz.account = newAccount;
				if (thiz.callback) thiz.callback(thiz.account);
			}
		}
		serverReport.getJson("/createAccount.do", "POST", callback, {
					"user" : thiz.user.value,
					"pass" : thiz.pass.value,
					"email" : thiz.email.value,
					"role": thiz.role.options[thiz.role.selectedIndex].value,
				});
	}
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
}

AddAccountDialog.prototype.positionContainer = function(){
	var container = this.container;
	container.style.left = (window.innerWidth - container.offsetWidth) / 2 + "px";
	container.style.top = (window.innerHeight - container.offsetHeight) / 2 + "px";

}

AddAccountDialog.prototype.validate = function(){
	var check = true;
	if (this.user.value == "") {
		this.user.style.background="red";
		check = false;
	} else {
		this.user.style.background="#fff";
	}

	if (this.pass.value == "") {
		this.pass.style.background="red";
		check = false;
	}else {
		this.pass.style.background="#fff";
	}

	if (this.email.value == "") {
		this.email.style.background="red";
		check = false;
	}else {
		this.email.style.background="#fff";
	}
	return check;
}
