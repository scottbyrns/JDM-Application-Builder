var path = require('path');
var sys = require('sys');
var express = require ('express');
var exec = require('child_process').exec;
var fs = require('fs');
var options = {
    key: fs.readFileSync('SSL/privatekey.pem'),
    cert: fs.readFileSync('SSL/certificate.pem')
};

// NEVER use a Sync function except at start-up!
index = fs.readFileSync(__dirname + '/index.html');

//Create server
var app = express(options);

// Configure server
app.configure(function () {
	// Allow cross domain requests.
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

	  next();
	});
    //parses request body and populates request.body
    app.use(express.bodyParser());
    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());
    //perform route lookup based on url and HTTP method
    app.use(app.router);
    //Where to serve static content
    // app.use(express.static('./'));
	
	app.use(express.directory('./projects'));
	
	app.use(express.static('./projects'));
	

	
	app.all('/', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	 });
	
	
	app.get("/", function(req, res) {
  	  res.header("Access-Control-Allow-Origin", "*");
  	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

	    res.writeHead(200, {'Content-Type': 'text/html'});
	    res.end(index);
	});
    //Show all errors in development
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});


//Start server
var server = require('https');


// Send index.html to all requests
var server = server.createServer(options, app);

var io = require('socket.io').listen(server);



// var path = require('path');
// var sys = require('sys');
// var express = require ('express');
// var exec = require('child_process').exec;
// var fs = require('fs');
// // var options = {
// //     key: fs.readFileSync('SSL/privatekey.pem'),
// //     cert: fs.readFileSync('SSL/certificate.pem')
// // };
// 
// var Process = function (name) {
// 	this.name = name;
// 	this.stages = [];
// };
// 
// Process.prototype = {
// 	addStage: function (stage) {
// 		this.stages.push(stage);
// 	},
// 	perform: function () {
// 		for (var i = 0, len = this.stages.length; i < len; i += 1) {
// 			var stage = this.stages[i];
// 			
// 			stage.run();
// 		}
// 	}
// }
// 
// var Stage = function (name, runner, parameters) {
// 	this.name = name;
// 	this.runner = runner;
// 	this.parameters = parameters;
// };
// 
// Stage.prototype = {
// 	run: function () {
// 		this.runner.run(this.parameters);
// 	}
// };
// 
// var Runner = function (method, context) {
// 	this.method = method;
// 	this.context = context;
// };
// 
// Runner.prototype.run = function (parameters) {
// 	this.method.apply(this.context, parameters);
// }



// var createNewProject = new Process("create-new-project");
// 
// var createFilesystemPath = new Stage






// //Start server
// var server = require('http');
// 
// 
// // Send index.html to all requests
// var server = server.createServer();
// 
// var io = require('socket.io').listen(server);


function ensureTrailingForwardSlash (string) {
	if (string.slice(-1) != "/") {
		string = string + "/";
	}
	
	return string;
}






