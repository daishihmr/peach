phina.namespace(function() {

  phina.define("peach.TitleScene", {
    superClass: "phina.display.DisplayScene",

    init: function() {
      this.superInit({
        backgroundColor: "black"
      });
      peach.Label("Test")
        .setPosition(320, 480)
        .addChildTo(this);
    }
  });

});
