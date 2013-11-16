// socket.emit("create-new-project", JSON.stringify({
// 
// 
// 	name: "test",
// 	description: "testing project creation",
// 
// 	groupId: "xxx.test",
// 	projectId: "TestProject",
// 	version: "1.0.0-TEST",
// 	sources: [],
// 	dependencies: []
// 
// 
// }));



LiveWidgets.addWidget({

	name: "create-project",
	
	model: {
		textProperties: [
			"name",
			"description",
			
			"groupId",
			"projectId",
			"version",
			
			"workingDirectory",
			
			"url",
			"scm",
			"issueTracking"
		]
	},
	
	controller: {
		
		
		getFormValues: function () {
			
			for (var i = 0, len = this.model.textProperties.length; i < len; i += 1) {
				
				this.model.pom[
					this.model.textProperties[i]
				]
				
				=
				
				this.element.getElementsByName(
					this.model.textProperties[i]
				)[0];
				
			}
			
		},
		
		
		addIcon: function (iconDataUrl) {
			
			this.model.pom.icon = iconDataUrl;
			
		},
		
		addPom: function (pom) {
			
		},
		
		addSource: function (source) {
			
			console.log("Adding Source File");
			
			this.model.pom.sources.push(source);

		},
		
		addDependency: function (dependency) {
			
			console.log("Adding Dependency");
			
			this.model.pom.dependencies.push(dependency);
			
		},
		
		removeDependency: function (dependency) {
			
		},
		
		doCreateProject: function () {
			
		},
		
		
		
		handleMessage: function (message, channel) {
			
			if (channel == "add-icon") {
				this.controller.addIcon(message);
			}
			
			if (channel == "add-pom") {
				this.controller.addPom(message);				
			}
			
			if (channel == "add-readme") {
				
			}
			
			if (channel == "add-pom") {
				
			}
			
			if (channel == "add-source") {
				this.controller.addSource(message);
			}
			
			if (channel == "add-dependency") {
				this.controller.addDependency(message);
			}
			
			if (channel == "remove-dependency") {
				this.controller.removeDependency(message);
			}
			
			if (channel == "do-create-project") {
				this.controller.doCreateProject(message);
			}
			
		}
		
	},
	
	constructor: function () {
		this.model.pom = {
			dependencies: [],
			sources: []
		};
	},
	
	reinit: function () {
		
	}
	
});