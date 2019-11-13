function init() {

    let stats = initStats();
    
    // 全ての要素を保持するシーンを作成
    let scene = new THREE.Scene();
    // カメラの作成
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // レンダーの設定
    let renderer = new THREE.WebGLRenderer();

    // renderer.setClearColorHex();
    // 背景色を真っ白に
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    // シーンのサイズ指定
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 影の設定
    renderer.shadowMap.enabled = true;

    // 画面に(x, y, z)軸を表示
    let axes = new THREE.AxisHelper(20);
    scene.add(axes);

    // 平面を定義
    let planeGeometry = new THREE.PlaneGeometry(60, 20);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // 平面のポジション
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    // 立方体を定義
    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // 立方体のポジション
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);

    // 球体を定義
    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;

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

    // 自身の位置からライトを照らす
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // シーンをHTMLにレンダリング
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    renderScene();

    function renderScene() {
        stats.update();
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

}

// FPS計測アニメーション
function initStats() {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("Stats-output").appendChild(stats.domElement);
    return stats;
}

window.onload = init;