'use strict';

app.factory('membersFactory', function() {

	return [
		{
			name: 'Jeff',
			leaderOf: 'louange',
			memberOf: [ 'louange' ],
			email: ''
		},
		{
			name: 'Amandine',
			leaderOf: '',
			memberOf: [ 'éveil à la foi' ],
			email: ''
		},
		{
			name: 'Jenny',
			leaderOf: '',
			memberOf: [ 'éveil à la foi' ],
			email: ''
		},
		{
			name: 'Sylvain',
			leaderOf: '',
			memberOf: [ 'garderie' ],
			email: ''
		},
		{
			name: 'Nathalie',
			leaderOf: 'garderie',
			memberOf: [ 'garderie' ],
			email: ''
		},
		{
			name: 'JD',
			leaderOf: '',
			memberOf: [ 'louange' ],
			email: ''
		},
		{
			name: 'Wendy',
			leaderOf: '',
			memberOf: [ 'louange', 'éveil à la foi' ],
			email: ''
		},
		{
			name: 'Alberte',
			leaderOf: '',
			memberOf: [ 'louange' ],
			email: ''
		},
		{
			name: 'Willaim',
			leaderOf: 'sono',
			memberOf: [ 'louange', 'sono', 'projection' ],
			email: ''
		},
		{
			name: 'Arnaud',
			leaderOf: 'projection',
			memberOf: [ 'projection', 'sono' ],
			email: ''
		},
		{
			name: 'Didier',
			leaderOf: 'programme',
			memberOf: [ 'programme', 'sono', 'projection' ],
			email: ''
		},
		{
			name: 'Emmanuel',
			leaderOf: 'prédication',
			memberOf: [ 'prédication', 'louange' ],
			email: ''
		},
		{
			name: 'Sharon',
			leaderOf: 'éveil à la foi',
			memberOf: [ 'éveil à la foi' ],
			email: ''
		},
		{
			name: 'Marianne',
			leaderOf: '',
			memberOf: [ 'éveil à la foi' ],
			email: ''
		},
		{
			name: 'Nico',
			leaderOf: 'accueil',
			memberOf: [ 'accueil' ],
			email: ''
		},
		{
			name: 'Cynthia',
			leaderOf: '',
			memberOf: [ 'accueil' ],
			email: ''
		}
	];

});