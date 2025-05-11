document.addEventListener('DOMContentLoaded', () => {
    
    const portfolioForm = document.getElementById('portfolioForm');
    const previewContent = document.getElementById('previewContent');
    const savePortfolioBtn = document.getElementById('savePortfolio');
    const downloadPortfolioBtn = document.getElementById('downloadPortfolio');
    const clearFormBtn = document.getElementById('clearForm');
    const profilePicInput = document.getElementById('profilePic');

    let profilePicUrl = '';
    let slideIndex = 0;

    // Get template from URL
    const urlParams = new URLSearchParams(window.location.search);
    let template = urlParams.get('template') || 'student';
    template = template.toLowerCase();

    // Template-specific images
    const templateImages = {
        student: {
            title: 'https://marketplace.canva.com/EAFxweoG8ww/1/0/1131w/canva-black-and-white-simple-geometric-content-creator-student-portfolio-0b0X0X0X0X0.jpg',
            intro: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            about: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            education: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            skills: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            project: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            achievements: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            experience: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            goals: 'https://images.unsplash.com/photo-1448932223590-d1fc686e76ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            interests: 'https://images.unsplash.com/photo-1519125323398-675f1f1d1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            contact: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            share: 'https://images.unsplash.com/photo-1519125323398-675f1f1d1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
        },
        chef: {
            title: 'https://marketplace.canva.com/EAFxweoG8ww/1/0/1131w/canva-black-and-white-simple-geometric-content-creator-student-portfolio-0b0X0X0X0X0.jpg',
            intro: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            about: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            education: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            skills: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            project: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            achievements: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            experience: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            goals: 'https://images.unsplash.com/photo-1448932223590-d1fc686e76ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            interests: 'https://images.unsplash.com/photo-1519125323398-675f1f1d1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            contact: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            share: 'https://images.unsplash.com/photo-1519125323398-675f1f1d1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
        },
        professor: {
            title: 'https://marketplace.canva.com/EAFxweoG8ww/1/0/1131w/canva-black-and-white-simple-geometric-content-creator-student-portfolio-0b0X0X0X0X0.jpg',
            intro: 'https://images.unsplash.com/photo-1503676260728-1b7e0e2b9c2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            about: 'https://images.unsplash.com/photo-1503676260728-1b7e0e2b9c2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            education: 'https://images.unsplash.com/photo-1564981797816-1aa0a6bf12b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            skills: 'https://images.unsplash.com/photo-1516321318423-9b5a0b5a0b5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            project: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            achievements: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            experience: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            goals: 'https://images.unsplash.com/photo-1448932223590-d1fc686e76ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            interests: 'https://images.unsplash.com/photo-1519125323398-675f1f1d1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            contact: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
            share: 'https://images.unsplash.com/photo-1519125323398-675f1f1d1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
        }
    };

    const updatePreview = () => {
        const name = document.getElementById('name').value || 'Jane Doe';
        const title = document.getElementById('title').value || 'Graphic Designer';
        const intro = document.getElementById('intro').value || 'Welcome to my portfolio! I’m a dedicated professional...';
        const bio = document.getElementById('bio').value || 'I am a passionate designer with a keen eye for detail...';
        const education = document.getElementById('education').value || 'Bachelor of Fine Arts, University of Art, 2015-2019';
        const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim()).filter(skill => skill) || ['Adobe Photoshop', 'Adobe Illustrator', 'Typography'];
        const project = document.getElementById('project').value || 'Designed branding for local businesses...';
        const achievements = document.getElementById('achievements').value || 'Won Design Award 2022...';
        const experience = document.getElementById('experience').value || 'Graphic Designer at Creative Agency, 2019-2023';
        const goals = document.getElementById('goals').value || 'Aspire to become a creative director...';
        const interests = document.getElementById('interests').value || 'Photography, hiking, and exploring new technologies...';
        const contact = document.getElementById('contact').value || 'Email: jane.doe@example.com';
        const share = document.getElementById('share').value || 'I love contributing to open-source projects...';

        const images = templateImages[template] || templateImages.student;
        const templateTitle = template.charAt(0).toUpperCase() + template.slice(1) + ' Portfolio';

        previewContent.innerHTML = `
            <div class="template-preview ${template}-template">
                <div class="slides">
                    <div class="page title-page">
                        <div class="intro-background">
                            <img src="${images.title}" class="intro-bg-image" alt="Title Background">
                            <div class="geometric-shapes">
                                <div class="circle-top-left"></div>
                                <div class="circle-bottom-right"></div>
                            </div>
                            <div class="intro-content">
                                ${profilePicUrl ? `<img src="${profilePicUrl}" class="profile-pic" alt="Profile Picture">` : ''}
                                <h3>${templateTitle.toUpperCase()}</h3>
                                <p>${name} - ${title}</p>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.intro}" class="page-image" alt="Intro Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>Intro</h5>
                                <p>${intro}</p>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.about}" class="page-image" alt="About Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>About Me</h5>
                                <p>${bio}</p>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.education}" class="page-image" alt="Education Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>Education</h5>
                                <p>${education}</p>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.skills}" class="page-image" alt="Skills Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>Skills</h5>
                                <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.project}" class="page-image" alt="Project Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>Project</h5>
                                <p>${project}</p>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.achievements}" class="page-image" alt="Achievements Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>Achievements/Certifications</h5>
                                <p>${achievements}</p>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.experience}" class="page-image" alt="Experience Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>Internships/Experience</h5>
                                <p>${experience}</p>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.goals}" class="page-image" alt="Goals Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>Goals</h5>
                                <p>${goals}</p>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.interests}" class="page-image" alt="Interests Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>Interests</h5>
                                <p>${interests}</p>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.contact}" class="page-image" alt="Contact Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>Contact Information</h5>
                                <p>${contact}</p>
                            </div>
                        </div>
                    </div>
                    <div class="page">
                        <img src="${images.share}" class="page-image" alt="Share Image">
                        <div class="content-sections">
                            <div class="section">
                                <h5>Anything I'd Like to Share</h5>
                                <p>${share}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="prev-arrow" onclick="changePortfolioSlide(-1)">❮</button>
                <button class="next-arrow" onclick="changePortfolioSlide(1)">❯</button>
            </div>
        `;

        const slides = previewContent.querySelector('.slides');
        if (slides) {
            slides.style.width = `${slides.children.length * 100}%`;
            slides.style.transition = 'transform 0.5s ease-in-out';
            const pages = slides.querySelectorAll('.page');
            pages.forEach(page => page.style.minWidth = '100%');
            slides.style.transform = 'translateX(0%)';
            pages[0].classList.add('active');
        }
    };

    window.changePortfolioSlide = function(direction) {
        const slides = previewContent.querySelector('.slides');
        if (!slides) return;
        const pages = slides.querySelectorAll('.page');
        if (pages.length === 0) return;

        pages[slideIndex].classList.remove('active');
        slideIndex += direction;

        if (slideIndex >= pages.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = pages.length - 1;

        pages[slideIndex].classList.add('active');
        const offset = -slideIndex * 100;
        slides.style.transform = `translateX(${offset}%)`;
    };

    profilePicInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds 5MB. Please upload a smaller image.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                profilePicUrl = event.target.result;
                updatePreview();
            };
            reader.readAsDataURL(file);
        }
    });

    portfolioForm.addEventListener('input', updatePreview);

    savePortfolioBtn.addEventListener('click', () => {
        const portfolioData = {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
            intro: document.getElementById('intro').value,
            bio: document.getElementById('bio').value,
            education: document.getElementById('education').value,
            skills: document.getElementById('skills').value,
            project: document.getElementById('project').value,
            achievements: document.getElementById('achievements').value,
            experience: document.getElementById('experience').value,
            goals: document.getElementById('goals').value,
            interests: document.getElementById('interests').value,
            contact: document.getElementById('contact').value,
            share: document.getElementById('share').value,
            profilePic: profilePicUrl
        };
        localStorage.setItem('portfolio', JSON.stringify(portfolioData));
        alert('Portfolio saved successfully!');
    });

    downloadPortfolioBtn.addEventListener('click', () => {
        const requiredFields = ['name', 'title', 'intro', 'bio', 'education', 'skills', 'project', 'achievements', 'experience', 'goals', 'interests', 'contact', 'share'];
        const isComplete = requiredFields.every(id => document.getElementById(id).value.trim());
        if (!isComplete) {
            alert('Please fill out all required fields before downloading.');
            return;
        }

        const element = document.getElementById('previewContent');
        const opt = {
            margin: 0.5,
            filename: 'portfolio.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    });

    clearFormBtn.addEventListener('click', () => {
        portfolioForm.reset();
        profilePicUrl = '';
        slideIndex = 0;
        updatePreview();
    });

    updatePreview();
});