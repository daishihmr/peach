var W = 480 * 1;
var H = 320 * 1;

phina.main(function() {
  var app = peach.Application();
  app.run();
  
  app.enableStats();
});

phina.namespace(function() {

  phina.define("peach.Application", {
    superClass: "phina.display.CanvasApp",
    
    gamepadManager: null,

    init: function() {
      this.superInit({
        fps: 60,
        width: W,
        height: H,
      });
      
      this.gamepadManager = phina.input.GamepadManager();
      
      this.replaceScene(peach.MainSequance());
    },

    update: function() {
      this.mouse.update();
      this.touch.update();
      this.touchList.update();
      this.keyboard.update();
      this.gamepadManager.update();
    },

  });

});

phina.namespace(function() {

  peach.danmaku = peach.danmaku || {};

  var action = bulletml.dsl.action;
  var actionRef = bulletml.dsl.actionRef;
  var bullet = bulletml.dsl.bullet;
  var bulletRef = bulletml.dsl.bulletRef;
  var fire = bulletml.dsl.fire;
  var fireRef = bulletml.dsl.fireRef;
  var changeDirection = bulletml.dsl.changeDirection;
  var changeSpeed = bulletml.dsl.changeSpeed;
  var accel = bulletml.dsl.accel;
  var wait = bulletml.dsl.wait;
  var vanish = bulletml.dsl.vanish;
  var repeat = bulletml.dsl.repeat;
  var bindVar = bulletml.dsl.bindVar;
  var notify = bulletml.dsl.notify;
  var direction = bulletml.dsl.direction;
  var speed = bulletml.dsl.speed;
  var horizontal = bulletml.dsl.horizontal;
  var vertical = bulletml.dsl.vertical;
  var fireOption = bulletml.dsl.fireOption;
  var offsetX = bulletml.dsl.offsetX;
  var offsetY = bulletml.dsl.offsetY;
  var autonomy = bulletml.dsl.autonomy;

  var interval = function(v) {
    return wait("{0} * (0.3 + (1.0 - $densityRank) * 0.7)".format(v));
  };
  var spd = function(v) {
    return speed("{0} * (1.0 + $speedRank * 2.0)".format(v));
  };
  var spdSeq = function(v) {
    return speed("{0} * (1.0 + $speedRank * 2.0)".format(v), "sequence");
  };

  var R0 = bullet({
    type: 4
  });
  var R1 = bullet({
    type: 5
  });
  var R2 = bullet({
    type: 6
  });
  var R3 = bullet({
    type: 7
  });
  var B4 = bullet({
    type: 8
  });
  var B5 = bullet({
    type: 9
  });
  var R4 = bullet({
    type: 10
  });
  var R5 = bullet({
    type: 11
  });
  var DM = bullet({
    dummy: true
  });

  // ザコヘリ用
  var basic = function(s, dir) {
    return new bulletml.Root({
      top: action([
        interval(10),
        repeat(Infinity, [
          fire(DM, spd(s), direction(dir)),
          repeat("$burst + 1", [
            fire(R2, spdSeq(0.15), direction(0, "sequence")),
          ]),
          interval(50),
        ]),
      ]),
    });
  };
  peach.danmaku.basic = basic(1, 0);
  peach.danmaku.basicR1 = basic(1, -5);
  peach.danmaku.basicL1 = basic(1, +5);
  peach.danmaku.basicR2 = basic(1, -15);
  peach.danmaku.basicL2 = basic(1, +15);
  peach.danmaku.basicF = basic(1.2, 0);
  peach.danmaku.basicFR1 = basic(1.2, -5);
  peach.danmaku.basicFL1 = basic(1.2, +5);
  peach.danmaku.basicFR2 = basic(1.2, -15);
  peach.danmaku.basicFL2 = basic(1.2, +15);

  // ザコヘリ3way
  var basic3way = function(dir) {
    return new bulletml.Root({
      top: action([
        interval(10),
        repeat(Infinity, [
          fire(DM, spd(1), direction(dir - 7)),
          repeat("$burst + 1", [
            fire(R2, spdSeq(0), direction(0, "sequence")),
            fire(R2, spdSeq(0), direction(7, "sequence")),
            fire(R2, spdSeq(0), direction(7, "sequence")),
            fire(DM, spdSeq(0.05), direction(-14, "sequence")),
          ]),
          interval(50),
        ]),
      ]),
    });
  };
  peach.danmaku.basic3way = basic3way(0);
  peach.danmaku.basic3wayR1 = basic3way(-5);
  peach.danmaku.basic3wayL1 = basic3way(+5);
  peach.danmaku.basic3wayR2 = basic3way(-15);
  peach.danmaku.basic3wayL2 = basic3way(+15);

  // ザコ戦車用
  var forward = function(s, dir) {
    return new bulletml.Root({
      top: action([
        interval(10),
        repeat(Infinity, [
          repeat(3, [
            fire(DM, spd(s), direction(dir, "relative")),
            repeat("$burst + 1", [
              fire(R2, spdSeq(0.15), direction(0, "sequence")),
            ]),
            interval(10),
          ]),
          interval(50),
        ]),
      ]),
    });
  };
  peach.danmaku.forward = forward(1, 0);
  peach.danmaku.forwardR1 = forward(1, -5);
  peach.danmaku.forwardL1 = forward(1, +5);
  peach.danmaku.forwardR2 = forward(1, -15);
  peach.danmaku.forwardL2 = forward(1, +15);
  peach.danmaku.forwardF = forward(1.2, 0);
  peach.danmaku.forwardFR1 = forward(1.2, -5);
  peach.danmaku.forwardFL1 = forward(1.2, +5);
  peach.danmaku.forwardFR2 = forward(1.2, -15);
  peach.danmaku.forwardFL2 = forward(1.2, +15);

  // ザコ戦車3way
  var forward3way = function(s, dir) {
    return new bulletml.Root({
      top: action([
        interval(10),
        repeat(Infinity, [
          repeat(3, [
            fire(DM, spd(s), direction(dir + "-5", "relative")),
            repeat("$burst + 1", [
              fire(R2, spdSeq(0), direction(+5, "sequence")),
              fire(R2, spdSeq(0), direction(+5, "sequence")),
              fire(R2, spdSeq(0), direction(+5, "sequence")),
              fire(DM, spdSeq(0.15), direction(-15, "sequence")),
            ]),
            interval(10),
          ]),
          interval(50),
        ]),
      ]),
    });
  };
  peach.danmaku.forward3way = forward3way(1, 0);
  peach.danmaku.forward3wayR1 = forward3way(1, -5);
  peach.danmaku.forward3wayL1 = forward3way(1, +5);
  peach.danmaku.forward3wayR2 = forward3way(1, -15);
  peach.danmaku.forward3wayL2 = forward3way(1, +15);
  peach.danmaku.forward3wayF = forward3way(1.2, 0);
  peach.danmaku.forward3wayFR1 = forward3way(1.2, -5);
  peach.danmaku.forward3wayFL1 = forward3way(1.2, +5);
  peach.danmaku.forward3wayFR2 = forward3way(1.2, -15);
  peach.danmaku.forward3wayFL2 = forward3way(1.2, +15);

});

