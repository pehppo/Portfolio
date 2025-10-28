(function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.classList.contains('project-item')) {
                return;
            }
            
            e.preventDefault();
            
            const isInProjectDetails = document.querySelector('.project-details.show');
            if (isInProjectDetails) {
                closeProjectDetails(() => {
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            } else {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            this.blur();
        });
    });

    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            showProjectDetails(projectId);
        });
    });

    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('.form-submit');
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    successMessage.style.display = 'block';
                    this.reset();
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Erro no envio');
                }
            } catch (error) {
                alert('Erro ao enviar mensagem. Tente novamente.');
            }
            
            submitButton.textContent = 'Enviar Mensagem';
            submitButton.disabled = false;
        });
    }
})();

function showProjectDetails(projectId) {
    document.querySelectorAll('main > section:not(.project-details)').forEach(section => {
        section.classList.add('section-hidden');
    });
    
    setTimeout(() => {
        document.querySelectorAll('main > section:not(.project-details)').forEach(section => {
            section.style.display = 'none';
        });
        
        const projectSection = document.getElementById(projectId);
        if (projectSection) {
            projectSection.style.display = 'block';
            projectSection.classList.add('active');
            projectSection.offsetHeight;
            projectSection.classList.add('show');
            
            setTimeout(() => {
                if (window.pageYOffset > 100) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 700);
        }
    }, 300);
}

function closeProjectDetails(callback) {
    document.querySelectorAll('.project-details.show').forEach(section => {
        section.classList.remove('show');
    });
    
    setTimeout(() => {
        document.querySelectorAll('.project-details').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });
        
        document.querySelectorAll('main > section:not(.project-details)').forEach(section => {
            section.style.display = 'block';
        });
        
        document.body.offsetHeight;
        
        document.querySelectorAll('main > section:not(.project-details)').forEach(section => {
            section.classList.remove('section-hidden');
        });
        
        setTimeout(() => {
            document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' });
            
            if (callback && typeof callback === 'function') {
                setTimeout(callback, 300);
            }
        }, 150);
    }, 600);
}

function goBackToProjects() {
    closeProjectDetails();
}

let currentImageIndex = 0;
const images = document.querySelectorAll('.gallery-image');
const thumbnails = document.querySelectorAll('.thumbnail');

function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    if (images[index]) {
        images[index].classList.add('active');
        thumbnails[index].classList.add('active');
        currentImageIndex = index;
    }
}

function changeImage(direction) {
    const newIndex = currentImageIndex + direction;
    
    if (newIndex >= 0 && newIndex < images.length) {
        showImage(newIndex);
    } else if (newIndex < 0) {
        showImage(images.length - 1);
    } else {
        showImage(0);
    }
}
