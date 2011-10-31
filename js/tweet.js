(function( Fw, $, Handlebars ){

var App = this;

App.modules.TweetService = {
   fetch: function( query, onSuccess ){
      $.getJSON( 'http://search.twitter.com/search.json?q=' + encodeURIComponent( query ) + '&callback=?', onSuccess );
   }
};
   
App.models.TweetStream = Fw.inherits( Fw.Model, {});

App.views.TweetStream = Fw.inherits( Fw.View, {
   template: Handlebars.compile('<ul>{{#each results}}<li>{{text}}</li>{{/each}}</ul>'),
   render: function(){
      var result = this.template( this.model );
      $( this.el ).html( result );
      this.$( 'ul' ).sortable();
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
   actions:{
      button:{
         click: function(){
            this.model.search( this.$( 'input' ).val() );
         }
      }
   },
   render: function() {
      $( '<input /><br /><button type=submit>search</button>' ).appendTo( this.el );  
      return this;
   }
})


}).call( App, Fw, jQuery, Handlebars );;