// Doctor Data & Filtering Logic
const doctorsData = [
    { name: "Dr. Sarah Johnson", specialty: "Cardiology", emoji: "<i class='fa-solid fa-user-doctor'></i>", category: "cardiology" },
    { name: "Dr. Michael Chen", specialty: "Neurology", emoji: "<i class='fa-solid fa-user-doctor'></i>", category: "neurology" },
    { name: "Dr. Emily Davis", specialty: "Pediatrics", emoji: "<i class='fa-solid fa-user-doctor'></i>", category: "pediatrics" },
    { name: "Dr. Robert Smith", specialty: "Cardiology", emoji: "<i class='fa-solid fa-user-doctor'></i>", category: "cardiology" },
    { name: "Dr. Lisa Wong", specialty: "Neurology", emoji: "<i class='fa-solid fa-user-doctor'></i>", category: "neurology" },
    { name: "Dr. James Wilson", specialty: "Pediatrics", emoji: "<i class='fa-solid fa-user-doctor'></i>", category: "pediatrics" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Existing Mobile Menu Logic
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '60px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#fff';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.05)';
            }
        });
    }

    // Existing Smooth Scrolling Logic
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === "#") return;
            
            const target = document.querySelector(targetId);
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu on click
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // New: Doctor Filtering Logic
    const doctorsGrid = document.getElementById('doctors-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Function to render doctors
    function renderDoctors(category = 'all') {
        if (!doctorsGrid) return;
        doctorsGrid.innerHTML = '';
        
        const filteredDoctors = category === 'all' 
            ? doctorsData 
            : doctorsData.filter(doc => doc.category === category);

        filteredDoctors.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'doctor-card';
            card.innerHTML = `
                <div class="doctor-img">${doc.emoji}</div>
                <div class="doctor-info">
                    <h3>${doc.name}</h3>
                    <span class="doctor-specialty">${doc.specialty}</span>
                    <a href="#contact" class="btn btn-outline" style="padding: 8px 16px; font-size: 0.9rem; margin-top: 10px;">Book Visit</a>
                </div>
            `;
            doctorsGrid.appendChild(card);
        });
    }

    // Initial render
    renderDoctors();

    // Filter button click events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
            
            // Render filtered
            const filterValue = btn.getAttribute('data-filter');
            renderDoctors(filterValue);
        });
    });

    // New: Booking Form Submission to MySQL
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const dept = document.getElementById('department').value;
            const date = document.getElementById('date').value;
            
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Processing...';
            btn.disabled = true;

            const payload = { name, email, department: dept, date };

            fetch('api/book_appointment.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                btn.innerText = originalText;
                btn.disabled = false;
                if (data.success) {
                    alert(`Success! Appointment requested for ${name} in the ${dept} department. We have saved it in our system.`);
                    bookingForm.reset();
                } else {
                    alert(`Error: ${data.error || 'Failed to book appointment'}`);
                }
            })
            .catch(() => {
                alert('Network error, failed to send booking request.');
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    }

    // New: Scroll Reveal Animation Logic
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});
