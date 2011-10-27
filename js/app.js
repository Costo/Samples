$(function(){

var model = new Hello( { message: 'Bonjour, le monde' } );
var hello = new HelloView( { model: model } ).render();

$( 'body' ).html( hello.el );
   
});