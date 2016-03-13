phina.namespace(function() {

  phina.define("peach.Ground", {
    superClass: "peach.ThreeElement",

    init: function() {
      var geometry = new THREE.Geometry();
      var r = phina.util.Random(652);
      var simplexNoise = new SimplexNoise(r);

      for (var x = -100; x <= 100; x++) {
        for (var z = -100; z <= 100; z++) {
          var vertex = new THREE.Vector3();
          vertex.x = x * 200;
          vertex.y = 0;
          vertex.y += simplexNoise.noise(x / 5, z / 5) * 200;
          vertex.y += simplexNoise.noise(x / 20, z / 20) * 400;
          vertex.y += simplexNoise.noise(x / 200, z / 200) * 800;
          vertex.z = z * 200;
          geometry.vertices.push(vertex);

          var color = new THREE.Color().setHSL(0.3, 0.6, 0.5 + vertex.y / 1000);
          geometry.colors.push(color);
        }
      }

      var material = peach.VoxAsset.createMaterial();
      material.size = 60;
      this.superInit(new THREE.Points(geometry, material));
    },

    update: function() {
      if (40000 <= this.x) this.x += -80000;
      else if (this.x < -40000) this.x += 80000;

      if (40000 <= this.z) this.z += -80000;
      else if (this.z < -40000) this.z += 80000;
    },

    _static: {
      generate: function(scrollDirection, scrollSpeed) {
        var parent = peach.ThreeElement().setRotation(0, scrollDirection, 0);
        parent.scrollDirection = scrollDirection;
        parent.scrollSpeed = scrollSpeed;

        peach.Ground()
          .setScale(1, 1, 1)
          .setPosition(20000, 0, 20000)
          .addChildTo(parent);
        peach.Ground()
          .setScale(-1, 1, 1)
          .setPosition(-20000, 0, 20000)
          .addChildTo(parent);
        peach.Ground()
          .setScale(1, 1, -1)
          .setPosition(20000, 0, -20000)
          .addChildTo(parent);
        peach.Ground()
          .setScale(-1, 1, -1)
          .setPosition(-20000, 0, -20000)
          .addChildTo(parent);

        parent.on("enterframe", function() {
          var d = this.scrollDirection;
          var s = this.scrollSpeed;
          this.children.forEach(function(c) {
            c.x += Math.sin(-d) * s;
            c.z += Math.cos(-d) * s;
          })
        });

        return parent;
      },
    },

  });

});
