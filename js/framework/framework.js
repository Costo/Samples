(function(){
   
this.Fw = {
   extend: function( obj, props ) {
      for( var p in props ) {
         if( props[p] !== undefined ) {
            obj[p] = props[p];
         }
      }
   },
   inherits: function( parent, props ) {
      var child = function() {
        return parent.apply( this, arguments ); 
      };

      var ctor = function() {};
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.prototype.constructor = child;

      Fw.extend( child.prototype, props );


      return child;
   },
   bind: function( func, context ) {
      return function() {
         func.apply( context, arguments );
      }
   }
};

}());