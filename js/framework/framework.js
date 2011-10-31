(function(){
   
this.Fw = {
   extend: function( obj, props ) {
      for( var p in props ) {
         if( props[p] !== undefined ) {
            obj[p] = props[p];
         }
      }
      return obj;
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
   bind: function( fn, context ) {
      return function() {
         fn.apply( context, arguments );
      }
   }
};

this.Fw.Events = {
   bind: function( evt, fn, context ){
      context || ( context = this );
      this.events || ( this.events = {} );
      this.events[ evt ] || ( this.events[ evt ] = [] );

      this.events[ evt ].push( [ fn, context ] );
   },
   trigger: function( evt ) {
      var args;
      if( !this.events || !this.events[ evt ] ) return;

      args = [].splice.call( arguments, 1 );
      for( var ix in  this.events[ evt ] ){
         var pair = this.events[ evt ][ ix ];
         pair[0].apply( pair[1], args );
      } 

   } 
};

}());