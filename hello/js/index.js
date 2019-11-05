var gl; // WebGL コンテキスト用のグローバル変数


function start() {
  var canvas = document.getElementById("glcanvas");

  // GL コンテキストを初期化
  gl = initWebGL(canvas);
  initShaders();
  initBuffers();
  // drawScene();
  
  // WebGL を使用できる場合に限り、処理を継続
  
  if (gl) {
    // クリアカラーを黒色、不透明に設定する
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 深度テストを有効化
    gl.enable(gl.DEPTH_TEST);
    // 近くにある物体は、遠くにある物体を覆い隠す
    gl.depthFunc(gl.LEQUAL);
    // カラーバッファや深度バッファをクリアする
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // 線画解像度を変更
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
}

function initWebGL(canvas) {
  gl = null;
  
  try {
    // 標準コンテキストの取得を試みる。失敗した場合は、experimental にフォールバックする。
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  }
  catch(e) {}
  
  // GL コンテキストを取得できない場合は終了する
  if (!gl) {
    alert("WebGL を初期化できません。ブラウザはサポートしていないようです。");
    gl = null;
  }
  
  return gl;
}

function initShaders() {
  var fragmentShader = getShader(gl, "shader-fs");
  var vertexShader = getShader(gl, "shader-vs");
  
  // シェーダープログラムを作成
  
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  
  // シェーダープログラムを作成できない場合はアラートを表示
  
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("シェーダープログラムを初期化できません。");
  }
  
  gl.useProgram(shaderProgram);
  
  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);
}

function getShader(gl, id) {
  var shaderScript, theSource, currentChild, shader;
  
  shaderScript = document.getElementById(id);
  
  if (!shaderScript) {
    return null;
  }
  
  theSource = "";
  currentChild = shaderScript.firstChild;
  
  while(currentChild) {
    if (currentChild.nodeType == currentChild.TEXT_NODE) {
      theSource += currentChild.textContent;
    }
    
    currentChild = currentChild.nextSibling;
  }

  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
     // 未知のシェーダータイプ
     return null;
  }

  gl.shaderSource(shader, theSource);
    
  // シェーダープログラムをコンパイル
  gl.compileShader(shader);  
    
  // コンパイルが成功したかを確認
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
      alert("シェーダーのコンパイルでエラーが発生しました: " + gl.getShaderInfoLog(shader));  
      return null;  
  }
    
  return shader;
}

var horizAspect = 480.0/640.0;

function initBuffers() {
  squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  
  var vertices = [
    1.0,  1.0,  0.0,
    -1.0, 1.0,  0.0,
    1.0,  -1.0, 0.0,
    -1.0, -1.0, 0.0
  ];
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
  
  loadIdentity();
  mvTranslate([-0.0, 0.0, -6.0]);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}