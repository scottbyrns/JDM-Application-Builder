LiveWidgets.addWidget({
	
	name: "view-controller",
	model: {},
	controller: {
		
		handleMessage: function (message, channel) {
			if (message == "show-view") {
				var elements = this.element.getElementsByTagName("*", this.element);
				for (var i = 0; i < elements.length; i += 1) {
					if (elements[i].getAttribute("data-view") && elements[i].getAttribute("data-view") == channel) {
						elements[i].style.display = "block";
					}
					else if (elements[i].getAttribute("data-view"))
					{
						elements[i].style.display = "none";
					}
				}	
			}
		}
		
	},
	constructor: function () {
		if (this.element.getAttribute("data-default")) {
			this.controller.handleMessage("show-view", this.element.getAttribute("data-default"));
		}
	},
	reinit: function () {
		
	}
	
})