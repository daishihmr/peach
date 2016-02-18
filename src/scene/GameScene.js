phina.namespace(function() {

  phina.define("peach.GameScene", {
    superClass: "phina.display.DisplayScene",

    threeLayer: null,
    scene: null,
    camera: null,
    cameraTarget: null,
    light: null,
    threeRenderer: null,

    init: function() {
      this.superInit({
        backgroundColor: "black",
        width: W,
        height: H,
      });

      this.fromJSON({
        children: {
          threeLayer: {
            className: "phina.display.ThreeLayer",
            arguments: {
              width: W,
              height: H,
            },
            originX: 0,
            originY: 0,
          },
        },
      });

      this.scene = this.threeLayer.scene;
      this.camera = this.threeLayer.camera;
      this.light = this.threeLayer.light;
      this.threeRenderer = this.threeLayer.renderer;

      this.scene.fog = new THREE.Fog(0x000022, 500, 8000);

      this.camera.position.set(0, 2000, -2000);

      this.cameraTarget = peach.ThreeElement().addChildTo(this);

      this.threeRenderer.setClearColor(0x000000);

      var self = this;

      peach.Vox("player")
        .addChildTo(this)
        .on("enterframe", function() {
          this.rotationY += 5;
        });

      this.on("enterframe", function(e) {
        if (e.app.ticker.frame % 60 !== 0) return;

        var pos = new THREE.Vector3(Math.randint(-1000, 1000), 0, Math.randint(-1000, 1000));
        (20).times(function() {
          var to = new THREE.Vector3(Math.randint(-1, 1), Math.randint(-1, 1), Math.randint(-1, 1))
            .normalize()
            .multiplyScalar(20);
          peach.Particle()
            .setPosition(pos.x, pos.y, pos.z)
            .addChildTo(self)
            .on("enterframe", function(e) {
              this.position.add(to);
            });
        });
      });

    },

    update: function(app) {
      this.camera.lookAt(this.cameraTarget.position);
    },

    addChild: function(child) {
      this.superMethod("addChild", child);
      if (child.$t) this.scene.add(child.$t);
      return this;
    },
    removeChild: function(child) {
      this.superMethod("removeChild", child);
      if (child.$t) this.scene.remove(child.$t);
      return this;
    },
  });

});
