var templates = document.querySelectorAll("template[name]");

// Retrieve the template
var template1 = document.getElementsByName("test1")[0];

var htm = template1.innerHTML;

var model = {
	title: "Javascript Super Simple Framework",
	easy: "Easy man",
	end: "Get that"
}

document.getElementById("test1-output").innerHTML = replaceTemplateWithVariables(htm, model);

/*
 * Replace template with variables
*/
function replaceTemplateWithVariables(template, model)
{
	var regex = new RegExp('{{(.*)}}', 'gi');
	var match = template1.innerHTML.match(regex);
	var htm = template;

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
}