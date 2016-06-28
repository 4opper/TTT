app.Views.StartPage = Backbone.View.extend ({
	collection: new app.Collections.SearchResultsCollection(),
	number: 1,

// Makes url by adding the inputed location to the default url
	makeUrl: function (query) {
		this.collection.url = this.collection.defaultUrl() + query;	
	},

	initialize: function () {
		this.template = _.template($('#search_form_page').html());
		this.render();		
	},

	render: function () {
		this.$el.html(this.template);
	},

// Adds the info about recent searches to the start page
    renderRecentSearches: function () {
    	this.collection.page = 1;
        this.render();
        this.templateRecentSearchElem = _.template($('#resent_search').html());
        app.collections.recentSearches.each(function (item) {
            $('#search_form_info').append(this.templateRecentSearchElem(item.toJSON()));
        }, this);
    },

    renderError: function (code) {
        this.errorText = [
            ['Please enter your search query.'],
            ['There were no properties found for the given location.'],
            ['An error occurred while searching. Please check your network connection and try again.'],
        ];

        this.render();
        this.templateError = _.template($('#search_form_error').html());
        $('#search_form_info').append(this.templateError({error: this.errorText[code]}));
    },

	events: {
		'click .go' : 'makeFetch',
		'click #faves_btn': 'goFavouritesList',
		'click .btn_rec_search': 'goSearchResultFromHistory',
	},

// Takes the locetion from input box and makes appropriate url for fetching
// and fetches info
	makeFetch: function () {		
		app.views.result.apartmentList.i = 0;
		app.views.startPage.collection.headerInfo.result_amount = 0;
		app.services.preloader.show();
		if (this.collection.headerInfo.result_amount) {
			this.collection.reset();
			this.collection.url = '';
		};
		
		this.query = $('#search_text_input').val();
		if (this.query) {
			this.makeUrl(this.query);
			this.collection.fetch({error: this.goError});
		} else {
			$('#loading').hide();
			app.routers.main.navigate('error?code=0', {trigger: true});
		}                          
	},

	goError: function () {
		app.services.preloader.hide();
		app.routers.main.navigate('error?code=2', {trigger: true});
	},

// Allows to make a search by clicking the localing in recent searches area
	goSearchResultFromHistory: function (e) {
		app.views.startPage.collection.headerInfo.result_amount = 0;
		app.views.result.apartmentList.i = 0;
		$('#loading').show();
		this.collection.reset();
		this.collection.url = '';
        this.query = $(e.currentTarget).prop('id');
		this.makeUrl(this.query);
		this.collection.fetch();
    },

	goFavouritesList: function () {
		app.routers.main.navigate('faves', {trigger: true});
	}    
});