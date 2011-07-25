(function($){

  o3djs.base.o3d = o3d;
  o3djs.require('o3djs.webgl');
  o3djs.require('o3djs.util');
  o3djs.require('o3djs.math');
  o3djs.require('o3djs.rendergraph');
  o3djs.require('o3djs.primitives');
  o3djs.require('o3djs.material');

  // Events
  // init() once the page has finished loading.
  // unload() when the page is unloaded.
  //window.onload = init;
  //window.onunload = unload;

  // global variables
  var g_timeMult = 1.0;
  var g_framesRendered = 0;
  var g_o3d;
  var g_math;
  var g_client;
  var g_viewInfo;
  var g_pack;
  var g_clock = 0;
  var g_finished = false;  // for selenium testing
  var g_groupTransforms = [];
  var GROUPS_ACROSS = 2;
  var UNITS_ACROSS_GROUP = 2;
  var TOTAL_ACROSS = GROUPS_ACROSS * UNITS_ACROSS_GROUP;
  var HALF_WIDTH = TOTAL_ACROSS * 0.0;
  var UNIT_SPACING = 100;

  /**
 * Make a grid of transforms and put a teapot instance on each one
 * @param {!o3d.Pack} pack Pack to create transforms in.
 * @param {!o3d.Shape} shape Shape to instance.
 */
  function createInstances(pack, shape) {
	for (var g = 0; g < GROUPS_ACROSS; g++) {
      for (var h = 0; h < GROUPS_ACROSS; h++) {
		for (var i = 0; i < GROUPS_ACROSS; i++) {
          var groupTransform = pack.createObject('Transform');
          g_groupTransforms[g_groupTransforms.length] = groupTransform;
          groupTransform.parent = g_client.root;
          groupTransform.translate(
            (g * UNITS_ACROSS_GROUP - HALF_WIDTH) * UNIT_SPACING,
            (h * UNITS_ACROSS_GROUP - HALF_WIDTH) * UNIT_SPACING,
            (i * UNITS_ACROSS_GROUP - HALF_WIDTH) * UNIT_SPACING);
          for (var x = 0; x < UNITS_ACROSS_GROUP; x++) {
			for (var y = 0; y < UNITS_ACROSS_GROUP; y++) {
              for (var z = 0; z < UNITS_ACROSS_GROUP; z++) {
				var transform = pack.createObject('Transform');
				transform.parent = groupTransform;
				transform.addShape(shape);
				transform.translate(
                  (x - UNITS_ACROSS_GROUP * 0.5) * UNIT_SPACING,
                  (y - UNITS_ACROSS_GROUP * 0.5) * UNIT_SPACING,
                  (z - UNITS_ACROSS_GROUP * 0.5) * UNIT_SPACING);
				transform.createParam('diffuse', 'ParamFloat4').value = [
                  (g * UNITS_ACROSS_GROUP + x) * (1 / TOTAL_ACROSS),
                  (h * UNITS_ACROSS_GROUP + y) * (1 / TOTAL_ACROSS),
                  (i * UNITS_ACROSS_GROUP + z) * (1 / TOTAL_ACROSS),
                  0.5];
              }
			}
          }
		}
      }
	}
  }

  /**
 * Creates the client area.
 */
  function init() {
	o3djs.webgl.makeClients(initStep2);
  }

  /**
 * Initializes O3D and creates one shape.
 * @param {Array} clientElements Array of o3d object elements.
 */
  function initStep2(clientElements) {
	// Initialize global variables and libraries.
	var o3dElement = clientElements[0];
	g_o3d = o3dElement.o3d;
	g_math = o3djs.math;
	g_client = o3dElement.client;

	// Creates a pack to manage our resources/assets
	g_pack = g_client.createPack();

	g_viewInfo = o3djs.rendergraph.createBasicView(
      g_pack,
      g_client.root,
      g_client.renderGraphRoot);

	// Create our projection matrix, with a vertical field of view of 45
	// degrees a near clipping plane of 0.1 and far clipping plane of 10000.
	g_viewInfo.drawContext.projection = g_math.matrix4.perspective(
      g_math.degToRad(45),
      g_client.width / g_client.height,
      0.1,
      10000);

	// Create a Material.
	var material = o3djs.material.createBasicMaterial(
      g_pack, g_viewInfo, [1, 1, 1, 1], true);

	// Create a sphere.
	var shape = o3djs.primitives.createSphere(g_pack, material, 30, 20, 20);

	createInstances(g_pack, shape);

	// Setup an onrender callback for animation.
	g_client.setRenderCallback(onrender);

	g_finished = true;  // for selenium testing.
  }

  // spin the camera.
  function onrender(renderEvent) {
	g_framesRendered++;
	// Get the number of seconds since the last render.
	var elapsedTime = renderEvent.elapsedTime;
	g_clock += elapsedTime * g_timeMult;

	var x = Math.sin(g_clock * 0.1) * 400;
	var z = Math.cos(g_clock * 0.1) * 400;
	var y = Math.sin(g_clock * 0.2) * 400;

	g_viewInfo.drawContext.view = g_math.matrix4.lookAt(
      [x, y, z],  // eye
      [0, 0, 0],  // target
      [0, 1, 0]); // up
  }

  /**
 * Removes any callbacks so they don't get called after the page has unloaded.
 */
  function unload() {
	if (g_client) {
      g_client.cleanup();
	}
  }

  $(window).load(init);
  $(window).unload(unload);
})(jQuery);

