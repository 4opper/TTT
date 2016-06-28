var app = {
    Views: {},
    Models: {},
    Collections: {},
    Routers: {},
};

app.Models.searchQuery = new SearchQueryModel();
app.Models.apartment = new ApartmentModel();
app.Collections.recentSearches = new RecentSearchesCollection([]);
app.Collections.favourites = new FavouritesCollection();
app.Views.startPage = new StartPage({
	el: '#screen',
});
app.Views.result = new ResultView({
	el: '#screen',
});
app.Views.details = new DetailsView({
	el: '#screen',
});
app.Views.favourite = new FavouriteList({
	el: '#screen',
});
app.Routers.main = new Router();
Backbone.history.start();