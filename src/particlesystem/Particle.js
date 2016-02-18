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
