(function(Fw, $, Handlebars){

   this.App = {
      Views:{},
      Models:{},
      Modules:{}
   };

   App.Modules.TweetService = {
      fetch: function( query, onSuccess ){
         $.getJSON( 'http://search.twitter.com/search.json?q=' + encodeURIComponent( query ) + '&callback=?', onSuccess );
      }
   };
      
   App.Models.TweetStream = Fw.inherits( Fw.Model, {});

   App.Views.TweetStream = Fw.inherits( Fw.View, {
      template: Handlebars.compile( $( '#tmpl-tweet-stream' ).html() ),
      render: function(){
         var result = this.template( this.model );
         $( this.el ).html( result );
         return this;
      }
   });

   App.Models.TweetSearch = Fw.inherits( Fw.Model, {
      search: function( query ){
         App.Modules.TweetService.fetch( query, Fw.bind(function( data ){
            this.trigger( 'data', data );
         }, this));
      }
   });

   App.Views.TweetSearch = Fw.inherits( Fw.View, {
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
   });

}(Fw, jQuery, Handlebars));

// Application initialization
(function(){
   
   var search = new App.Models.TweetSearch();
   var searchView = new App.Views.TweetSearch( { model:search } );
   var streamView = new App.Views.TweetStream();

   search.bind( 'data', function( data ){
      streamView.model = new App.Models.TweetStream( data );
      streamView.render();
   });

   $( '#app' ).append( searchView.render().el )
      .append( streamView.el );

}());