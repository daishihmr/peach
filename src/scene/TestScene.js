phina.define("peach.TestScene", {
  superClass: "phina.display.DisplayScene",

  $t: null,

  init: function() {
    this.superInit({
      backgroundColor: "black",
      width: W,
      height: H,
    });

    this.$t = phina.display.ThreeLayer({
      width: W,
      height: H,
    });
    this.$t.camera.position.y = 1500;
    this.$t.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.$t.renderer.setClearColor(0x000000);
    this.$t.scene.fog = new THREE.Fog(0x000022, 500, 3000);
    this.$t.addChildTo(this);

    var scene = this;
    (5).times(function(x) {
      (5).times(function(z) {
        var vox = peach.Vox("vox").addChildTo(scene);
        vox.x = -3000 + x * 1200;
        vox.z = -3000 + z * 1200;
      });
    });
    
    this.on("enterframe", function(e) {
      var f = e.app.ticker.frame;
      scene.$t.camera.position.x = Math.cos(f * 0.01) * 2000;
      scene.$t.camera.position.z = Math.sin(f * 0.01) * 2000;
      scene.$t.camera.lookAt(new THREE.Vector3(0, 200, 0));
    })
  },

  addChild: function(child) {
    this.superMethod("addChild", child);
    if (child.$t) this.$t.scene.add(child.$t);
    return this;
  },
  removeChild: function(child) {
    this.superMethod("removeChild", child);
    if (child.$t) this.$t.scene.remove(child.$t);
    return this;
  },
});