phina.namespace(function() {

  peach.danmaku = peach.danmaku || {};

  var action = bulletml.dsl.action;
  var actionRef = bulletml.dsl.actionRef;
  var bullet = bulletml.dsl.bullet;
  var bulletRef = bulletml.dsl.bulletRef;
  var fire = bulletml.dsl.fire;
  var fireRef = bulletml.dsl.fireRef;
  var changeDirection = bulletml.dsl.changeDirection;
  var changeSpeed = bulletml.dsl.changeSpeed;
  var accel = bulletml.dsl.accel;
  var wait = bulletml.dsl.wait;
  var vanish = bulletml.dsl.vanish;
  var repeat = bulletml.dsl.repeat;
  var bindVar = bulletml.dsl.bindVar;
  var notify = bulletml.dsl.notify;
  var direction = bulletml.dsl.direction;
  var speed = bulletml.dsl.speed;
  var horizontal = bulletml.dsl.horizontal;
  var vertical = bulletml.dsl.vertical;
  var fireOption = bulletml.dsl.fireOption;
  var offsetX = bulletml.dsl.offsetX;
  var offsetY = bulletml.dsl.offsetY;
  var autonomy = bulletml.dsl.autonomy;

  var interval = function(v) {
    return wait("{0} * (0.3 + (1.0 - $densityRank) * 0.7)".format(v));
  };
  var spd = function(v) {
    return speed("{0} * (1.0 + $speedRank * 2.0)".format(v));
  };
  var spdSeq = function(v) {
    return speed("{0} * (1.0 + $speedRank * 2.0)".format(v), "sequence");
  };

  var R0 = function(action) {
    return bullet(action, {
      type: 4
    });
  };
  var R1 = function(action) {
    return bullet(action, {
      type: 5
    });
  };
  var R2 = function(action) {
    return bullet(action, {
      type: 6
    });
  };
  var R3 = function(action) {
    return bullet(action, {
      type: 7
    });
  };
  var B4 = function(action) {
    return bullet(action, {
      type: 8
    });
  };
  var B5 = function(action) {
    return bullet(action, {
      type: 9
    });
  };
  var R4 = function(action) {
    return bullet(action, {
      type: 10
    });
  };
  var R5 = function(action) {
    return bullet(action, {
      type: 11
    });
  };
  var DM = function(action) {
    return bullet(action, {
      dummy: true
    });
  };

  // 黒川
  peach.danmaku.kurokawa1 = new bulletml.Root({
    top: action([
      interval(20),
      repeat(Infinity, [
        repeat(3, [
          fire(DM, spd(1.2)),
          repeat(3, [
            fire(R0, spdSeq(0), direction(0, "sequence")),
            wait(6),
          ]),
          interval(12),
        ]),
        interval(50),
      ]),
    ]),
  });

  // 秋元
  peach.danmaku.akimoto1 = new bulletml.Root({
    top0: action([
      repeat(Infinity, [
        interval(20),
        fire(R2, spd(1.0), direction(-30)),
        repeat(8, [
          fire(R2, spdSeq(0), direction(60 / 8, "sequence")),
        ]),
        interval(80),
      ]),
    ]),
    top1: action([
      repeat(Infinity, [
        interval(50),
        fire(R1, spd(1.2), direction(-10)),
        repeat(6, [
          fire(R1, spdSeq(0), direction(20 / 6, "sequence")),
        ]),
        interval(50),
      ]),
    ]),
  });

  // 黄瀬
  peach.danmaku.kise1 = new bulletml.Root({
    top: action([
      interval(20),
      repeat(Infinity, [
        fire(DM, spd(0.6)),
        repeat(5, [
          repeat(9, [
            fire(R4, spdSeq(0.02), direction(360 / (9 - 1), "sequence")),
          ]),
          wait(4),
          fire(DM, direction(7, "sequence"), spd(0.6)),
        ]),
        interval(50),
      ]),
    ]),
  });

  // 雪城1
  peach.danmaku.yukishiro1 = new bulletml.Root({
    top: action([
      wait(120),
      fire(DM, spd(0.6)),
      repeat(3, [
        bindVar("dd", "$loop.index"),
        fire(R4, spdSeq(0.08), direction(-60)),
        repeat(8, [
          repeat(8, [
            fire(R4, spdSeq(0), direction(120 / 8, "sequence")),
          ]),
          wait(5),
          fire(R4, spdSeq(0), direction("-120 + $dd * 1.4", "sequence")),
        ]),
        wait(30),
        fire(R4, spdSeq(0.08), direction(-60)),
        repeat(8, [
          repeat(8, [
            fire(R4, spdSeq(0), direction(120 / 8, "sequence")),
          ]),
          wait(5),
          fire(R4, spdSeq(0), direction("-120 - ($dd + 1) * 1.4", "sequence")),
        ]),
        wait(30),
      ]),
      notify("end", {
        next: "yukishiro2"
      }),
    ]),
  });
  // 雪城2
  peach.danmaku.yukishiro2 = new bulletml.Root({
    top: action([
      interval(60),
      repeat(10, [
        fire(DM(actionRef("b")), speed(10), direction(-90, "absolute")),
        fire(DM(actionRef("b")), speed(10), direction(+90, "absolute")),
        interval(30),
      ]),
      notify("end", {
        next: "yukishiro3"
      }),
    ]),
    b: action([
      wait(2),
      fire(R2, spd(0.9), direction(-60)),
      repeat(10, [
        fire(R2, spdSeq(0), direction(120 / 10, "sequence")),
      ]),
    ]),
  });
  // 雪城3
  peach.danmaku.yukishiro3 = new bulletml.Root({
    top: action([
      interval(60),
      repeat(6, [
        bindVar("p", "$loop.index"),
        repeat(10, [
          fire(DM(actionRef("b", 180 - 10, "-($loop.index + $p * 6)")), speed(10), direction(-90, "absolute")),
          fire(DM(actionRef("b", 180 + 10, "+($loop.index + $p * 6)")), speed(10), direction(+90, "absolute")),
          interval(8),
        ]),
        interval(25),
      ]),
      notify("end", {
        next: "yukishiro1"
      }),
    ]),
    b: action([
      wait(2),
      fire(R4, spd(0.7), direction("$1 + Math.sin($2 * 0.35) * 30 - 10", "absolute")),
      fire(R5, spdSeq(0), direction(10, "sequence")),
      fire(R4, spdSeq(0), direction(10, "sequence")),
    ]),
  });

  // 美墨1-1
  peach.danmaku.misumi11 = new bulletml.Root({
    top: action([
      notify("end", {
        next: "misumi12",
      }),
    ]),
  });
  // 美墨1-2
  peach.danmaku.misumi12 = new bulletml.Root({
    top: action([
      notify("end", {
        next: "misumi13",
      }),
    ]),
  });
  // 美墨1-3
  peach.danmaku.misumi13 = new bulletml.Root({
    top: action([
      notify("end", {
        next: "misumi11",
      }),
    ]),
  });
  // 美墨2-1
  peach.danmaku.misumi21 = new bulletml.Root({
    top: action([
      notify("end", {
        next: "misumi22",
      }),
    ]),
  });
  // 美墨2-2
  peach.danmaku.misumi22 = new bulletml.Root({
    top: action([
      notify("end", {
        next: "misumi23",
      }),
    ]),
  });
  // 美墨2-3
  peach.danmaku.misumi23 = new bulletml.Root({
    top: action([
      notify("end", {
        next: "misumi21",
      }),
    ]),
  });
  // 美墨3-1
  peach.danmaku.misumi31 = new bulletml.Root({
    top: action([
      notify("end", {
        next: "misumi31",
      }),
    ]),
  });

});

