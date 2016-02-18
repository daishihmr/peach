phina.namespace(function() {

  phina.define("peach.ThreeElement", {
    superClass: "phina.app.Element",

    $t: null,

    init: function(threeObject) {
      this.superInit();
      this.$t = threeObject || new THREE.Object3D();
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
