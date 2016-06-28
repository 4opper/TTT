app.Collections.FavouritesCollection = Backbone.Collection.extend({
    model: app.Models.ApartmentModel,

// Adds faves which equals null to localStorage and then rewrites it on add or remove event
    initialize: function () {
        var faves = JSON.parse(localStorage.getItem('faves'));
        this.add(faves);
        this.on('add remove', function () {
            localStorage.setItem('faves', JSON.stringify(this));
        });
    }
});