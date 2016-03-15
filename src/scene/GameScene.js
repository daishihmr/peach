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

      this.scene.fog = new THREE.FogExp2(0x000044, 0.00012);

      this.camera.position.set(
        0,
        Math.sin((60).toRadian()) * 4000,
        Math.cos((60).toRadian()) * 4000
      );
      this.camera.updateProjectionMatrix();
      this.cameraTarget = peach.ThreeElement().addChildTo(this);

      this.threeRenderer.setClearColor(0x000000);

      var self = this;

      this.player = peach.Player().addChildTo(this);
      
      peach.Vox("misumi")
        .setPosition(0, 0, -3000)
        .addChildTo(this);

      // this.genAxis();

      peach.Ground.generate((-15).toRadian(), 90)
        .setPosition(0, -3000, 0)
        .addChildTo(this);

      var test = phina.asset.AssetManager.get("vox", "bullet01");
      test.material.blending = THREE.AdditiveBlending;
      // test.material.transparent = true;
      var test = phina.asset.AssetManager.get("vox", "bullet02");
      test.material.blending = THREE.AdditiveBlending;
      // test.material.transparent = true;
      for (var x = -4; x < 4; x++) {
        for (var y = -4; y < 4; y++) {
          var p = peach.Vox("bullet02")
            .setPosition(0, 0, -6000)
            .addChildTo(self)
            .on("enterframe", function() {
              this.x += Math.cos(this.dir) * this.spd;
              this.z -= Math.sin(this.dir) * this.spd;
            });
          p.dir = Math.randfloat(0, Math.PI * 2);
          p.spd = Math.randint(50, 90);
          p.rotationY = p.dir.toDegree()- 90;
          p.tweener.wait(Math.randint(2000, 2800)).call(function() {
            this.x = 0;
            this.z = -6000;
          }.bind(p)).setLoop(true);
        }
      }
    },

    genAxis: function() {
      var material, geometry;

      material = new THREE.LineBasicMaterial({
        color: 0xffffff
      });
      geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(-50000, 0, 0),
        new THREE.Vector3(50000, 0, 0)
      );
      peach.ThreeElement(new THREE.Line(geometry, material)).addChildTo(this);

      material = new THREE.LineBasicMaterial({
        color: 0xffffff
      });
      geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(0, -50000, 0),
        new THREE.Vector3(0, 50000, 0)
      );
      peach.ThreeElement(new THREE.Line(geometry, material)).addChildTo(this);

      material = new THREE.LineBasicMaterial({
        color: 0xffffff
      });
      geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(0, 0, -50000),
        new THREE.Vector3(0, 0, 50000)
      );
      peach.ThreeElement(new THREE.Line(geometry, material)).addChildTo(this);
    },

    update: function(app) {
      // this.camera.position.set(Math.cos(app.ticker.frame * 0.001) * 1000, 1000, Math.sin(app.ticker.frame * 0.001) * 2000);
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
