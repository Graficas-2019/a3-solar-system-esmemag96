var renderer = null,
scene = null,
camera = null,

system = null,
sphere = null,
orbitControls = null;

var mercuryMovement = null,
venusMovement = null,
earthMovement = null,
marsMovement = null,
jupiterMovement = null,
saturnMovement = null,
uranusMovement = null,
neptuneMovement = null;
plutoMovement = null;

var mercury,
venus,
earth,
moon,
mars,
jupiter,
saturn,
uranus,
neptune,
pluto,
ringsSaturn,
ringsUranus,
moonEarth;

var mercuryGroup,
venusGroup,
earthGroup,
marsGroup,
jupiterGroup,
saturnGroup,
uranusGroup,
neptuneGroup,
plutoGroup;

var jupiterMoons = [79];
var saturnMoons = [53];
var uranusMoons = [27];
var neptuneMoons = [14];
var plutoMoons = [5];

var duration = 10000; // ms
var currentTime = Date.now();
var backgroundScene = new THREE.Scene();
var backgroundCamera = new THREE.Camera();

function createMoons(num, moons, group){
  for (i = 0; i < num; i++){
    var sizeMoon = getRandom(0.09, 0.2);
    MoonGeometry = new THREE.SphereGeometry(sizeMoon, 50, 50);
    map = new THREE.TextureLoader().load("images/moon_1024.jpg");
    Moonpmesh = new THREE.Mesh(MoonGeometry, new THREE.MeshPhongMaterial({map:map}));
    var radians = getRandom(0, 360) * Math.PI / 2 ;
    Moonpmesh.position.x = Math.cos(radians)*6.5;
    Moonpmesh.position.y = Math.sin(radians)*6.5;
    Moonpmesh.position.z = getRandom(-2, 2);
    moons[i] = Moonpmesh;
    group.add(moons[i]);
  }
}

