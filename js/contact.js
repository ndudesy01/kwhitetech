// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            console.log('Contact form submitted:', data);

            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            contactForm.reset();
        });
    }
});