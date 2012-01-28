(function(){

var Fw = this;

Fw.Model = function( options ) {

   this.get = get;
   Fw.extend( this, options );
};

var defaults = {
};

var get = function( prop ){
  return this[ prop ];
};


Fw.extend( Fw.Model.prototype, defaults );
Fw.extend( Fw.Model.prototype, Fw.Events );

}).call( Fw );