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

      this.scene.fog = new THREE.FogExp2(0x000022, 0.00010);

      this.camera.fov = 45;
      this.camera.far = 15000;
      this.camera.position.set(
        0,
        Math.sin((60).toRadian()) * 8000,
        Math.cos((60).toRadian()) * 8000
      );
      this.camera.updateProjectionMatrix();
      this.cameraTarget = peach.ThreeElement().addChildTo(this);

      this.threeRenderer.setClearColor(0x000000);

      var self = this;

      this.player = peach.Player().addChildTo(this);
      
      peach.Vox("misumi")
        .setPosition(0, 0, -3000)
        .addChildTo(this);

      this.genAxis();

      peach.Ground.generate((-15).toRadian(), 90)
        .setPosition(0, -3000, 0)
        .addChildTo(this);
    },

    genAxis: function() {
      var material, geometry;

      material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
      });
      geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(-50000, 0, 0),
        new THREE.Vector3(50000, 0, 0)
      );
      peach.ThreeElement(new THREE.Line(geometry, material)).addChildTo(this);

      geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(0, -50000, 0),
        new THREE.Vector3(0, 50000, 0)
      );
      peach.ThreeElement(new THREE.Line(geometry, material)).addChildTo(this);

      geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(0, 0, -50000),
        new THREE.Vector3(0, 0, 50000)
      );
      peach.ThreeElement(new THREE.Line(geometry, material)).addChildTo(this);
    },

    update: function(app) {
      this.camera.position.x = this.player.position.x * 0.25;
      this.cameraTarget.position.x = this.player.position.x * 0.25;
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
