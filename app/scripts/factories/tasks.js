'use strict';

app.factory('tasksFactory', function() {

	return [
		{
			name: "Créer liste des chants",
			service: 'louange',
			dueDate: 'saturday',
			completed: true
		},
		{
			name: "Imprimer brochures",
			service: 'accueil',
			dueDate: 'sunday',
			completed: false
		},
		{
			name: "Créer PPT (accueil + anniversaire + annonces)",
			service: 'projection',
			dueDate: 'saturday',
			completed: false
		},
		{
			name: "Saisir liste des chants dans VideoPsalm",
			service: 'projection',
			dueDate: 'saturday',
			completed: false
		},
		{
			name: "Faire balance",
			service: 'sono',
			dueDate: 'saturday',
			completed: false
		},
		{
			name: "Créer brochure",
			service: 'programme',
			dueDate: 'friday',
			completed: false
		},
		{
			name: "Définir titre du message",
			service: 'prédication',
			dueDate: 'friday',
			completed: false
		}
	];

});