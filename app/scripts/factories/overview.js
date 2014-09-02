'use strict';

app.factory('overviewFactory', function() {

	// This JSON should be returned by the Rails API
	return [
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
	    "tasks": [
	      {
	        "name": "Créer liste des chants",
	        "service": "louange",
	        "dueDate": "saturday"
	      }
	    ]
	  },
	  {
	    "name": "accueil",
	    "leader": "Nico",
	    "members": [
	      "Nico",
	      "Cynthia"
	    ],
	    "tasks": [
	      {
	        "name": "Imprimer brochures",
	        "service": "accueil",
	        "dueDate": "sunday"
	      }
	    ]
	  },
	  {
	    "name": "projection",
	    "members": [
	      "Willaim",
	      "Arnaud",
	      "Didier"
	    ],
	    "leader": "Arnaud",
	    "tasks": [
	      {
	        "name": "Créer PPT (accueil + anniversaire + annonces)",
	        "service": "projection",
	        "dueDate": "saturday"
	      },
	      {
	        "name": "Saisir liste des chants dans VideoPsalm",
	        "service": "projection",
	        "dueDate": "saturday"
	      }
	    ]
	  },
	  {
	    "name": "sono",
	    "leader": "Willaim",
	    "members": [
	      "Willaim",
	      "Arnaud",
	      "Didier"
	    ],
	    "tasks": [
	      {
	        "name": "Faire balance",
	        "service": "sono",
	        "dueDate": "saturday"
	      }
	    ]
	  },
	  {
	    "name": "programme",
	    "leader": "Didier",
	    "members": [
	      "Didier"
	    ],
	    "tasks": [
	      {
	        "name": "Créer brochure",
	        "service": "programme",
	        "dueDate": "friday"
	      }
	    ]
	  },
	  {
	    "name": "prédication",
	    "leader": "Emmanuel",
	    "members": [
	      "Emmanuel"
	    ],
	    "tasks": [
	      {
	        "name": "Définir titre du message",
	        "service": "prédication",
	        "dueDate": "friday"
	      }
	    ]
	  }
	]

});