phina.namespace(function() {

  phina.define("peach.Bullet", {
    superClass: "peach.Vox",

    runner: null,
    active: false,

    init: function(assetName) {
      this.superInit(assetName);
    },

    update: function(app) {
      var runner = this.runner;
      if (runner) {
        var bx = this.x;
        var by = this.z;
        runner.x = bx;
        runner.y = by;
        runner.update();
        var dx = runner.x - bx;
        var dy = runner.y - by;
        
        this.rotationY = Math.atan2(-dy, dx).toDegree();

        this.x += dx * peach.Bullet.globalSpeedRate;
        this.z += dy * peach.Bullet.globalSpeedRate;
      }
    },

    spawn: function(runner, spec) {
      this.x = runner.x;
      this.y = runner.y;
      this.runner = runner;
      this.visible = !spec.dummy;
      this.active = true;

      this.radius = 5; // TODO

      return this;
    },

    erase: function() {
      if (!this.visible) {
        this.remove();
      }

      this.active = false;
      this.runner.fireable = false;
      return this;
    },

    hitTest: function(_x, _z) {
      if (!this.visible || !this.active || !this.parent) return false;

      var x = _x - this.x;
      var z = _z - this.z;

      if ((x * x + z * z) < (this.radius * this.radius)) {
        return true;
      }
      return false;
    },

    _static: {
      globalSpeedRate: 1.0,
    },

  });

});

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
      material.size = 75;
      material.fog = true;
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

