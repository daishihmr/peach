phina.namespace(function() {
  var TEMP_V0 = new THREE.Vector3();
  var TEMP_V1 = new THREE.Vector3();
  var TEMP_Q = new THREE.Quaternion();
  var VECTOR3_Y = new THREE.Vector3(0, 1, 0);

  phina.define("peach.Player", {
    superClass: "peach.ThreeElement",

    direction: 0,

    init: function() {
      this.superInit();
      this.body = peach.Vox("player").addChildTo(this);

      this.body.$t.material.fog = false;
    },

    update: function(app) {
      var keyboard = app.keyboard;
      var v = keyboard.getKeyDirection();
      if (v && v.lengthSquared()) {
        if (!keyboard.getKey("z")) {
          var ka = Math.atan2(v.x, v.y);
          // var ka = Math.atan2(-v.x, -v.y);
          var da = ka - this.direction;
          da = -Math.PI + (da + Math.PI) % (Math.PI * 2);
          if (da != 0) {
            this.direction += Math.abs(da) / da * (5).toRadian();
          }
        }

        this.x += v.x * 40;
        this.z += v.y * 40;
        this.body.rotationY = this.direction.toDegree();

        TEMP_V0.set(v.x, 0, v.y).normalize();
        TEMP_V1.set(v.x, -1, v.y).normalize();
        var t = Math.acos(TEMP_V0.dot(TEMP_V1));
        TEMP_Q.setFromAxisAngle(TEMP_V0.applyAxisAngle(VECTOR3_Y, Math.PI / 2), t);
      } else {
        TEMP_Q.set(0, 0, 0, 1);
      }
      this.$t.quaternion.slerp(TEMP_Q, 0.1);

      if (keyboard.getKey("z") && app.ticker.frame % 3 === 0) {
        var d = this.direction + Math.randfloat(-0.2, 0.2) - Math.PI / 2;
        var px = -Math.cos(d) * 300;
        var pz = Math.sin(d) * 300;
        var p = peach.Vox("particle")
          .setPosition(this.x, this.y, this.z)
          .addChildTo(this.parent)
          .on("enterframe", function() {
            this.x += px;
            this.z += pz;
          });
        p.$t.material.size = 100;
        p.$t.material.blending = THREE.AdditiveBlending;
        p.$t.material.fog = false;
        p.tweener
          .wait(180 + Math.randint(-8, 8))
          .call(function() {
            var pos = p.$t.position;
            (20).times(function() {
              var to = new THREE.Vector3(Math.randint(-1, 1), Math.randint(-1, 1), Math.randint(-1, 1))
                .normalize()
                .multiplyScalar(20);
              peach.Particle()
                .setPosition(pos.x, pos.y, pos.z)
                .addChildTo(p.parent)
                .on("enterframe", function(e) {
                  this.position.add(to);
                });
            });
            p.remove();
          });
      }
    },

  });

});
