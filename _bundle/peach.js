phina.main(function() {
  var app = peach.Application();
  app.run();
  
  app.enableStats();
});

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

phina.namespace(function() {

  phina.define("peach.Label", {
    superClass: "phina.display.Label",

    init: function(text, options) {
      this.superInit({
        text: text,
        fontFamily: "main",
        fontSize: 48,
        fill: "white",
      }.$extend(options));
    },
    
    update: function(app) {
      this.alpha = 0.75 + Math.sin(app.ticker.frame * 0.2) * 0.25;
    }
  });

});

phina.namespace(function() {

  phina.define("peach.LoadingScene", {
    superClass: "phina.game.LoadingScene",

    init: function(param) {
      var assets = {};
      switch (param.assetType) {
        case "common":
          assets.font = {
            "main": "asset/Orbitron-Regular.ttf"
          };
          break;
        case "stage1":
          break;
        case "stage2":
          break;
        case "stage3":
          break;
        case "stage4":
          break;
        case "stage5":
          break;
      }

      this.superInit({
        width: 640,
        height: 960,
        assets: assets
      });
    }

  });

});

phina.namespace(function() {

  phina.define("peach.MainSequance", {
    superClass: "phina.game.ManagerScene",

    init: function() {
      this.superInit({
        scenes: [{
          label: "loading0",
          className: "peach.LoadingScene",
          arguments: {
            assetType: "common",
          },
          nextLabel: "title",
        }, {
          label: "title",
          className: "peach.TitleScene",
        }],
      });
    },
  });

});

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

//# sourceMappingURL=peach.js.map
