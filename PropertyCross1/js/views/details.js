var DetailsView = Backbone.View.extend({
    template: _.template($('#details_template').html()),

    events: {
        'click #back_search_result': 'backSearchResult',
        'click #is_not_fave': 'addToFavourites',
        'click #is_fave': 'removeFromFavourites',
    },

// Renders  cliked apartments from faves page
    renderFromFaves: function (query) {
        this.render(query, app.Collections.favourites);
     },

// Renders cliked apartments from serach result page
    renderFromSearch: function (query) {
        this.render(query, app.Views.startPage.collection);
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
        app.Collections.favourites.add(this.elem);
        $('#is_not_fave').attr('id', 'is_fave');
    },

    removeFromFavourites: function () {
        app.Collections.favourites.remove(this.elem);
        $('#is_fave').attr('id', 'is_not_fave');     
    },
})