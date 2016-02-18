phina.namespace(function() {

  phina.define("peach.Label", {
    superClass: "phina.display.Label",

    init: function(text, options) {
      this.superInit({
        text: text,
        fontFamily: "main",
        fontSize: W * 0.08,
        fill: "white",
      }.$extend(options));
    },
    
    update: function(app) {
      this.alpha = 0.75 + Math.sin(app.ticker.frame * 0.2) * 0.25;
    }
  });

});
