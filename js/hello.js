var HelloView = Fw.inherits( Fw.View, {
   render: function() {
      $( this.el ).html( this.model.message );
      return this;
   }
});

var Hello = Fw.inherits( Fw.Model, {
   message: 'Hello, world'
});