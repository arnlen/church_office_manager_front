'use strict';

app.factory('overviewFactory', function() {

	// This JSON should be returned by the Rails API
	return  [
	  {
	    "name": "louange",
	    "leader": "Jeff",
	    "members": [
	      "Jeff",
	      "JD",
	      "Wendy",
	      "Alberte",
	      "Willaim",
	      "Emmanuel"
	    ],
	    "taskDoneCounter": 1,
	    "taskCounter": 1,
	    "tasks": [
	      {
	        "name": "Créer liste des chants",
	        "service": "louange",
	        "dueDate": "saturday",
	        "completed": true
	      }
	    ],
	    "completed": true
	  },
	  {
	    "name": "accueil",
	    "leader": "Nico",
	    "members": [
	      "Nico",
	      "Cynthia"
	    ],
	    "taskDoneCounter": 0,
	    "taskCounter": 1,
	    "tasks": [
	      {
	        "name": "Imprimer brochures",
	        "service": "accueil",
	        "dueDate": "sunday",
	        "completed": false
	      }
	    ],
	    "completed": false
	  },
	  {
	    "name": "projection",
	    "members": [
	      "Willaim",
	      "Arnaud",
	      "Didier"
	    ],
	    "leader": "Arnaud",
	    "taskDoneCounter": 0,
	    "taskCounter": 2,
	    "tasks": [
	      {
	        "name": "Créer PPT (accueil + anniversaire + annonces)",
	        "service": "projection",
	        "dueDate": "saturday",
	        "completed": false
	      },
	      {
	        "name": "Saisir liste des chants dans VideoPsalm",
	        "service": "projection",
	        "dueDate": "saturday",
	        "completed": false
	      }
	    ],
	    "completed": false
	  },
	  {
	    "name": "sono",
	    "leader": "Willaim",
	    "members": [
	      "Willaim",
	      "Arnaud",
	      "Didier"
	    ],
	    "taskDoneCounter": 0,
	    "taskCounter": 1,
	    "tasks": [
	      {
	        "name": "Faire balance",
	        "service": "sono",
	        "dueDate": "saturday",
	        "completed": false
	      }
	    ],
	    "completed": false
	  },
	  {
	    "name": "programme",
	    "leader": "Didier",
	    "members": [
	      "Didier"
	    ],
	    "taskDoneCounter": 0,
	    "taskCounter": 1,
	    "tasks": [
	      {
	        "name": "Créer brochure",
	        "service": "programme",
	        "dueDate": "friday",
	        "completed": false
	      }
	    ],
	    "completed": false
	  },
	  {
	    "name": "prédication",
	    "leader": "Emmanuel",
	    "members": [
	      "Emmanuel"
	    ],
	    "taskDoneCounter": 0,
	    "taskCounter": 1,
	    "tasks": [
	      {
	        "name": "Définir titre du message",
	        "service": "prédication",
	        "dueDate": "friday",
	        "completed": false
	      }
	    ],
	    "completed": false
	  }
	]

});