// Main JavaScript file for CocoBot website

document.addEventListener('DOMContentLoaded', function() {
    // Handle loading animation
    const loaderContainer = document.querySelector('.loader-container');
    
    if (loaderContainer) {
        // Hide loader after content loads
        window.addEventListener('load', function() {
            setTimeout(function() {
                loaderContainer.classList.add('fade-out');
                // Remove loader from DOM after animation completes
                setTimeout(function() {
                    loaderContainer.style.display = 'none';
                }, 500);
            }, 2000); // Show animation for 2 seconds
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                inquiry: document.getElementById('inquiry').value,
                message: document.getElementById('message').value
            };
            
            // Send data to the server
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank you for your message. We will get back to you soon!');
                    contactForm.reset();
                } else {
                    alert('Something went wrong. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Something went wrong. Please try again later.');
            });
        });
    }
    
    // Mobile navigation toggle (placeholder for future implementation)
    // const mobileNavToggle = document.getElementById('mobileNavToggle');
    // if (mobileNavToggle) {
    //     mobileNavToggle.addEventListener('click', function() {
    //         // Toggle mobile navigation
    //     });
    // }
});