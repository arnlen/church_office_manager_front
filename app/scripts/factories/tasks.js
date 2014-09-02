'use strict';

app.factory('tasksFactory', function() {

	return [
		{
			name: "Créer liste des chants",
			service: 'louange',
			dueDate: 'saturday'
		},
		{
			name: "Imprimer brochures",
			service: 'accueil',
			dueDate: 'sunday'
		},
		{
			name: "Créer PPT (accueil + anniversaire + annonces)",
			service: 'projection',
			dueDate: 'saturday'
		},
		{
			name: "Saisir liste des chants dans VideoPsalm",
			service: 'projection',
			dueDate: 'saturday'
		},
		{
			name: "Faire balance",
			service: 'sono',
			dueDate: 'saturday'
		},
		{
			name: "Créer brochure",
			service: 'programme',
			dueDate: 'friday'
		},
		{
			name: "Définir titre du message",
			service: 'prédication',
			dueDate: 'friday'
		}
	];

});