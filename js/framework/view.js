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
   render      : function() {
      return this;
   },
   initialize  : function() {
      if( this.id === null ) {
         this.id = generateId();
      }
      if( this.el === null ) {
         this.el = $( '<' + this.tagName + '>' )[0];
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