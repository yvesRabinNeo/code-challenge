var express = require('express');
var fs = require('fs');

var app = express();

/* On appelle la route permettant de lire le fichier de Santa */
app.get('/santa-floors', function(req, res) {
	//Initialisation du compteur d'étage
	var cpt = 0;
	//Lecture du fichier texte
    fs.readFile('santa-floors.txt', 'utf8', function(err, data) {
		for (var i = 0; i < data.length; i++) {
			// A chaque parenthèse ouvrante on incrémente le compteur
			if (data[i] === "(") {
				cpt++;
			// A chaque parenthèse fermante on décrémente le compteur
			} else if (data[i] === ")") {
				cpt--;
			}
		}
		//Affichage du résultat sur la page
		res.end('the instructions take Santa to the floor: ' + cpt);
	});
})

/* On appelle la route permettant de lire le fichier de Reindeer-Olympics */
.get('/reindeer-olympics', function(req, res) {
	//Lecture du fichier texte
	fs.readFile('reindeer-olympics.txt', 'utf8', function(err, data) {
		
		var allTemps = []; // initialisation du tableau regroupant tous les temps de tous les rennes
		var allDistances = []; // initialisation du tableau regroupant toutes les distances de tous les rennes
		var max = 2503; // temps maximum de la course
		var closest; // temps le plus proche du temps imparti
		var allReindeers = data.split('\r\n'); // Tableau groupant chaque renne.
		
		for (var i = 0; i < allReindeers.length; i++) {
			var numbers = allReindeers[i].match(/\d+/g).map(Number); // Tableau groupant chaque chiffre de chaque ligne (vitesse, distance, arrêt)
			var temps = 0; // initialisation du temps pour chaque renne
			var distance = 0; // initialisation de la distance pour chaque renne
			
			// Tant que le temps de course n'est pas atteint
			while(temps <= max) {
				// Pour chaque renne, ajout du temps relatif à sa vitesse + le temps d'arrêt
				temps += numbers[1] + numbers[2];
				// Pour chaque renne, ajout de la distance pour x seconde.
				distance += numbers[0]*numbers[1];
			}
			
			allTemps.push(temps);
			allDistances.push(distance);
		}
		
		// Récupération du temps le plus proche du temps maximum imparti.
		var closest = allTemps.reduce(function(prev, curr) {
			return (Math.abs(curr - max) < Math.abs(prev - max) ? curr : prev);
		});
		
		// Récupération de l'index du temps le plus proche afin de trouver la distance équivalente.
		var index = allTemps.indexOf(closest);
		
		//Affichage du résultat sur la page
		res.end('After exactly 2503 seconds, the winning reindeer has traveled: ' + allDistances[index] + 'kms');
	});
})

.listen(8080);   