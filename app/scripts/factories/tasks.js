'use strict';

app.factory('tasksFactory', function() {

	return [
		{
			name: "Créer liste des chants",
			service: 'louange',
			dueDate: 'saturday',
			done: false
		},
		{
			name: "Imprimer brochures",
			service: 'accueil',
			dueDate: 'sunday',
			done: false
		},
		{
			name: "Créer PPT (accueil + anniversaire + annonces)",
			service: 'projection',
			dueDate: 'saturday',
			done: false
		},
		{
			name: "Saisir liste des chants dans VideoPsalm",
			service: 'projection',
			dueDate: 'saturday',
			done: false
		},
		{
			name: "Faire balance",
			service: 'sono',
			dueDate: 'saturday',
			done: false
		},
		{
			name: "Créer brochure",
			service: 'programme',
			dueDate: 'friday',
			done: false
		},
		{
			name: "Définir titre du message",
			service: 'prédication',
			dueDate: 'friday',
			done: false
		}
	];

});