// Script principal para el portafolio de Laura Valentina Castañeda
// Funcionalidad del formulario de contacto y efectos interactivos

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // FUNCIONALIDAD DEL FORMULARIO DE CONTACTO
    // ============================================
    
    // Obtener referencia al formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    // Función para manejar el envío del formulario
    function handleFormSubmit(event) {
        // Prevenir el comportamiento por defecto del formulario
        event.preventDefault();
        
        // Obtener los datos del formulario
        const formData = new FormData(contactForm);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const mensaje = formData.get('mensaje');
        
        // Validar que el mensaje no esté vacío
        if (!mensaje.trim()) {
            alert('Por favor, escribe un mensaje antes de enviar.');
            return;
        }
        
        // Simular envío del formulario
        console.log('=== FORMULARIO ENVIADO CORRECTAMENTE ===');
        console.log('Nombre:', nombre);
        console.log('Email:', email);
        console.log('Mensaje:', mensaje);
        console.log('Fecha de envío:', new Date().toLocaleString());
        console.log('==========================================');
        
        // Mostrar mensaje de confirmación al usuario
        showSuccessMessage();
        
        // Limpiar el formulario
        contactForm.reset();
        
        // Restaurar los valores por defecto
        document.getElementById('nombre').value = 'Laura Valentina Castañeda';
        document.getElementById('email').value = 'lauravalentina@gmail.com';
    }
    
    // Función para mostrar mensaje de éxito
    function showSuccessMessage() {
        // Crear elemento de mensaje
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #8EB0C2;
                color: white;
                padding: 20px 30px;
                border-radius: 10px;
                box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                font-family: 'Poppins', sans-serif;
                font-weight: 500;
                text-align: center;
                animation: fadeInScale 0.3s ease-out;
            ">
                <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">¡Mensaje Enviado!</h3>
                <p style="margin: 0; font-size: 0.9rem;">Gracias por contactarme. Te responderé pronto.</p>
            </div>
        `;
        
        // Agregar estilos de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Agregar el mensaje al DOM
        document.body.appendChild(successMessage);
        
        // Remover el mensaje después de 3 segundos
        setTimeout(() => {
            successMessage.remove();
            style.remove();
        }, 3000);
    }
    
    // Agregar event listener al formulario
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // ============================================
    // NAVEGACIÓN SUAVE
    // ============================================
    
    // Obtener todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el ID de la sección objetivo
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcular la posición considerando la altura de la navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Scroll suave hacia la sección
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // EFECTOS DE SCROLL
    // ============================================
    
    // Función para agregar efecto de aparición en scroll
    function addScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observar elementos que deben aparecer
        const elementsToAnimate = document.querySelectorAll('.experience-card, .project-card');
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }
    
    // Inicializar efectos de scroll
    addScrollEffects();
    
    // ============================================
    // NAVBAR RESPONSIVE
    // ============================================
    
    // Función para manejar el scroll de la navbar
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = '#FFFFFF';
                navbar.style.backdropFilter = 'none';
            }
        });
    }
    
    // Inicializar efectos de navbar
    handleNavbarScroll();
    
    // ============================================
    // EFECTOS HOVER MEJORADOS
    // ============================================
    
    // Agregar efectos hover a las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================================
    // VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
    // ============================================
    
    // Obtener el campo de mensaje
    const mensajeField = document.getElementById('mensaje');
    
    // Función para validar el mensaje en tiempo real
    function validateMessage() {
        const mensaje = mensajeField.value.trim();
        const minLength = 10;
        
        if (mensaje.length > 0 && mensaje.length < minLength) {
            mensajeField.style.borderColor = '#f39c12';
            mensajeField.title = `Mensaje muy corto. Mínimo ${minLength} caracteres.`;
        } else if (mensaje.length >= minLength) {
            mensajeField.style.borderColor = '#27ae60';
            mensajeField.title = 'Mensaje válido';
        } else {
            mensajeField.style.borderColor = '#8EB0C2';
            mensajeField.title = '';
        }
    }
    
    // Agregar event listener para validación en tiempo real
    mensajeField.addEventListener('input', validateMessage);
    
    // ============================================
    // FUNCIONES DE UTILIDAD
    // ============================================
    
    // Función para mostrar información de depuración
    function showDebugInfo() {
        console.log('=== INFORMACIÓN DE DEPURACIÓN ===');
        console.log('Formulario encontrado:', !!contactForm);
        console.log('Enlaces de navegación encontrados:', navLinks.length);
        console.log('Tarjetas de proyecto encontradas:', projectCards.length);
        console.log('Fecha de carga:', new Date().toLocaleString());
        console.log('================================');
    }
    
    // Mostrar información de depuración (solo en desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        showDebugInfo();
    }
    
    // ============================================
    // MENSAJE DE BIENVENIDA
    // ============================================
    
    // Mostrar mensaje de bienvenida en consola
    console.log('%c¡Bienvenido al portafolio de Laura Valentina Castañeda!', 
                'color: #8EB0C2; font-size: 16px; font-weight: bold;');
    console.log('%cPsicóloga especializada en acompañamiento clínico y hospitalario', 
                'color: #6A8B9A; font-size: 14px;');
    
});

// ============================================
// FUNCIONES GLOBALES (fuera del DOMContentLoaded)
// ============================================

// Función para copiar email al portapapeles
function copyEmail() {
    const email = 'lauravalentina@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        console.log('Email copiado al portapapeles:', email);
    }).catch(err => {
        console.error('Error al copiar email:', err);
    });
}

// Función para abrir enlaces externos de forma segura
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Función para mostrar información del proyecto
function showProjectInfo(projectTitle) {
    console.log(`Información del proyecto: ${projectTitle}`);
    console.log('Este es un proyecto ficticio para demostración del portafolio.');
}
