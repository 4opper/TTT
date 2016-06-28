app.Views.FavouriteList = Backbone.View.extend({

    initialize: function () {
        this.template = _.template($('#favourites_list_template').html()); 
    },

    render: function () {
        this.$el.html(this.template());
        this.templateRelElem =  _.template($('#faves_list_template').html());
        app.collections.favourites.each(function (item) {
            $('#result').append(this.templateRelElem(item.toJSON()));
        }, this);
    },

    events: {
        'click .apart_fave': 'openFave',
         'click #back_from_faves': 'back'
    },

// Opens page of clicked fave apartment 
    openFave: function (e) {
            var query = $(e.currentTarget).prop('id');
            app.routers.main.navigate('details');
            app.views.details.renderFromFaves(query);
            $('#is_not_fave').attr('id', 'is_fave');
    },

// Returns to the start page
    back: function () {
        app.routers.main.navigate("", {trigger: true});
    },
});