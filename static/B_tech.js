<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

let scene, camera, renderer, mesh;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('bg-canvas'),
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 128, 16);
    const material = new THREE.MeshNormalMaterial({ wireframe: true, opacity: 0.3, transparent: true });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 6;
    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.003;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
