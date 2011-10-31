$(function(){
   var search = new App.models.TweetSearch();
   var searchView = new App.views.TweetSearch( { model:search } );
   var streamView = new App.views.TweetStream();

   search.bind( 'data', function( data ){
      streamView.model = new App.models.TweetStream( data );
      streamView.render();
   });

   $( '#app' ).append( searchView.render().el )
      .append( streamView.el );
});