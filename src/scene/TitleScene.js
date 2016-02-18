phina.namespace(function() {

  phina.define("peach.TitleScene", {
    superClass: "phina.display.DisplayScene",

    init: function() {
      this.superInit({
        backgroundColor: "black",
        width: W,
        height: H,
      });
      peach.Label("Test")
        .setPosition(this.gridX.span(8), this.gridY.span(6))
        .addChildTo(this);
    },
    
    update: function(app) {
      if (app.pointer.getPointingEnd()) {
        this.exit();
      }
    }
  });

});
