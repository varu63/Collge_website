
// --- Three.js Background Script ---
// This logic is unchanged and works well.
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

    // Icons for hamburger and close
    const hamburgerIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-4 6h-12"></path></svg>`;
    const closeIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'hidden' class on the mobile menu
            const isHidden = mobileMenu.classList.toggle('hidden');

            // Update ARIA attribute for accessibility
            menuToggle.setAttribute('aria-expanded', !isHidden);

            // Change the icon based on the menu state
            if (isHidden) {
                menuToggle.innerHTML = hamburgerIcon;
            } else {
                menuToggle.innerHTML = closeIcon;
            }
        });

        // --- Close mobile menu when a link is clicked ---
        // Get all links inside the mobile menu
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden'); // Hide the menu
                menuToggle.setAttribute('aria-expanded', 'false'); // Update ARIA
                menuToggle.innerHTML = hamburgerIcon; // Reset icon
            });
        });
    }

    // --- About Section Image Slider ---
    // FIX: Use efficient image URLs instead of large base64 strings
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80",
            alt: "Students working together in a modern tech lab"
        },
        {
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1471&q=80",
            alt: "A vibrant lecture hall full of students"
        },
        {
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1548&q=80",
            alt: "Professionals collaborating in an office environment"
        }
    ];

    const aboutImage = document.getElementById('aboutImage');

    if (aboutImage) {
        let currentSlide = 0;

        function changeSlide() {
            // Fade out the image
            aboutImage.style.opacity = 0;

            // Wait for the fade-out transition to finish
            setTimeout(() => {
                // Change the slide
                currentSlide = (currentSlide + 1) % slides.length;
                aboutImage.src = slides[currentSlide].image;
                aboutImage.alt = slides[currentSlide].alt;

                // Fade the image back in
                aboutImage.style.opacity = 1;
            }, 700); // This duration should match the CSS transition
        }

        // Set the initial image on load
        aboutImage.src = slides[0].image;
        aboutImage.alt = slides[0].alt;
        aboutImage.style.opacity = 1; // Make sure it's visible

        // Start the slider interval
        setInterval(changeSlide, 5000); // Change image every 5 seconds
    }

});

document.addEventListener("DOMContentLoaded", () => {
    const chatToggle = document.getElementById("chat-toggle");
    const chatWindow = document.getElementById("chat-window");
    const sendButton = document.getElementById("chat-send");
    const input = document.getElementById("chat-input");
    const messages = document.getElementById("chat-messages");

    // Toggle chat window open/close
    chatToggle.addEventListener("click", () => {
        chatWindow.classList.toggle("hidden");
    });

    // Add a message to the chat window
    function addMessage(text, sender) {
        const msg = document.createElement("div");
        msg.className =
            sender === "user"
                ? "text-right text-gray-800"
                : "text-left text-green-600";
        msg.innerHTML = `<p class="inline-block bg-gray-200 px-3 py-2 rounded-xl max-w-[75%]">${text}</p>`;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    }

    // Send message to Flask backend
    async function sendMessage() {
        const msg = input.value.trim();
        if (!msg) return;
        addMessage(msg, "user");
        input.value = "";

        try {
            const res = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg }),
            });
            const data = await res.json();
            addMessage(data.reply, "bot");
        } catch (error) {
            addMessage("Error: Unable to connect to server.", "bot");
        }
    }

    sendButton.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});



