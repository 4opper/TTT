app.Collections.SearchResultsCollection = Backbone.Collection.extend ({
	model: app.Models.ApartmentModel,
	page: 1,
	defaultUrl: function () {
		return 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=' +
         this.page + '&place_name='
	},
	url: '',

// This func will be executed as data comes from server
	parse: function (data) {
		this.headerInfo.result_amount += data.response.listings.length;
		this.headerInfo.total_results = data.response.total_results;
		this.headerInfo.total_pages = data.response.total_pages;
		return data.response.listings;
	},

	headerInfo: {
        result_amount: 0,
        total_results: 0,
        total_pages: 0,
    },

//Fetches new page from server
    addNewResults: function (func) {
    	if (this.page < this.headerInfo.total_pages) {
            this.page ++;
            var self = this;
            app.views.startPage.makeUrl(app.views.startPage.query);
            this.fetch({
            	remove: false,
            	updateInfo: function () {
                    self.headerInfo.result_amount = self.length;
            		func();
            	}
            });
        }; 
    }
});