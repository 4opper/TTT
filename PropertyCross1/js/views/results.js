var ResultView = Backbone.View.extend({
    template: _.template($('#search_results_template').html()),
    number: 1,
    query: '',

    initialize: function () {
        this.apartmentList = new SearchResultApartmentList();
    	this.listenTo(app.Views.startPage.collection, 'update', this.log);
    },

    events: {
        'click #back_search_form': 'backSearchForm',
        'click .apart': 'goDetails',
        'click #load_more': 'loadMore',
    },

// Pushes current search query into recent searches area and returns to start page
    backSearchForm: function () {    
        app.Collections.recentSearches.push({           
            query: app.Views.startPage.query,
            numOfResults: app.Views.startPage.collection.headerInfo.total_results,
            serialNumber: this.number,
        });
        this.number++;
        app.Routers.main.navigate("", {trigger: true});
    },

	log: function () {
        $('#loading').hide();
        if (app.Views.startPage.collection.headerInfo.result_amount) {
            app.Routers.main.navigate('search?q=' + app.Views.startPage.query, {trigger: true}); 
            this.render();      
        } else {
            app.Routers.main.navigate('error?code=1', {trigger: true})
        }
	},

    render: function () {
        this.$el.html(this.template(app.Views.startPage.collection.headerInfo));
        this.apartmentList.render(app.Views.startPage.collection);
        //this.$el.append(this.apartmentList.render(app.Views.startPage.collection).$el);
    },

// Opens the page of clicked apartment
    goDetails: function (e) {
        this.query = $(e.currentTarget).prop('id');
        app.Routers.main.navigate('details');
        app.Views.details.renderFromSearch(this.query);
    },

// Loads one more page of search result from a server
    loadMore: function () {
        $('#loading').show();
        this.apartmentList.i = 0;
        var self = this;
        app.Views.startPage.collection.addNewResults(function () {
            self.apartmentList.render();
        });  
    },
});

var SearchResultApartmentList = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#apartment_list_template').html()),
    i: 0,

// Adds the cid attr to all models of collection and appends them to the result area
    render: function (collection) {
        collection.each(function (item) {
            if (collection.models[this.i]) {
                collection.models[this.i].attributes.cid = collection.models[this.i].cid;
            };
            $('#result').append(this.template(item.toJSON()));
            this.i++; 
        }, this);
        //debugger;
        //return this;
    },    
});