document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    const previewContent = document.getElementById('previewContent');
    const saveResumeBtn = document.getElementById('saveResume');
    const downloadResumeBtn = document.getElementById('downloadResume');
    const clearFormBtn = document.getElementById('clearForm');
    const profilePicUrlInput = document.getElementById('profilePicUrl');

    let profilePicUrl = '';

    const updatePreview = () => {
        const name = document.getElementById('name').value || 'Olivia Wilson';
        const title = document.getElementById('title').value || 'Graphic Designer';
        const phone = document.getElementById('phone').value || '+123-456-7890';
        const email = document.getElementById('email').value || 'hello@greatsite.com';
        profilePicUrl = document.getElementById('profilePicUrl').value || '';
        const profile = document.getElementById('profile').value || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        const education = document.getElementById('education').value || 'Bachelor of Design, University of Art, 2015-2019';
        const experience = document.getElementById('experience').value || 'Ginyard International Co., 2020-2023';
        const expertise = document.getElementById('expertise').value.split(',').map(item => item.trim()).filter(item => item) || ['Management Skills', 'Digital Marketing'];

        previewContent.innerHTML = `
            <div class="resume-preview">
                <div class="resume-header">
                    ${profilePicUrl ? `<img src="${profilePicUrl}" class="resume-profile-pic" alt="Profile Picture" onerror="this.style.display='none'">` : ''}
                    <h3>${name}</h3>
                    <h4>${title}</h4>
                    <div class="contact-info">
                        <p>Phone: ${phone}</p>
                        <p>Email: <a href="mailto:${email}">${email}</a></p>
                    </div>
                </div>
                <div class="resume-content">
                    <div class="section">
                        <h5>Profile</h5>
                        <p>${profile}</p>
                    </div>
                    <div class="section">
                        <h5>Education</h5>
                        <p>${education.replace(/\n/g, '<br>')}</p>
                    </div>
                    <div class="section">
                        <h5>Work Experience</h5>
                        <p>${experience.replace(/\n/g, '<br>')}</p>
                    </div>
                    <div class="section">
                        <h5>Expertise</h5>
                        <ul>${expertise.map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                </div>
            </div>
        `;
    };

    resumeForm.addEventListener('input', updatePreview);

    saveResumeBtn.addEventListener('click', () => {
        const resumeData = {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            profilePicUrl: profilePicUrl,
            profile: document.getElementById('profile').value,
            education: document.getElementById('education').value,
            experience: document.getElementById('experience').value,
            expertise: document.getElementById('expertise').value
        };
        localStorage.setItem('resume', JSON.stringify(resumeData));
        alert('Resume saved successfully!');
    });

    downloadResumeBtn.addEventListener('click', () => {
        const requiredFields = ['name', 'title', 'phone', 'email', 'profile', 'education', 'experience', 'expertise'];
        const isComplete = requiredFields.every(id => document.getElementById(id).value.trim());
        if (!isComplete) {
            alert('Please fill out all required fields before downloading.');
            return;
        }

        const element = document.getElementById('previewContent');
        const opt = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    });

    clearFormBtn.addEventListener('click', () => {
        resumeForm.reset();
        profilePicUrl = '';
        updatePreview();
    });

    updatePreview();
});