function JSSF ()
{
	this.htmlTag = "template";
}

JSSF.prototype = {
	constructor: JSSF,
	handleOperators: function (view, model) {
		var foClone = document.importNode(view, true);
		if (foClone.content != null) {
			var foreaches = foClone.content.querySelectorAll('[foreach]');
			// Run through every foreach in the template
			for (var i = 0; i < foreaches.length; i++) {
				var clone = document.importNode(foreaches[i], true);
				
				clone.innerHTML = this.makeViews(clone, model["courses"]);

				foreaches[i].innerHTML = clone.innerHTML;
			}
		}
		return foClone.innerHTML;
	},
	makeView: function (view, model) {
		// Run through all operators and return the html
		var htm = this.handleOperators(view, model);

		var regex = new RegExp('{{(.*)}}', 'gi');
		var match = htm.match(regex);

		for (var i = match.length - 1; i >= 0; i--) {
			//console.log(match[i]);
			var regex = new RegExp(match[i], 'gi');
			var variable = match[i].replace('{{', '');
			variable = variable.replace('}}', '');
			variable = variable.trim();
			//console.log(variable);

			if (variable.split(",").length > 1) {
				var s = variable.split(",");
				console.log("DO THE COMPLICATED THING");
				htm = htm.replace(regex, this.makeViews(document.getElementsByName(s[0])[0], model[s[1]]));
			}
			else {
				console.log("DO THE NON COMPLICATED THING");
				if (typeof model[variable] == 'function') {
					htm = htm.replace(regex, model[variable]())
				}
				else {
					htm = htm.replace(regex, model[variable]);
				}
			}
			//console.log(htm);
		}
		return htm;
	},
	makeViews: function (view, models) {
		var htm = "";
		for (var i = models.length - 1; i >= 0; i--) {
			htm += this.makeView(view, models[i]);
		}
		return htm;
	},
	getViews: function () {
		var templates = document.querySelectorAll(this.htmlTag + "[name]");
	},
	getView: function (name) {
		return document.getElementsByName(name)[0];
	}
}

var tvshows = [
	{
		title: "TVSHOW #1",
		rating: 9.5,
		imdbRating: 9.5,
		episodes: [
			{
				title: "Episode #1",
				season: 1,
				episode: 1
			},
			{
				title: "Episode #2",
				season: 1,
				episode: 2
			}
		]
	}
];

var jssf = new JSSF();
var view1 = jssf.getView("tvshow");
document.getElementsByClassName("tv-shows")[0].innerHTML = jssf.makeViews(view1, tvshows);