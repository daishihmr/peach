phina.namespace(function() {

  phina.define("peach.Vox", {
    superClass: "peach.ThreeElement",

    init: function(asset) {
      if (typeof(asset) === "string") {
        this.superInit(phina.asset.AssetManager.get("vox", asset).clone());
      } else {
        this.superInit(asset);
      }
    }
  });

});
