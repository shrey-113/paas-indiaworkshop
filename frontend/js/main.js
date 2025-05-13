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
    
    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
    
    // Button Ripple Effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (nameInput.value.trim() === '') {
                isValid = false;
                highlightError(nameInput);
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                isValid = false;
                highlightError(emailInput);
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                highlightError(messageInput);
            } else {
                removeError(messageInput);
            }
            
            if (!isValid) {
                showFormError('Please fill in all required fields correctly.');
                return;
            }
            
            // Collect form data
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: document.getElementById('phone').value,
                inquiry: document.getElementById('inquiry').value,
                message: messageInput.value
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
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
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                if (data.success) {
                    showFormSuccess('Thank you for your message. We will get back to you soon!');
                    contactForm.reset();
                } else {
                    showFormError('Something went wrong. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                showFormError('Something went wrong. Please try again later.');
            });
        });
    }
    
    // Form validation helpers
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function highlightError(input) {
        input.classList.add('error');
        input.parentElement.classList.add('error-container');
    }
    
    function removeError(input) {
        input.classList.remove('error');
        input.parentElement.classList.remove('error-container');
    }
    
    function showFormError(message) {
        const errorContainer = document.querySelector('.form-error');
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.style.display = 'block';
            
            setTimeout(() => {
                errorContainer.style.display = 'none';
            }, 5000);
        } else {
            const newErrorContainer = document.createElement('div');
            newErrorContainer.className = 'form-error';
            newErrorContainer.textContent = message;
            contactForm.insertBefore(newErrorContainer, contactForm.firstChild);
            
            setTimeout(() => {
                newErrorContainer.style.display = 'none';
            }, 5000);
        }
    }
    
    function showFormSuccess(message) {
        const successContainer = document.querySelector('.form-success');
        if (successContainer) {
            successContainer.textContent = message;
            successContainer.style.display = 'block';
            
            setTimeout(() => {
                successContainer.style.display = 'none';
            }, 5000);
        } else {
            const newSuccessContainer = document.createElement('div');
            newSuccessContainer.className = 'form-success';
            newSuccessContainer.textContent = message;
            contactForm.insertBefore(newSuccessContainer, contactForm.firstChild);
            
            setTimeout(() => {
                newSuccessContainer.style.display = 'none';
            }, 5000);
        }
    }
    
    // Feature hover effects
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        feature.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
});