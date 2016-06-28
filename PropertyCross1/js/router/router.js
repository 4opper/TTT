app.Routers.Router = Backbone.Router.extend ({
	routes: {
		'': 'loadStartPage',
        'search?q=*q': 'showSearchResults',
        'error?code=*code': 'showError',
        'faves': 'goFaves',
        'details': 'goDetails',
    },

    loadStartPage: function () {
        if (app.views.startPage.query) {
            app.collections.recentSearches.push({           
                query: app.views.startPage.query,
                numOfResults: app.views.startPage.collection.headerInfo.total_results,
                serialNumber: app.views.result.number,
            });
            app.views.result.number++;
            app.views.startPage.renderRecentSearches();
        }
    },

    showSearchResults: function () {
	    app.views.result.render();
    },

    goFaves: function () {
        app.views.favourite.render();
    },

    goDetails: function () {        

    },

    showError: function (code) {
        app.views.startPage.renderError(code);
    }
});