phina.namespace(function() {

  phina.define("peach.Ground", {
    superClass: "peach.ThreeElement",

    init: function() {
      var geometry = new THREE.Geometry();
      var r = phina.util.Random(256);
      var simplexNoise = new SimplexNoise(r);

      for (var x = -100; x <= 100; x++) {
        for (var z = -100; z <= 100; z++) {
          var vertex = new THREE.Vector3();
          vertex.x = x * 100;
          vertex.y = 0;
          vertex.y += simplexNoise.noise(x / 5, z / 5) * 100;
          vertex.y += simplexNoise.noise(x / 20, z / 20) * 200;
          vertex.y += simplexNoise.noise(x / 200, z / 200) * 800;
          vertex.z = z * 100;
          geometry.vertices.push(vertex);

          var color = new THREE.Color().setHSL(0.3, 0.3, 0.8 + vertex.y / 400);
          geometry.colors.push(color);
        }
      }

      var material = peach.VoxAsset.createMaterial();
      material.size = 60;
      this.superInit(new THREE.Points(geometry, material));
    },

    update: function() {
      if (20000 <= this.x) this.x += -40000;
      else if (this.x < -20000) this.x += 40000;

      if (20000 <= this.z) this.z += -40000;
      else if (this.z < -20000) this.z += 40000;
    },

    _static: {
      generate: function(scrollDirection, scrollSpeed) {
        var parent = peach.ThreeElement().setRotation(0, scrollDirection, 0);
        parent.scrollDirection = scrollDirection;
        parent.scrollSpeed = scrollSpeed;

        peach.Ground()
          .setScale(1, 1, 1)
          .setPosition(10000, 0, 10000)
          .addChildTo(parent);
        peach.Ground()
          .setScale(-1, 1, 1)
          .setPosition(-10000, 0, 10000)
          .addChildTo(parent);
        peach.Ground()
          .setScale(1, 1, -1)
          .setPosition(10000, 0, -10000)
          .addChildTo(parent);
        peach.Ground()
          .setScale(-1, 1, -1)
          .setPosition(-10000, 0, -10000)
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
