//// Adjust canvas to view width

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});

// Create camera
var camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth/window.innerHeight, 
  0.1, 
  1000
);

// Set camera inside sphere
camera.position.x = 20;
camera.position.y = -100;
camera.position.z = 80;

//camera.position = [0,0,0];

// Set camera on below sphere 1
//camera.position.y = -105;

// Set camera to see sphere
//camera.position.z = 200;

  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x222122 );

  /*
   * Create camera lights
   */

  // Light inside sphere
  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0, 50);
  scene.add(light);
  
  var light2 = new THREE.DirectionalLight(0xffffff);
  //light2.position.set(-25, 5, -2);
  light2.position.set(-25, 0, -2);
  scene.add(light2);
  
  var light3 = new THREE.DirectionalLight(0xffffff);
  light3.position.set(200, -50, -60);
  scene.add(light3);

  var light4 = new THREE.DirectionalLight(0xffffff);
  light4.position.set(-25, -400, -2);
  //scene.add(light4);

  // Camera - below sphere
  /*var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0,-105,0)
  scene.add(light);*/

  /*
   * Build geometry
   */

  //Build spheregeometry
  //var geometry = new THREE.SphereGeometry(130,9,5);
  var geometry = new THREE.SphereGeometry(130, 13, 9);

  //Build top of spheregeometry 1
  //var geometry = new THREE.SphereGeometry(100,50,30);

  // Bottom of SphereGeometry 2
  //var geomtery = new THREE.CylinderGeometry(5,5,20,32);

  var color = new THREE.Color("#83F1A4");
  var material = new THREE.MeshLambertMaterial( {
      color: color.getHex(), 
      wireframe:true
  });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Resize canvas side to current display
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  // Render every frame
  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    //Animation - inside sphere
    //cube.rotation.x += 0.001;

    cube.rotation.x -= 0.00075;
    //cube.rotation.y += 0.001;

    camera.updateProjectionMatrix();
    renderer.render(scene, camera);


    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
