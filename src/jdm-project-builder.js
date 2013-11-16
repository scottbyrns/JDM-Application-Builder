LiveWidgets.addWidget({
	
	name: "jdm-project-builder",
	
	model: {},
	
	controller: {
		
		handleDroppedFile: function (message, channel) {
			
			console.log(arguments);
			
			if (message.file.name == "pom.json") {
				
				console.log("pom");
				
				return;
				
			}
			
			
			
			if (message.file.name == "README.md") {
				
				console.log("readme");
				
				return;
				
			}
			
			// Pass to create-project;
			this.sendMessage({ file: message.file.name, data: message.data }, "add-source");
			
			
			
		},
		
		handleIconDrop: function (icon) {
			console.log(icon);
			this.element.getElementsByClassName("artifact-icon")[0].style.backgroundImage = "url(" + icon.data + ")";
			
			this.sendMessage(icon.data, "add-icon");
			
		},
		
		handleMessage: function (message, channel, id) {
			
			// console.log(arguments);
			
			if (channel == "dropped-file") {

				this.controller.handleDroppedFile(message, channel);
				
			}
			
			if (channel == "icon-dropzone") {
				
				this.controller.handleIconDrop(message);
				
			}
			
		}
		
	},
	
	constructor: function () {},
	
	reinit: function () {}
	
});