var HelloView = Fw.inherits( Fw.View, {
   events: {
     'button': {
        'click': function( e ) {
           alert( e.target );
        }
     } 
   },
   render: function() {
      $( this.el ).html( $( '<button>' ).html( this.model.message ));
      return this;
   }
});

var Hello = Fw.inherits( Fw.Model, {
   message: 'Hello, world'
});