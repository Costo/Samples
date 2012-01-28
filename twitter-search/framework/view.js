(function( $ ){

var Fw = this;

Fw.View = function( options ) {
   
   Fw.extend( this, options );
   preInitialize.apply( this, arguments );
   this.initialize.apply( this, arguments );

};

var defaults = {
   tagName     : 'div',
   id          : null,
   el          : null,
   model       : {},
   actions      : {},
   render      : function() {
      return this;
   },
   initialize  : function() {
      
   },
   $: function( selector ) { return $( selector, this.el ); }
};

Fw.extend( Fw.View.prototype, defaults );
Fw.extend( Fw.View.prototype, Fw.Events );

var preInitialize = function()
{
   if( this.id == null ) {
      this.id = generateId();
   }
   if( this.el == null ) {
      this.el = $( '<' + this.tagName + '>' ).attr( 'id', this.id )[0];
   }
   for( var selector in this.actions ) {
      for( var event in this.actions[ selector ] ) {
         $( this.el ).delegate( selector, event, Fw.bind( this.actions[ selector ][ event ], this ) );
      }
   }
};

var generateId = (function() {
  var counter = 0;
  return function() { return 'view' + (++counter); };
}());

}).call( Fw, jQuery );