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
            "player": { url: "asset/player.vox", scale: 0.1, },
            "bit": { url: "asset/bit.vox", scale: 0.1, },
            "bullet01": { url: "asset/bullet01.vox", scale: 1, },
            "bullet02": { url: "asset/bullet02.vox", scale: 1, },
            "particle": { url: "asset/particle.vox", scale: 1, },
            "misumi": { url: "asset/misumi.vox", scale: 1, },
            "test": { url: "asset/test.vox", scale: 1, },
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
