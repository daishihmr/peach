phina.namespace(function() {

  phina.define("peach.Application", {
    superClass: "phina.display.CanvasApp",

    init: function() {
      this.superInit({
        fps: 60,
        width: 640,
        height: 960,
      });
      this.replaceScene(peach.MainSequance());
    }

  });

});
