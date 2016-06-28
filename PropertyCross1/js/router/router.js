var Router = Backbone.Router.extend ({
	routes: {
		'': 'loadStartPage',
        'search?q=*q': 'showSearchResults',
        'error?code=*code': 'showError',
        'faves': 'goFaves',
        'details': 'goDetails',
    },

    loadStartPage: function () {
        app.Views.startPage.renderRecentSearches();
    },

    showSearchResults: function () {
	    app.Views.result.render()
    },

    goFaves: function () {
        app.Views.favourite.render()
    },

    goDetails: function () {        

    },

    showError: function (code) {
        app.Views.startPage.renderError(code)
    },
})