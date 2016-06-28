app.Models.ApartmentModel = Backbone.Model.extend({
    defaults: {
        thumb_url: 'img/apartment_placeholder.png',
        img_url: 'img/apartment_placeholder.png',
        bathroom_number: 0,
        bedroom_number: 0,
        price: 0,
        title: '',
        summary: '',
        cid: '',
    }
});
