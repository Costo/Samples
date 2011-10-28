(function(){

var view = function( options ) {
   
   Fw.extend( this, options );
   this.initialize();

};

var defaults = {
   tagName     : 'div',
   id          : null,
   el          : null,
   model       : {},
   events      : {},
   render      : function() {
      return this;
   },
   initialize  : function() {
      if( this.id === null ) {
         this.id = generateId();
      }
      if( this.el === null ) {
         this.el = $( '<' + this.tagName + '>' ).attr( 'id', this.id )[0];
      }
      for( var selector in this.events ) {
         for( var event in this.events[ selector ] ) {
            $( this.el ).delegate( selector, event, this.events[ selector ][ event ] );
         }
      }
   }
};

this.Fw.extend( view.prototype, defaults );
this.Fw.View = view;


var generateId = (function() {
  var counter = 0;
  return function() { return 'view' + ++counter; }; 
}());

}());