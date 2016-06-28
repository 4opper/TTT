var app = {
    Views: {},
    Models: {},
    Collections: {},
    Routers: {},
    Services: {},

    views: {},
    models: {},
    collections: {},
    routers: {},
    services: {}
};

app.Services.Preloader = function () {
	var loaderElem = $('#loading');
	//count = 0;

	this.show = function () {
		//count++;
		loaderElem.show();
	};

	this.hide = function () {
		// if (!--count) {
		// 	loaderElem.hide();
		// }
		loaderElem.hide();
	};
};

app.Services.Listening = function () {
	this.listen = function (obj) {
		obj.listenTo(obj.collection, 'update', obj.loadPage);
	};	
};

app.init = function () {
	app.models.searchQuery = new app.Models.SearchQueryModel();
	app.models.apartment = new app.Models.ApartmentModel();

	app.collections.recentSearches = new app.Collections.RecentSearchesCollection([]);
	app.collections.favourites = new app.Collections.FavouritesCollection();

	app.services.preloader = new app.Services.Preloader();
	app.services.listening = new app.Services.Listening();

	app.views.startPage = new app.Views.StartPage({
		el: '#screen'
	});

	app.views.result = new app.Views.ResultView({
		el: '#screen'
	});
	app.views.details = new app.Views.DetailsView({
		el: '#screen'
	});
	app.views.favourite = new app.Views.FavouriteList({
		el: '#screen'
	});	

	app.routers.main = new app.Routers.Router();
	Backbone.history.start();
};

$(app.init);