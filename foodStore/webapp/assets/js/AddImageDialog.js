function AddImageDialog(imageCode, callback) {
	this.imageCode = imageCode ? imageCode : "";
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
				flex:"1",
				_children : [
					{
						_name : "input",
						id: "file-dialog",
						type: "file"
					}
				]
			},
			{
				_name : "hbox",
				flex:"1",
				_children : [
					{
						_name: "img",
						style: "min-height: 20em; max-height: 20em; max-width: 30em",
						id: "image"
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
	this.hasMoved = false;
	this.lastX;
	this.lastY;
	this.container.addEventListener("mousedown", function(e) {
		thiz.hasMoved = true;
		thiz.lastX = e.clientX;
		thiz.lastY = e.clientY;
	});
	this.container.addEventListener("mouseup", function(e) {
		thiz.hasMoved = false;
	});
	
	document.body.addEventListener("mousemove", function(e) {
		if (!thiz.hasMoved) return;
		console.log(e);
		var left = e.clientX - thiz.lastX;
		var top = e.clientY - thiz.lastY;
		thiz.lastX = e.clientX;
		thiz.lastY = e.clientY;
		var container = thiz.container;
		console.log(container);
		var conleft = parseInt(container.style.left.replace("px", ""));
		var contop = parseInt(container.style.top.replace("px", ""));
		conleft += left;
		contop += top;
		container.style.left = conleft + "px";
		container.style.top = contop + "px";
	})
	window.setTimeout(function() {
		thiz.image = thiz.container.querySelector("#image");
		thiz.fileDialog = thiz.container.querySelector("#file-dialog");
		
		thiz.acceptButton = thiz.container.querySelector("#accept");
		thiz.closeButton = thiz.container.querySelector("#close");
		thiz.acceptButton.disabled = true;
		if (thiz.imageCode != "") {
			var callback = function(image) {
				if (image.length == 0) return;
				thiz.acceptButton.innerHTML = "Thay đổi";
				thiz.image.src = image[0].imageByte;
				Main.busyHandler.unWait();
			}
			serverReport.getJson("/getImageByCode.do", "GET",
					callback, {
						"code" : thiz.imageCode
			});
			Main.busyHandler.waitting();
		}
		
		thiz.acceptButton.addEventListener("click", function(event) {
			thiz.onAccept();
		});
		thiz.closeButton.addEventListener("click", function(event) {
			thiz.onCancel();
		});
		
		thiz.fileDialog.addEventListener("change", function(evt){
			if (!evt.target.files) return;
			var f = evt.target.files[0]; 
			 var r = new FileReader();
		      r.onload = function(e) { 
			      thiz.image.src = e.target.result;
			      thiz.acceptButton.disabled = false;
			      Main.busyHandler.unWait();
		      }
		      r.readAsDataURL(f);
		      Main.busyHandler.waitting();
		});
		
	}, 10);
}

AddImageDialog.prototype.sendRequest = function(code, image) {
	var callback = function(imageRepo) {
		console.log(imageRepo);
	}
	serverReport.getJson("/addPromoImage.do", "POST",
			callback, {
				"code" : code,
				"image": image
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

AddImageDialog.prototype.onAccept = function() {
	this.sendRequest(this.imageCode, this.image.src);
	this.close();
}

AddImageDialog.prototype.onCancel = function() {
	this.close();
}

AddImageDialog.prototype.getContainer = function() {
	return this.container;
}	

AddImageDialog.prototype.show = function() {
	var thiz = this;
	document.body.appendChild(this.container);
	document.body.appendChild(this.busyBackground);
	window.setTimeout(function(){
		thiz.positionContainer();
	}, 10)
	
}

AddImageDialog.prototype.close = function() {
	document.body.removeChild(this.container);
	document.body.removeChild(this.busyBackground);
}

AddImageDialog.prototype.positionContainer = function(){
	var container = this.container;
	container.style.left = (window.innerWidth - container.offsetWidth) / 2 + "px";
	container.style.top = (window.innerHeight - container.offsetHeight) / 2 + "px";
	
}

AddImageDialog.prototype.validate = function(){
	if (this.user.value == "") {
		this.user.style.background="red";
		return false;
	}
	return true;
	
}