phina.namespace(function() {

  phina.define("peach.Label", {
    superClass: "phina.display.Label",

    init: function(text, options) {
      this.superInit({
        text: text,
        fontFamily: "main",
        fontSize: W * 0.08,
        fill: "white",
      }.$extend(options));
    },
    
    update: function(app) {
      this.alpha = 0.75 + Math.sin(app.ticker.frame * 0.2) * 0.25;
    }
  });

});

phina.namespace(function() {

  var X_MIN = -5200;
  var X_MAX = +5200;
  var Z_MIN = -4800;
  var Z_MAX = +2800;

  var TEMP_V0 = new THREE.Vector3();
  var TEMP_V1 = new THREE.Vector3();
  var TEMP_Q = new THREE.Quaternion();
  var VECTOR3_Y = new THREE.Vector3(0, 1, 0);
  var ROT_UNIT = (6).toRadian();

  var GUN_POSITION = new THREE.Vector3();

  phina.define("peach.Player", {
    superClass: "peach.ThreeElement",

    direction: 0,

    init: function() {
      this.superInit();

      this.bodyParent = peach.ThreeElement().addChildTo(this);
      this.body = peach.Vox("player").addChildTo(this.bodyParent);
      this.bit = peach.Vox("bit").addChildTo(this);

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
          toAngle = Math.clamp(toAngle, Math.PI / -2, Math.PI / 2);
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

        this.x = Math.clamp(this.x + v.x * this.speed, X_MIN, X_MAX);
        this.z = Math.clamp(this.z + v.y * this.speed, Z_MIN, Z_MAX);

        TEMP_V0.set(v.x, 0, v.y).normalize();
        TEMP_V1.set(v.x, -1.0, v.y).normalize();
        var angle = Math.acos(TEMP_V0.dot(TEMP_V1));
        TEMP_Q.setFromAxisAngle(TEMP_V0.applyAxisAngle(VECTOR3_Y, Math.PI / 2), angle);
      } else {
        if (!keyboard.getKey("z")) {
          if (this.direction != 0) {
            var abs = Math.abs(this.direction);
            if (abs < ROT_UNIT) {
              this.direction = 0;
            } else {
              this.direction -= abs / this.direction * ROT_UNIT;
            }
          }
        }
        this.speed = 0;
        TEMP_Q.set(0, 0, 0, 1);
      }
      this.body.rotationY = this.direction.toDegree();
      this.bit.rotationY = this.direction.toDegree();
      this.bodyParent.$t.quaternion.slerp(TEMP_Q, 0.1);

      if (keyboard.getKey("z") && app.ticker.frame % 5 === 0) {
        this.fireShot(GUN_POSITION.set(-400, 0, -100));
        this.fireShot(GUN_POSITION.set(+400, 0, -100));
      }
    },

    fireShot: function(gunPosition) {
      // TODO

      var d = this.direction + Math.randfloat(-0.1, 0.1) - Math.PI / 2;
      var p = peach.Vox("bullet04")
        .addChildTo(this.parent)
        .on("enterframe", function() {
          this.forward(300);
        });

      var m = this.bit.$t.matrixWorld;
      p.$t.position.copy(gunPosition.applyMatrix4(m));
      p.$t.rotation.setFromRotationMatrix(m);

      p.tweener
        .wait(150)
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

phina.namespace(function() {
  
  var TEMP_VECTOR = new THREE.Vector3();

  phina.define("peach.ThreeElement", {
    superClass: "phina.app.Element",

    $t: null,

    init: function(threeObject) {
      this.superInit();
      this.$t = threeObject || new THREE.Object3D();

      this.$t.$p = this;
    },

    forward: function(distance) {
      TEMP_VECTOR
        .set(0, 0, -distance)
        .applyQuaternion(this.$t.quaternion);
      this.position.add(TEMP_VECTOR);
    },

    addChild: function(child) {
      this.superMethod("addChild", child);
      if (child.$t) this.$t.add(child.$t);
      return this;
    },
    removeChild: function(child) {
      this.superMethod("removeChild", child);
      if (child.$t) this.$t.remove(child.$t);
      return this;
    },

    setPosition: function(x, y, z) {
      this.$t.position.set(x, y, z);
      return this;
    },
    setScale: function(x, y, z) {
      if (arguments.length === 1) {
        this.$t.scale.set(x, x, x);
      } else {
        this.$t.scale.set(x, y, z);
      }
      return this;
    },
    setRotation: function(x, y, z) {
      this.$t.rotation.set(x, y, z);
      return this;
    },

    _accessor: {
      visible: {
        get: function() {
          return this.$t.visible;
        },
        set: function(v) {
          this.$t.visible = v;
        }
      },
      matrix: {
        get: function() {
          return this.$t.matrix;
        }
      },
      position: {
        get: function() {
          return this.$t.position;
        },
        set: function(v) {
          this.$t.position = v;
        }
      },
      x: {
        get: function() {
          return this.$t.position.x;
        },
        set: function(v) {
          this.$t.position.x = v;
        }
      },
      y: {
        get: function() {
          return this.$t.position.y;
        },
        set: function(v) {
          this.$t.position.y = v;
        }
      },
      z: {
        get: function() {
          return this.$t.position.z;
        },
        set: function(v) {
          this.$t.position.z = v;
        }
      },
      scaleX: {
        get: function() {
          return this.$t.scale.x;
        },
        set: function(v) {
          this.$t.scale.x = v;
        }
      },
      scaleY: {
        get: function() {
          return this.$t.scale.y;
        },
        set: function(v) {
          this.$t.scale.y = v;
        }
      },
      scaleZ: {
        get: function() {
          return this.$t.scale.z;
        },
        set: function(v) {
          this.$t.scale.z = v;
        }
      },
      rotationX: {
        get: function() {
          return this.$t.rotation.x.toDegree();
        },
        set: function(v) {
          this.$t.rotation.x = v.toRadian();
        }
      },
      rotationY: {
        get: function() {
          return this.$t.rotation.y.toDegree();
        },
        set: function(v) {
          this.$t.rotation.y = v.toRadian();
        }
      },
      rotationZ: {
        get: function() {
          return this.$t.rotation.z.toDegree();
        },
        set: function(v) {
          this.$t.rotation.z = v.toRadian();
        }
      },
    }
  });

});

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

phina.namespace(function() {
  
  var SCALE = 100;

  phina.define("peach.VoxAsset", {
    superClass: "phina.asset.Asset",

    init: function() {
      this.superInit();
    },

    _load: function(resolve) {
      var url = this.src.url;
      var scale = SCALE * (this.src.scale || 1);
      var parser = new vox.Parser();
      parser.parse(url).then(function(data) {

        var voxels = data.voxels;
        var palette = data.palette;

        var geometry = new THREE.Geometry();
        for (var i = 0, len = voxels.length; i < len; i++) {
          var voxel = voxels[i];
          var p = palette[voxel.colorIndex];

          var vertex = new THREE.Vector3();
          vertex.x = voxel.x * scale;
          vertex.y = voxel.z * scale;
          vertex.z = voxel.y * -scale;
          geometry.vertices.push(vertex);

          var color = new THREE.Color();
          color.r = p.r / 255;
          color.g = p.g / 255;
          color.b = p.b / 255;
          geometry.colors.push(color);
        }
        geometry.translate(data.size.x / -2 * scale, data.size.z / -2 * scale, data.size.y / +2 * scale);

        var material = peach.VoxAsset.createMaterial();

        resolve(new THREE.Points(geometry, material));
      });
    },

    _static: {
      createMaterial: function() {
        return new THREE.PointsMaterial({
          size: SCALE * 2.0,
          sizeAttenuation: true,
          vertexColors: THREE.VertexColors,
          fog: false,
          transparent: false,
          map: peach.VoxAsset.commonTexture,
        });
      },

      commonTexture: (function() {
        var canvas = phina.graphics.Canvas().setSize(64, 64);
        canvas.fillStyle = (function() {
          var grad = canvas.context.createLinearGradient(0, 0, 64, 64);
          grad.addColorStop(0.0, "rgb(255, 255, 255)");
          grad.addColorStop(1.0, "rgb(200, 200, 200)");
          return grad;
        })();
        canvas.fillRect(0, 0, 64, 64);

        return new THREE.CanvasTexture(canvas.domElement);
      })(),
    },
  });

  phina.asset.AssetLoader.assetLoadFunctions["vox"] = function(key, path) {
    var voxelModel = peach.VoxAsset();
    var flow = voxelModel.load(path);
    return flow;
  };

});

phina.namespace(function() {

  phina.define("peach.Particle", {
    superClass: "peach.Vox",

    init: function() {
      this.superInit("particle");

      this.$t.material = this.$t.material.clone();

      this.material = this.$t.material;
      this.material.fog = false;
      this.material.blending = THREE.AdditiveBlending;
      this.material.color = new THREE.Color(0xff6633);
      this.material.transparent = true;
      
      this.tweener
        .set({
          size: 10,
          // opacity: 1.0
        })
        .to({
          size: 400,
          // opacity: 1.0
        }, 100, "easeOutQuad")
        .to({
          size: 1,
          // opacity: 0.0
        }, 300, "easeInQuad")
        .call(function() {
          this.remove();
        }.bind(this));
    },

    _accessor: {
      opacity: {
        get: function() {
          return this.material.opacity;
        },
        set: function(v) {
          this.material.opacity = v;
        }
      },
      size: {
        get: function() {
          return this.material.size;
        },
        set: function(v) {
          this.material.size = v;
        }
      },
    },
  });

});

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

phina.namespace(function() {

  phina.define("peach.LoadingScene", {
    superClass: "phina.game.LoadingScene",

    init: function(param) {
      var assets = {};
      switch (param.assetType) {
        case "common":
          assets["font"] = {
            "main": "asset/Orbitron-Regular.ttf",
          };
          assets["vox"] = {
            "player": { url: "asset/player.vox", scale: 0.1, },
            "bit": { url: "asset/bit.vox", scale: 0.1, },
            "bullet01": { url: "asset/bullet01.vox", scale: 1, },
            "bullet02": { url: "asset/bullet02.vox", scale: 1, },
            "bullet03": { url: "asset/bullet03.vox", scale: 1, },
            "bullet04": { url: "asset/bullet04.vox", scale: 1, },
            "particle": { url: "asset/particle.vox", scale: 1, },
            "misumi": { url: "asset/misumi.vox", scale: 1, },
            "test": { url: "asset/test.vox", scale: 1, },
          };
          break;
        case "stage1":
          break;
        case "stage2":
          break;
        case "stage3":
          break;
        case "stage4":
          break;
        case "stage5":
          break;
      }

      this.superInit({
        width: W,
        height: H,
        assets: assets
      });
    },
    
    onloaded: function() {
      var asset;
      
      asset = phina.asset.AssetManager.get("vox", "bullet01");
      asset.material.blending = THREE.AdditiveBlending;

      asset = phina.asset.AssetManager.get("vox", "bullet02");
      asset.material.blending = THREE.AdditiveBlending;

      asset = phina.asset.AssetManager.get("vox", "player");
      asset.material.size = 15;

      asset = phina.asset.AssetManager.get("vox", "bit");
      asset.material.size = 15;
    },

  });

});

phina.namespace(function() {

  phina.define("peach.MainSequance", {
    superClass: "phina.game.ManagerScene",

    init: function() {
      this.superInit({
        scenes: [{
          label: "loading0",
          className: "peach.LoadingScene",
          arguments: {
            assetType: "common",
          },
          nextLabel: "title",
        }, {
          label: "title",
          className: "peach.TitleScene",
        }, {
          label: "main",
          className: "peach.GameScene",
        }, ],
      });
    },
  });

  phina.define("peach.ArcadeModeSequance", {
    superClass: "phina.game.ManagerScene",

    init: function() {
      this.superInit({
        scenes: [],
      });
    },
  });

});

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

phina.namespace(function() {

  phina.define("peach.TitleScene", {
    superClass: "phina.display.DisplayScene",

    init: function() {
      this.superInit({
        backgroundColor: "black",
        width: W,
        height: H,
      });
      peach.Label("Test")
        .setPosition(this.gridX.span(8), this.gridY.span(6))
        .addChildTo(this);
    },
    
    update: function(app) {
      if (app.pointer.getPointingEnd() || app.keyboard.getKeyDown("z")) {
        this.exit();
      }
    }
  });

});

//# sourceMappingURL=peach.js.map
