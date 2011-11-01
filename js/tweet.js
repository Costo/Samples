(function( Fw, $, Handlebars ){

var App = this;

App.modules.TweetService = {
   fetch: function( query, onSuccess ){
      $.getJSON( 'http://search.twitter.com/search.json?q=' + encodeURIComponent( query ) + '&callback=?', onSuccess );
   }
};
   
App.models.TweetStream = Fw.inherits( Fw.Model, {});

App.views.TweetStream = Fw.inherits( Fw.View, {
   template: Handlebars.compile( $( '#tmpl-tweet-stream' ).html() ),
   render: function(){
      var result = this.template( this.model );
      $( this.el ).html( result ).sortable();
      return this;
   }
});

App.models.TweetSearch = Fw.inherits( Fw.Model, {
   search: function( query ){
      App.modules.TweetService.fetch( query, Fw.bind(function( data ){
         this.trigger( 'data', data );
      }, this));
   }
});

App.views.TweetSearch = Fw.inherits( Fw.View, {
   template: Handlebars.compile( $( '#tmpl-tweet-search' ).html() ),
   actions:{
      form:{
         submit: function(e){
            e.preventDefault();
            this.$( 'form' ).addClass( 'searching' );
            this.model.search( this.$( 'input' ).val() );
         }
      }
   },
   initialize: function(){
      this.model.bind( 'data', function(){
         this.$( 'form' ).removeClass( 'searching' );
      }, this);
   },
   render: function() {
      $( this.el ).html( this.template() );
      return this;
   }
})


}).call( App, Fw, jQuery, Handlebars );;