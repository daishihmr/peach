phina.namespace(function() {
  var TEMP_V0 = new THREE.Vector3();
  var TEMP_V1 = new THREE.Vector3();
  var TEMP_Q = new THREE.Quaternion();
  var VECTOR3_Y = new THREE.Vector3(0, 1, 0);
  var ROT_UNIT = (5).toRadian();

  var GUN_POSITION = new THREE.Vector3();

  phina.define("peach.Player", {
    superClass: "peach.ThreeElement",

    direction: 0,

    init: function() {
      this.superInit();

      this.bodyParent = peach.ThreeElement().addChildTo(this);
      this.body = peach.Vox("player").addChildTo(this.bodyParent);
      this.bit = peach.Vox("bit").addChildTo(this);

      this.body.$t.material.size = 15;
      this.bit.$t.material.size = 15;

      this.speed = 0;
      this.speedMax = 60;
    },

    _normalizeAngle: function(angle) {
      return (angle + Math.PI * 3) % (Math.PI * 2) - Math.PI;
    },

    update: function(app) {
      var keyboard = app.keyboard;
      var gp = app.gamepadManager.get(0);

      var v = keyboard.getKeyDirection();
      // var v = gp.getStickDirection();
      if (v && v.lengthSquared() > (0.5 * 0.5)) {
        if (!keyboard.getKey("z")) {
          var toAngle = this._normalizeAngle(Math.atan2(v.x, v.y));
          // var toAngle = Math.atan2(-v.x, -v.y);
          var delta = this._normalizeAngle(toAngle - this.direction);
          if (delta != 0) {
            if (Math.abs(delta) > ROT_UNIT) {
              this.direction += Math.abs(delta) / delta * ROT_UNIT;
            } else {
              this.direction = toAngle;
            }
            this.direction = this._normalizeAngle(this.direction);
          }
        }

        this.speed = Math.min(this.speed + 6.5, this.speedMax);

        this.x += v.x * this.speed;
        this.z += v.y * this.speed;
        this.body.rotationY = this.direction.toDegree();
        this.bit.rotationY = this.direction.toDegree();

        TEMP_V0.set(v.x, 0, v.y).normalize();
        TEMP_V1.set(v.x, -0.75, v.y).normalize();
        var angle = Math.acos(TEMP_V0.dot(TEMP_V1));
        TEMP_Q.setFromAxisAngle(TEMP_V0.applyAxisAngle(VECTOR3_Y, Math.PI / 2), angle);
      } else {
        this.speed = 0;
        TEMP_Q.set(0, 0, 0, 1);
      }
      this.bodyParent.$t.quaternion.slerp(TEMP_Q, 0.1);

      if (keyboard.getKey("z") && app.ticker.frame % 5 === 0) {
        this.fireShot(GUN_POSITION.set(-400, 0, -100));
        this.fireShot(GUN_POSITION.set(+400, 0, -100));
      }
    },

    fireShot: function(gunPosition) {
      // TODO

      var d = this.direction + Math.randfloat(-0.1, 0.1) - Math.PI / 2;
      var p = peach.Vox("bullet01")
        .addChildTo(this.parent)
        .on("enterframe", function() {
          this.forward(300);
        });

      var m = this.bit.$t.matrixWorld;
      p.$t.position.copy(gunPosition.applyMatrix4(m));
      p.$t.rotation.setFromRotationMatrix(m);

      p.tweener
        .wait(200 + Math.randint(-8, 8))
        .call(function() {
          // var pos = p.$t.position;
          // (20).times(function() {
          //   var to = new THREE.Vector3(Math.randint(-1, 1), Math.randint(-1, 1), Math.randint(-1, 1))
          //     .normalize()
          //     .multiplyScalar(20);
          //   peach.Particle()
          //     .setPosition(pos.x, pos.y, pos.z)
          //     .addChildTo(p.parent)
          //     .on("enterframe", function(e) {
          //       this.position.add(to);
          //     });
          // });
          p.remove();
        });
    },

  });

});
