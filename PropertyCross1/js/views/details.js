app.Views.DetailsView = Backbone.View.extend({

    initialize: function () {
        this.template = _.template($('#details_template').html()); 
    },

    events: {
        'click #back_search_result': 'backSearchResult',
        'click #is_not_fave': 'addToFavourites',
        'click #is_fave': 'removeFromFavourites',
    },

// Renders  cliked apartments from faves page
    renderFromFaves: function (query) {
        this.render(query, app.collections.favourites);
     },

// Renders cliked apartments from serach result page
    renderFromSearch: function (query) {
        this.render(query, app.views.startPage.collection);
     },

// Searches the collection for the model with appropriate cid, which equls to cid of clicked apartment
    render: function (query, collection) {
        this.elem = collection.findWhere({cid: query});
        this.$el.html(this.template(this.elem.toJSON()));
    },

    backSearchResult: function () {
        window.history.back();
    },

    addToFavourites: function () {
        app.collections.favourites.add(this.elem);
        $('#is_not_fave').attr('id', 'is_fave');
    },

    removeFromFavourites: function () {
        app.collections.favourites.remove(this.elem);
        $('#is_fave').attr('id', 'is_not_fave');     
    }
});