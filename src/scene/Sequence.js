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
        }, {
          label: "main",
          className: "peach.GameScene",
        }, ],
      });
    },
  });

  phina.define("peach.ArcadeModeSequance", {
    superClass: "phina.game.ManagerScene",

    init: function() {
      this.superInit({
        scenes: [],
      });
    },
  });

});
