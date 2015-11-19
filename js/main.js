function JSSF ()
{
	this.htmlTag = "template";
}

JSSF.prototype = {
	constructor: JSSF,
	makeView: function (view, model) {
		var regex = new RegExp('{{(.*)}}', 'gi');
		var match = view.match(regex);
		var htm = view;

		for (var i = match.length - 1; i >= 0; i--) {
			//console.log(match[i]);
			var regex = new RegExp(match[i], 'gi');
			var variable = match[i].replace('{{', '');
			variable = variable.replace('}}', '');
			//console.log(variable);
			htm = htm.replace(regex, model[variable.trim()]);
			console.log(htm);
		}
		return htm;
	},
	makeViews: function (view, models) {
		var htm = "";
		for (var i = models.length - 1; i >= 0; i--) {
			htm += this.makeView(view, models[i]);
		};
		return htm;
	},
	getViews: function () {
		var templates = document.querySelectorAll(this.htmlTag + "[name]");
	},
	getView: function (name) {
		return document.getElementsByName(name)[0];
	}
}

var movieModel = {
	name: "The Looper",
	rating: 6.5,
	imdbRating: 8.5
}

var movieModel1 = {
	name: "The Walking Dead",
	rating: 9.5,
	imdbRating: 8.6
}

var movieModels = [movieModel, movieModel1];

var jssf = new JSSF();
var view1 = jssf.getView("test1");
document.getElementsByClassName("movies")[0].innerHTML = jssf.makeViews(view1.innerHTML, movieModels);