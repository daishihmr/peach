phina.namespace(function() {

  phina.define("peach.VoxAsset", {
    superClass: "phina.asset.Asset",

    init: function() {
      this.superInit();
    },

    _load: function(resolve) {
      var parser = new vox.Parser();
      parser.parse(this.src).then(function(data) {

        var voxels = data.voxels;
        var palette = data.palette;

        var geometry = new THREE.Geometry();
        for (var i = 0, len = voxels.length; i < len; i++) {
          var voxel = voxels[i];
          var p = palette[voxel.colorIndex];

          var vertex = new THREE.Vector3();
          vertex.x = voxel.x * 10;
          vertex.y = voxel.z * 10;
          vertex.z = voxel.y * -10;
          geometry.vertices.push(vertex);

          var color = new THREE.Color();
          color.r = p.r / 255;
          color.g = p.g / 255;
          color.b = p.b / 255;
          geometry.colors.push(color);
        }
        geometry.translate(data.size.x / -2 * 10, data.size.z / -2 * 10, data.size.y / +2 * 10);

        var material = peach.VoxAsset.createMaterial();

        resolve(new THREE.Points(geometry, material));
      });
    },

    _static: {
      createMaterial: function() {
        return new THREE.PointsMaterial({
          size: 15,
          sizeAttenuation: true,
          vertexColors: THREE.VertexColors,
          fog: true,
          transparent: false,
          map: peach.VoxAsset.commonTexture,
        });
      },

      commonTexture: (function() {
        var canvas = phina.graphics.Canvas().setSize(64, 64);
        canvas.strokeStyle = "rgb(180, 180, 180)";
        canvas.fillStyle = (function() {
          var grad = canvas.context.createLinearGradient(0, 0, 64, 64);
          grad.addColorStop(0.0, "rgb(255, 255, 255)");
          grad.addColorStop(1.0, "rgb(200, 200, 200)");
          return grad;
        })();
        canvas.fillRect(0, 0, 64, 64);
        canvas.strokeStyle = "rgb(180, 180, 180)";
        canvas.strokeRect(0, 0, 64, 64);

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
