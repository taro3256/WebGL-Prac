function init() {
    
    // 全ての要素を保持するシーンを作成
    let scene = new THREE.Scene();
    // カメラの作成
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // レンダーの設定
    let renderer = new THREE.WebGLRenderer();

    // renderer.setClearColorHex();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 画面に(x, y, z)軸を表示
    let axes = new THREE.AxisHelper(20);
    scene.add(axes);

    // 平面を定義
    let planeGeometry = new THREE.PlaneGeometry(60, 20);
    let planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // 平面のポジション
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    // 立方体を定義
    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // 立方体のポジション
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);

    // 球体を定義
    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // 球体のポジション
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    scene.add(sphere);

    // カメラのポジション
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    // lookAt()でシーンの中心を向く
    camera.lookAt(scene.position);

    // シーンをHTMLにレンダリング
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    renderer.render(scene, camera);

};
window.onload = init;