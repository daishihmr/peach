phina.namespace(function() {

  phina.define("peach.Application", {
    superClass: "phina.display.CanvasApp",

    init: function() {
      this.superInit({
        fps: 60,
        width: W,
        height: H,
      });
      this.replaceScene(peach.MainSequance());
    }

  });

});