JDM = {
	
	createNewPackage: function (newPackage) {
		
		
		
		
		
		var data = JSON.parse(newPackage);
		
		var path = "./projects/" + JDM.pomToPath(data) + "src/"
		
		console.log(JSON.stringify(data, null, 5));
		

			
			
			
			
			
			exec(
				"mkdir -p " + path,
				function (error, stdout, stderr) { 
				
					var pom = {
					
					
						name: data.name,
						description: data.description,
					
						icon: data.icon,
					
						groupId: data.groupId,
						projectId: data.projectId,
						version: data.version,
					
						url: data.url,
						scm: data.scm,
						issueTracking: data.issueTracking,
					
						developers: data.developers,
					
						sources: [],
						dependencies: [],
					
						configuration: {
						
						
						
						}
					
					
					};
				
					// This is all async below unless callbacks are used.
					// Logging may not represent accurate trace.
					console.log("\n\nCreating Project");
					console.log("===========================================");
					
					console.log("\nSTAGE 1 - Write Source Files");
					
					JDM.writeSources(path, data.sources, data);
					
					console.log("STAGE 2 - Write POM File");
					
					pom.dependencies = JDM.simplifyDependencies(data.dependencies);
					
					JDM.writePom(path + "../", pom);

					console.log("STAGE 3 - Update Project Dataset\n");
					
					JDM.addProjectToProjectsDataset(data);
					
				}
			
			);
			

		
		
		
	},
	
	pomToPath: function (pom) {
		
		return pom.groupId.split(".").join("/") + "/" + pom.projectId + "/" + pom.version + "/";
		
	},
	
	simplifyDependencies: function (dependencies) {
		
		var simplifiedDependencies = [];
		
		for (var i = 0, len = dependencies.length; i < len; i += 1) {
	
			var fileContent = dependencies[i];

			simplifiedDependencies.push({
				groupId: fileContent.groupId,
				artifactId: fileContent.artifactId,
				version: fileContent.version
			});
	
		}
		
		return simplifiedDependencies;
		
	},
	
	writePom: function (path, pom, success, failure) {
		
		fs.writeFile(ensureTrailingForwardSlash(path) + "pom.json", JSON.stringify(pom, null, 4), function(err) {
		    if(err) {
		        console.log(err);
				if (failure) {
					failure();
				}
		    } else {
		        console.log("POM was created.");
				if (success) {
					success();
				}
		    }
		});

	},
	
	// Write a readme file to the specified path.
	writeReadme: function (path, readme, success, failure) {
	
		console.log("Writing README to " + path);
	
		fs.writeFile(ensureTrailingForwardSlash(path) + "README.md", readme, function(err) {
	    
			if(err) {
			
				console.log("Failed to write README to " + path);
			
				if (failure) {
					
					fialure();
					
				}
			
		    }
			else {
			
		        console.log("README written to " + path);
			
				if (success) {
					
					success();
					
				}
			
		    }
		
		});
	
	},
	
	writeSources: function (path, sources, pom) {
		
	
		for (var i = 0, len = sources.length; i < len; i += 1) {
		
			var fileContent = sources[i].data;
			var fileName = sources[i].file.name;

			if (fileName == "README.md") {
			
				if (pom.readmeData) {
				
					fileContent = pom.readmeData;
				
				}
				
				JDM.writeReadme(path + "../", fileContent);
			
			}
			else
			{

				pom.sources.push(fileName);
				JDM.writeFile(path, fileName, fileContent);					
			
			}
		
		}
		
	},

	writeFile: function (path, fileName, content, success, failure) {
	
		console.log("Writing " + fileName + " to " + path);
			
		path = ensureTrailingForwardSlash(path);
	
		fs.writeFile(ensureTrailingForwardSlash(path) + fileName, content, function(err) {
	    
			if(err) {
			
				console.log("Failed to write " + fileName + " to " + path);
			
				if (failure) {
					fialure();
				}
			
		    }
			else {
			
		        console.log(fileName + " written to " + path);
			
				if (success) {
					success();
				}
			
		    }
		
		});
	
	},
	
	writeProjectDataset: function (projects) {
		fs.writeFile("./projects/projects.json", JSON.stringify(projects, null, 4), function(err) {
	
		    if(err) {
		
		        console.log(err);
		
		    }
			else {
		
		        console.log("The file was saved!");
		
		    }
	
		});
	},
	
	addProjectToProjectsDataset: function (project) {
		
		fs.readFile("./projects/projects.json", 'utf8', function (err, projects) {
			
			if (err) {
				console.log('Error: ' + err);
			}
			
			projects = JSON.parse(projects);
			
			
			if (JDM.projectIsKnown(projects.projects, project)) {
				projects.projects = JDM.addProjectVersion(projects.projects, project);
			}
			else 
			{
				projects.projects = JDM.addNewProject(projects.projects, project);
			}
			
			JDM.writeProjectDataset(projects);
			
		});
		
	},
	
	addProjectVersion: function (projects, project) {
		for (var i = 0, len = projects.length; i < len; i += 1) {
		
			if (projects[i].groupId == project.groupId && projects[i].projectId == project.projectId) {
				projects[i].versions.push(project.version);
				
				return projects;
			}
			
		}
		
		return projects;
	},
	
	addNewProject: function (projects, project) {
		projects.push({
			groupId: project.groupId,
			projectId: project.projectId,
			version: project.version
		});
		
		return projects;
	},
	
	projectIsKnown: function (projects, project) {
		
		for (var i = 0, len = projects.length; i < len; i += 1) {
		
			if (projects[i].groupId == project.groupId && projects[i].projectId == project.projectId) {
				return true;
			}
			
		}
		
		return false;
		
	}
	


}


var newPackage = {
	hasPom: false,
	hasSrc: false
};





// var io = require('socket.io').listen(3001);

io.sockets.on('connection', function (socket) {
	socket.on("create-new-project", JDM.createNewPackage);
	socket.on("hello", function (a) {
		console.log(a);
	})
});


// server.listen(3001);



server.listen(3001);
