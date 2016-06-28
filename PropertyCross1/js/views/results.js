app.Views.ResultView = Backbone.View.extend({
    number: 1,
    query: '',
    

    initialize: function () {
        this.template = _.template($('#search_results_template').html());
        this.apartmentList = new app.Views.SearchResultApartmentList();
        this.collection = app.views.startPage.collection;
        app.services.listening.listen(this);
    },

    events: {
        'click #back_search_form': 'backSearchForm',
        'click .apart': 'goDetails',
        'click #load_more': 'loadMore',
    },

// Pushes current search query into recent searches area and returns to start page
    backSearchForm: function () {    
        app.collections.recentSearches.push({           
            query: app.views.startPage.query,
            numOfResults: app.views.startPage.collection.headerInfo.total_results,
            serialNumber: this.number,
        });
        this.number++;
        app.routers.main.navigate("", {trigger: true});
    },

	loadPage: function () {
        app.services.preloader.hide();
        if (app.views.startPage.collection.headerInfo.result_amount) {
            app.routers.main.navigate('search?q=' + app.views.startPage.query, {trigger: true}); 
            this.render();  
            if (app.views.startPage.collection.page >= app.views.startPage.collection.headerInfo.total_pages) {
                $('#load_more_button').hide();             
            };    
        } else {
            app.routers.main.navigate('error?code=1', {trigger: true});
        }
	},

    render: function () {
        this.$el.html(this.template(app.views.startPage.collection.headerInfo));
        this.apartmentList.render(app.views.startPage.collection);
    },

// Opens the page of clicked apartment
    goDetails: function (e) {
        this.query = $(e.currentTarget).prop('id');
        app.routers.main.navigate('details');
        app.views.details.renderFromSearch(this.query);
    },

// Loads one more page of search result from a server
    loadMore: function () {
        app.services.preloader.show();
        this.apartmentList.i = 0;
        var self = this;
        app.views.startPage.collection.addNewResults(function () {
            self.apartmentList.render();
        });  
    }
});

app.Views.SearchResultApartmentList = Backbone.View.extend({
    i: 0,

    initialize: function () {
        this.template = _.template($('#apartment_list_template').html());
    },

// Adds the cid attr to all models of collection and appends them to the result area
    render: function (collection) {
        collection.each(function (item) {
            if (collection.models[this.i]) {
                collection.models[this.i].attributes.cid = collection.models[this.i].cid;
            };
            $('#result').append(this.template(item.toJSON()));
            this.i++; 
        }, this);
    }    
});