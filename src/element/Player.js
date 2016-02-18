phina.namespace(function() {
  
  phina.define("peach.Player", {
    superClass: "peach.Vox",
    
    init: function() {
      this.superInit("player");
    },
    
    update: function(app) {
      var keyboard = app.keyboard;
    }

  });

});
