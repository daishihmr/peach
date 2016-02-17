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