<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>


let scene, camera, renderer, mesh;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('bg-canvas'),
        alpha: true // Make canvas transparent
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Use a simple Icosahedron for the BCA page for a slight variation
    const geometry = new THREE.IcosahedronGeometry(2, 0);

    // CHANGE: Use a LineBasicMaterial or adjusted MeshBasicMaterial for a brighter look
    const material = new THREE.LineBasicMaterial({
        color: 0x3b82f6, // Use a bright blue accent color (blue-500)
        linewidth: 2, // Line width is often ignored by WebGL, but good practice
        transparent: true,
        opacity: 0.5
    });

    // Use LineSegments to render the wireframe geometry
    const wireframe = new THREE.WireframeGeometry(geometry);
    mesh = new THREE.LineSegments(wireframe, material);
    scene.add(mesh);

    camera.position.z = 6;
    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.002;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();