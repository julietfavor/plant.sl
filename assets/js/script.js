/* ============================================
   PLANT NETWORK SIERRA LEONE - JAVASCRIPT
   ============================================ */

// Mobile Menu Toggle
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!event.target.closest('header')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }
}

// Form Submission Handler
function initFormSubmission() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Validate required fields
      if (!data.name || !data.email || !data.message) {
        showAlert('Please fill out all required fields', 'warning');
        return;
      }

      // Email validation
      if (!isValidEmail(data.email)) {
        showAlert('Please enter a valid email address', 'warning');
        return;
      }

      // Simulate form submission (in real implementation, send to backend)
      const formType = this.getAttribute('data-form-type');

      if (formType === 'contact') {
        handleContactForm(data);
      } else if (formType === 'volunteer') {
        handleVolunteerForm(data);
      } else if (formType === 'prayer') {
        handlePrayerForm(data);
      } else if (formType === 'partner') {
        handlePartnerForm(data);
      }
    });
  });
}

// Handle Contact Form
function handleContactForm(data) {
  // Create mailto link
  const subject = `Contact from ${data.name}`;
  const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nMessage: ${data.message}`;
  const mailtoLink = `mailto:info@plantnetworksl.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Also show WhatsApp option
  const whatsappNumber = '232XXXXXXXX'; // Replace with actual number
  const whatsappMessage = `Hello! I'm ${data.name}. ${data.message}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  showAlert(`Message ready to send! You can:<br>1. <a href="${mailtoLink}">Send via Email</a><br>2. <a href="${whatsappLink}" target="_blank">Send via WhatsApp</a>`, 'success');

  // Reset form
  document.querySelector('form').reset();
}

// Handle Volunteer Form
function handleVolunteerForm(data) {
  const message = `Volunteer Application:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nSkills: ${data.skills}\nAvailability: ${data.availability}`;
  const mailtoLink = `mailto:info@plantnetworksl.org?subject=Volunteer Application from ${data.name}&body=${encodeURIComponent(message)}`;

  showAlert(`Thank you for your interest! We'll contact you soon at ${data.email}`, 'success');
  window.location.href = mailtoLink;
}

// Handle Prayer Request
function handlePrayerForm(data) {
  const message = `Prayer Request:\nName: ${data.name}\nEmail: ${data.email}\nRequest: ${data.prayer_request}`;
  const mailtoLink = `mailto:info@plantnetworksl.org?subject=Prayer Request from ${data.name}&body=${encodeURIComponent(message)}`;

  showAlert('Thank you for sharing your prayer request. We will pray for you!', 'success');
  window.location.href = mailtoLink;
}

// Handle Partner Form
function handlePartnerForm(data) {
  const message = `Partnership Inquiry:\nOrganization: ${data.organization}\nContact: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nInterest: ${data.interest}`;
  const mailtoLink = `mailto:info@plantnetworksl.org?subject=Partnership from ${data.organization}&body=${encodeURIComponent(message)}`;

  showAlert('We are excited about potential partnership! Check your email for next steps.', 'success');
  window.location.href = mailtoLink;
}

// Email Validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Alert System
function showAlert(message, type = 'info') {
  const alertContainer = document.querySelector('.alert-container') || createAlertContainer();
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `${message}<button class="alert-close" onclick="this.parentElement.remove();">&times;</button>`;

  alertContainer.appendChild(alert);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alert.parentElement) {
      alert.remove();
    }
  }, 5000);
}

function createAlertContainer() {
  const container = document.createElement('div');
  container.className = 'alert-container';
  container.style.cssText = `
    position: fixed;
    top: 80px;
    right: 1rem;
    z-index: 1000;
    max-width: 400px;
    left: 1rem;
  `;
  document.body.appendChild(container);
  return container;
}

// Gallery Modal
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const emoji = this.textContent.trim();
      showGalleryModal(emoji);
    });
  });
}

function showGalleryModal(emoji) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close" onclick="this.closest('.modal').remove()">&times;</span>
      <div style="text-align: center; font-size: 6rem;">
        ${emoji}
      </div>
    </div>
  `;

  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  const modalContent = modal.querySelector('.modal-content');
  modalContent.style.cssText = `
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    position: relative;
    max-width: 500px;
    width: 90%;
  `;

  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.style.cssText = `
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
  `;

  document.body.appendChild(modal);

  // Close modal on background click
  modal.addEventListener('click', function (e) {
    if (e.target === this) {
      this.remove();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      modal.remove();
    }
  });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Active Navigation Highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Modal styling added to document
function addModalStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    .alert-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .alert-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 15px;
      color: inherit;
    }

    nav a.active {
      color: var(--secondary-color);
      border-bottom: 3px solid var(--secondary-color);
    }
  `;
  document.head.appendChild(style);
}

// Lazy Loading Images
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initFormSubmission();
  initGallery();
  initSmoothScroll();
  updateActiveNav();
  addModalStyles();
  initLazyLoading();
});

// Add loading indicator for forms
document.addEventListener('submit', function (e) {
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Sending...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send';
    }, 2000);
  }
});
