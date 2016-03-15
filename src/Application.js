phina.namespace(function() {

  phina.define("peach.Application", {
    superClass: "phina.display.CanvasApp",
    
    gamepadManager: null,

    init: function() {
      this.superInit({
        fps: 60,
        width: W,
        height: H,
      });
      
      this.gamepadManager = phina.input.GamepadManager();
      
      this.replaceScene(peach.MainSequance());
    },

    update: function() {
      this.mouse.update();
      this.touch.update();
      this.touchList.update();
      this.keyboard.update();
      this.gamepadManager.update();
    },

  });

});
