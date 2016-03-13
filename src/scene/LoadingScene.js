phina.namespace(function() {

  phina.define("peach.LoadingScene", {
    superClass: "phina.game.LoadingScene",

    init: function(param) {
      var assets = {};
      switch (param.assetType) {
        case "common":
          assets["font"] = {
            "main": "asset/Orbitron-Regular.ttf",
          };
          assets["vox"] = {
            "player": "asset/player.vox",
            "bit": "asset/bit.vox",
            "bullet01": "asset/bullet01.vox",
            "bullet02": "asset/bullet02.vox",
            "particle": "asset/particle.vox",
            "p50": "asset/p50.vox",
            "test": "asset/test.vox",
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
        width: W,
        height: H,
        assets: assets
      });
    }

  });

});