function createScene(canvas){
  // Create the Three.js renderer and attach it to our canvas
  renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
  // Set the viewport size
  renderer.setSize(canvas.width, canvas.height);
  // Create a new Three.js scene
  scene = new THREE.Scene();
  // Set the background color
  //scene.background = new THREE.Color( 0,0,0 );
  // scene.background = new THREE.Color( "rgb(100, 100, 100)" );
  var texture = THREE.ImageUtils.loadTexture( 'images/background.png' );
  var backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 0),
    new THREE.MeshBasicMaterial({
      map: texture
    }));

    backgroundMesh .material.depthTest = false;
    backgroundMesh .material.depthWrite = false;
    backgroundScene .add(backgroundCamera );
    backgroundScene .add(backgroundMesh );
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set( 0, -150, -150 );
    scene.add(camera);

    system = new THREE.Object3D;
    system.position.set(0, 0, 0);

    // Add a directional light to show off the objects
    var light = new THREE.DirectionalLight( 0xffffff, 1.0);
    // var light = new THREE.DirectionalLight( "rgb(255, 255, 100)", 1.5);

    // Position the light out from the scene, pointing at the origin
    light.position.set(-.5, .2, 1);
    light.target.position.set(0,-2,0);
    scene.add(light);

    // This light globally illuminates all objects in the scene equally.
    // Cannot cast shadows
    var ambientLight = new THREE.AmbientLight(0xffcc00, 0.5);
    scene.add(ambientLight);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    //Sun\\
    var textureUrl = "images/sunMap.jpg";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    var geometry = new THREE.SphereGeometry(12, 32, 32);
    sun = new THREE.Mesh(geometry, material);
    system.add( sun );

    //Planets groups\\
    mercuryGroup = new THREE.Object3D;
    venusGroup = new THREE.Object3D;
    earthGroup = new THREE.Object3D;
    marsGroup = new THREE.Object3D;
    jupiterGroup = new THREE.Object3D;
    saturnGroup = new THREE.Object3D;
    uranusGroup = new THREE.Object3D;
    neptuneGroup = new THREE.Object3D;
    plutoGroup = new THREE.Object3D;

    //Mercury\\
    geometry = new THREE.SphereGeometry(1.5, 20, 20);
    var mercuryTexture = "images/mercurymap.jpg";
    var mercuryBump = "images/mercurybump.jpg";
    map = new THREE.TextureLoader().load(mercuryTexture);
    bumpMap = new THREE.TextureLoader().load(mercuryBump);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    mercury = new THREE.Mesh(geometry, material);

    //Venus\\
    geometry = new THREE.SphereGeometry(2, 20, 20);
    var venuTexture = "images/venusmap.jpg";
    var venusBump = "images/venusbump.jpg";
    map = new THREE.TextureLoader().load(venuTexture);
    bumpMap = new THREE.TextureLoader().load(venusBump);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    venus = new THREE.Mesh(geometry, material);

    //Earth\\
    geometry = new THREE.SphereGeometry(3, 20, 20);
    var earthTexture = "images/earthmap1k.jpg";
    var earthNormalMap = "images/earth_normal_2048.jpg";
    var earthspecularMap = "images/earth_specular_spec_1k.jpg";
    map = new THREE.TextureLoader().load(earthTexture);
    normalMap = new THREE.TextureLoader().load(earthNormalMap);
    specularMap = new THREE.TextureLoader().load(earthspecularMap);
    var earth_materials = new THREE.MeshPhongMaterial({ map: map, normalMap: normalMap, specularMap: specularMap });
    earth = new THREE.Mesh(geometry, earth_materials);

    //Earth moon\\
    var sizeMoon = getRandom(0.1, 0.2);
    moonGeometry = new THREE.SphereGeometry(sizeMoon, 50, 50);
    map = new THREE.TextureLoader().load("images/moon_1024.jpg");
    moonEarth = new THREE.Mesh(moonGeometry, new THREE.MeshPhongMaterial({map:map}));
    var radians = getRandom(0, 360) * Math.PI / 2 ;
    moonEarth.position.x = Math.cos(radians)*1.5;
    moonEarth.position.y = Math.sin(radians)*1.5;
    moonEarth.position.z = getRandom(-2, 2)
    earthGroup.add(moonEarth);

    //Mars\\
    geometry = new THREE.SphereGeometry(1.5, 20, 20);
    var marsTexture = "images/mars_1k_color.jpg";
    var marsBump = "images/marsbump1k.jpg";
    map = new THREE.TextureLoader().load(marsTexture);
    bumpMap = new THREE.TextureLoader().load(marsBump);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    mars = new THREE.Mesh(geometry, material);

    //Jupiter\\
    geometry = new THREE.SphereGeometry(6, 20, 20);
    var jupiterTexture = "images/jupitermap.jpg";
    var texture = new THREE.TextureLoader().load(jupiterTexture);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    jupiter = new THREE.Mesh(geometry, material);
    createMoons(10,jupiterMoons,jupiterGroup);

    //Saturn\\
    geometry = new THREE.SphereGeometry(4, 20, 20);
    var saturnTexture = "images/saturnmap.jpg";
    var texture = new THREE.TextureLoader().load(saturnTexture);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    saturn = new THREE.Mesh(geometry, material);
    createMoons(10,saturnMoons,saturnGroup);
    //Saturn Ring\\
    var geometry = new THREE.RingGeometry( 5, 7, 32 );
    var saturnRingsTexture = new THREE.TextureLoader().load("images/saturnringcolor.jpg");
    var saturnMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    ringsSaturn = new THREE.Mesh(geometry,saturnMaterials);

    //Uranus\\
    geometry = new THREE.SphereGeometry(3, 20, 20);
    var uranusTexture = "images/uranusmap.jpg";
    var texture = new THREE.TextureLoader().load(uranusTexture);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    uranus = new THREE.Mesh(geometry, material);
    createMoons(10, uranusMoons, uranusGroup);
    //Uranus Ring\\
    var geometry = new THREE.RingGeometry( 5, 7, 32 );
    var saturnRingsTexture = new THREE.TextureLoader().load("images/uranusringcolour.jpg");
    var saturnMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    ringsUranus = new THREE.Mesh(geometry,saturnMaterials);

    //Neptune\\
    geometry = new THREE.SphereGeometry(3, 20, 20);
    var neptuneTexture = "images/neptunemap.jpg";
    var texture = new THREE.TextureLoader().load(neptuneTexture);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    neptune = new THREE.Mesh(geometry, material);
    createMoons(10,neptuneMoons,neptuneGroup);

    //PLuto\\
    geometry = new THREE.SphereGeometry(1.5, 20, 20);
    var textureUrl = "images/plutomap1k.jpg";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    pluto = new THREE.Mesh(geometry, material);
    createMoons(5, plutoMoons, plutoGroup);

    //Rotation\\
    sun.rotation.x = Math.PI /2;
    mercury.rotation.x = Math.PI /2;
    venus.rotation.x = Math.PI /2;
    earth.rotation.x = Math.PI /2;
    mars.rotation.x = Math.PI /2;
    jupiter.rotation.x = Math.PI /2;
    saturn.rotation.x = Math.PI /2;
    neptune.rotation.x = Math.PI /2;
    uranus.rotation.x = Math.PI /2;
    pluto.rotation.x = Math.PI /2;
    ringsUranus.rotation.x = Math.PI /2;

    //Planets Orbits\\

    //Mercury\\
    var mercuryOrbit = new THREE.EllipseCurve(0,0,25,20,0,  2 * Math.PI,true,0);
    var mercuryPoints = mercuryOrbit.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( mercuryPoints );
    var material = new THREE.MeshPhongMaterial( {color: '#ffffff',} );
    var mercuryEllipse = new THREE.Line(geometry,material);

    //Venus\\
    var venusOrbit = new THREE.EllipseCurve(0,0,32,25,0,  2 * Math.PI,false,0);
    var venusPoints = venusOrbit.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( venusPoints );
    var material = new THREE.MeshPhongMaterial( {color: '#dba829', } );
    var venusEllipse = new THREE.Line(geometry,material);

    //Earth\\
    var earthOrbit = new THREE.EllipseCurve(0,0,38,32,0,  2 * Math.PI,false,0);
    var earthPoints = earthOrbit.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( earthPoints );
    var material = new THREE.MeshPhongMaterial( {color: '#108ae8', } );
    var earthEllipse = new THREE.Line(geometry,material);

    //Mars\\
    var marsOrbit = new THREE.EllipseCurve(0,0,45,38,0,  2 * Math.PI,false,0);
    var marsPoints = marsOrbit.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( marsPoints );
    var material = new THREE.MeshPhongMaterial( {color: '#ba1010', } );
    var marsEllipse = new THREE.Line(geometry,material);

    //Jupiter\\
    var jupiterOrbits = new THREE.EllipseCurve(0,0,59,49,0,  2 * Math.PI,false,0);
    var jupiterPoints = jupiterOrbits.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( jupiterPoints );
    var material = new THREE.MeshPhongMaterial( {color: '#ff8307', } );
    var jupiterEllipse = new THREE.Line(geometry,material);

    //Saturn\\
    var saturnOrbit = new THREE.EllipseCurve(0,0,77,62,0,  2 * Math.PI,false,0);
    var saturnPoints = saturnOrbit.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( saturnPoints );
    var material = new THREE.MeshPhongMaterial( {color: '#ffcd07', } );
    var saturnEllipse = new THREE.Line( geometry, material );

    //Uranus\\
    var uranusOrbit = new THREE.EllipseCurve(0,0,94,74,0,  2 * Math.PI,false,0);
    var uranusPoints = uranusOrbit.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( uranusPoints );
    var material = new THREE.MeshPhongMaterial( {color: '#00c472', } );
    var uranusEllipse = new THREE.Line(geometry,material);

    //Neptune\\
    var neptuneOrbit = new THREE.EllipseCurve(0,0,104,84,0,  2 * Math.PI,false,0);
    var neptunePoints = neptuneOrbit.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( neptunePoints );
    var material = new THREE.MeshPhongMaterial( {color: '#bc110f', } );
    var neptuneEllipse = new THREE.Line(geometry,material);

    //Pluto\\
    var plutoOrbit = new THREE.EllipseCurve(0,0,120,90,0,  2 * Math.PI,false,0);
    var plutoPoints = plutoOrbit.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints(plutoPoints);
    var material = new THREE.MeshPhongMaterial( {color: '#37b266', } );
    var plutoEllipse = new THREE.Line( geometry, material );

    sphereEllipse = new THREE.Object3D;
    planet = new THREE.Object3D;

    sphereEllipse.add(mercuryEllipse);
    sphereEllipse.add(venusEllipse);
    sphereEllipse.add(earthEllipse);
    sphereEllipse.add(marsEllipse);
    sphereEllipse.add(jupiterEllipse);
    sphereEllipse.add(saturnEllipse);
    sphereEllipse.add(uranusEllipse);
    sphereEllipse.add(neptuneEllipse);
    sphereEllipse.add(plutoEllipse);

    mercuryGroup.add(mercury);
    venusGroup.add(venus);
    earthGroup.add(earth);
    marsGroup.add(mars);
    jupiterGroup.add(jupiter);
    saturnGroup.add(ringsSaturn);
    saturnGroup.add(saturn);
    uranusGroup.add(uranus);
    uranusGroup.add(ringsUranus);
    neptuneGroup.add(neptune);
    plutoGroup.add(pluto);


    planet.add(mercuryGroup);
    planet.add(venusGroup);
    planet.add(earthGroup);
    planet.add(marsGroup);
    planet.add(jupiterGroup);
    planet.add(saturnGroup);
    planet.add(uranusGroup);
    planet.add(neptuneGroup);
    planet.add(plutoGroup);

    system.add(sphereEllipse);
    system.add(planet);

    //Asteroids\\
    asteroidBelt = new THREE.Object3D();
    planet.add(asteroidBelt);
    for(var x=0; x<1000; x++) {
      neptuneMovement += 0.0004;
      var asteroidSize = getRandom(0.005, 0.5),
      asteroidShape1 = getRandom(4, 10),
      asteroidShape2 = getRandom(4, 10),
      asteroidPositionY = getRandom(-2.7, 2.7);
      var asteroid = new THREE.Mesh( new THREE.SphereGeometry(asteroidSize, asteroidShape1, asteroidShape2),   new THREE.MeshStandardMaterial({color:0xffffff,flatShading: THREE.FlatShading,roughness:9,metalness: 1}));
      asteroid.position.z = asteroidPositionY;
      var radians = getRandom(0, 360) * Math.PI / 2;
      asteroid.position.x = Math.cos(radians) * 50;
      asteroid.position.y = Math.sin(radians) * 48;
      asteroidBelt.add(asteroid);
    }
    scene.add( system );
  }

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }


  function animate()
  {
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    var movement = now * 0.001;

    mercuryMovement += 0.008;
    venusMovement += 0.003;
    earthMovement += 0.006;
    marsMovement += 0.001;
    jupiterMovement += 0.001;
    saturnMovement += 0.001;
    uranusMovement += 0.0008;
    neptuneMovement += 0.0003;
    plutoMovement += 0.0002;

    sun.rotation.y += angle / 2;
    mercury.rotation.y += angle;
    venus.rotation.y += angle;
    earthGroup.rotation.z += angle;
    mars.rotation.y += angle;
    jupiterGroup.rotation.z += angle;
    saturnGroup.rotation.z += angle;
    uranusGroup.rotation.z += angle;
    neptuneGroup.rotation.z += angle;
    plutoGroup.rotation.z -= angle;

    asteroidBelt.rotation.z += angle/39;

    for (i = 0; i < 10; i++){
      jupiterMoons[i].rotation.z += angle;
    }
    for (i = 0; i < 10; i++){
      saturnMoons[i].rotation.z += angle;
    }
    for (i = 0; i < 10; i++){
      uranusMoons[i].rotation.z += angle;
    }
    for (i = 0; i < 10; i++){
      neptuneMoons[i].rotation.z += angle;
    }
    for (i = 0; i < 5; i++){
      plutoMoons[i].rotation.z += angle;
    }

    mercuryGroup.position.x = 25*Math.cos(mercuryMovement) + 0;
    mercuryGroup.position.y = 20*Math.sin(mercuryMovement) + 0;

    venusGroup.position.x = 32*Math.cos(venusMovement) + 0;
    venusGroup.position.y = 25*Math.sin(venusMovement) + 0;

    earthGroup.position.x = 38*Math.cos(earthMovement) + 0;
    earthGroup.position.y = 32*Math.sin(earthMovement) + 0;

    marsGroup.position.x = 45*Math.cos(marsMovement) + 0;
    marsGroup.position.y = 38*Math.sin(marsMovement) + 0;

    jupiterGroup.position.x = 59*Math.cos(jupiterMovement) + 0;
    jupiterGroup.position.y = 49*Math.sin(jupiterMovement) + 0;

    asteroidBelt.position.x = Math.cos(mercuryMovement);
    asteroidBelt.position.y = Math.sin(mercuryMovement);

    saturnGroup.position.x = 77*Math.cos(saturnMovement) + 0;
    saturnGroup.position.y = 62*Math.sin(saturnMovement) + 0;

    uranusGroup.position.x = 94*Math.cos(uranusMovement) + 0;
    uranusGroup.position.y = 74*Math.sin(uranusMovement) + 0;

    neptuneGroup.position.x = 104*Math.cos(neptuneMovement) + 0;
    neptuneGroup.position.y = 84*Math.sin(neptuneMovement) + 0;

    plutoGroup.position.x = 120*Math.cos(venusMovement) + 0;
    plutoGroup.position.y = 90*Math.sin(venusMovement) + 0;
  }
  function run() {
    requestAnimationFrame(function() { run(); });
    // Render the scene
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene , backgroundCamera );
    renderer.render( scene, camera );
    animate();
    orbitControls.update();
  }
