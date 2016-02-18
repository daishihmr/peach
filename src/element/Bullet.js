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
