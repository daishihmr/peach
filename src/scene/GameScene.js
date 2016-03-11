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

      this.scene.fog = new THREE.FogExp2(0x000022, 0.00020);

      this.camera.position.set(
        0,
        Math.sin((70).toRadian()) * 3000,
        Math.cos((70).toRadian()) * 3000
      );
      this.camera.updateProjectionMatrix();
      this.cameraTarget = peach.ThreeElement().addChildTo(this);

      this.threeRenderer.setClearColor(0x000000);

      var self = this;

      var player = peach.Vox("player")
        .addChildTo(this)
        .on("enterframe", function(e) {
          var kb = e.app.keyboard;
          var v = kb.getKeyDirection();
          this.x += v.x * 40;
          this.z += v.y * 40;
          
          this.rotationZ = Math.sin(e.app.ticker.frame * 0.01) * 80;
        });
      player.$t.material.fog = false;

      // this.genAxis();

      // this.on("enterframe", function(e) {
      //   if (e.app.ticker.frame % 60 !== 0) return;

      //   var pos = new THREE.Vector3(Math.randint(-1000, 1000), 0, Math.randint(-1000, 1000));
      //   (20).times(function() {
      //     var to = new THREE.Vector3(Math.randint(-1, 1), Math.randint(-1, 1), Math.randint(-1, 1))
      //       .normalize()
      //       .multiplyScalar(20);
      //     peach.Particle()
      //       .setPosition(pos.x, pos.y, pos.z)
      //       .addChildTo(self)
      //       .on("enterframe", function(e) {
      //         this.position.add(to);
      //       });
      //   });
      // });

      peach.Ground.generate((-15).toRadian(), 30)
        .setPosition(0, -2200, 0)
        .addChildTo(this)
        .tweener
        .to({
          scrollDirection: (0).toRadian()
        }, 10000, "easeInOutBack")
        .to({
          scrollDirection: (290).toRadian()
        }, 10000, "easeInOutBack")
        .setLoop(true);
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
