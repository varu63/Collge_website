
// --- Three.js Background Script ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.PointsMaterial({ color: 0x60a5fa, size: 0.05 });
const particles = new THREE.Points(geometry, material);
scene.add(particles);
camera.position.z = 40;

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// --- Page Interaction Script ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    const hamburgerIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-4 6h-12"></path></svg>`;
    const closeIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            menuToggle.setAttribute('aria-expanded', !isHidden);
            if (isHidden) {
                menuToggle.innerHTML = hamburgerIcon;
            } else {
                menuToggle.innerHTML = closeIcon;
            }
        });

        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = hamburgerIcon;
            });
        });
    }

    // --- Form Submission Alert ---
    const registrationForm = document.querySelector('form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            // --- Custom Modal ---
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';

            // Create modal box
            const modalBox = document.createElement('div');
            modalBox.className = 'bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center';

            // Modal title
            const modalTitle = document.createElement('h3');
            modalTitle.className = 'text-2xl font-bold text-green-600 mb-4';
            modalTitle.textContent = 'Registration Successful!';

            // Modal message
            const modalMessage = document.createElement('p');
            modalMessage.className = 'text-gray-700 mb-6';
            modalMessage.textContent = 'Thank you for registering for TechFest 2025. We have received your details and will send a confirmation email shortly.';

            // Modal button
            const closeButton = document.createElement('button');
            closeButton.className = 'bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition';
            closeButton.textContent = 'Close';

            // Add elements
            modalBox.appendChild(modalTitle);
            modalBox.appendChild(modalMessage);
            modalBox.appendChild(closeButton);
            overlay.appendChild(modalBox);
            document.body.appendChild(overlay);

            // Close button functionality
            closeButton.addEventListener('click', () => {
                document.body.removeChild(overlay);
                registrationForm.reset(); // Reset the form fields
            });
        });
    }

});

