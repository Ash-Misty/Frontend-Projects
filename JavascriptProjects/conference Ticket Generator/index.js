 document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const photoInput = document.getElementById('photo');
    const previewArea = document.getElementById('preview-area');
    const uploadContent = document.getElementById('upload-content');

    photoInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        previewArea.innerHTML = `
          <div class="preview-container">
            <img src="${url}" class="preview-image" />
            <div class="change-image" onclick="document.getElementById('photo').click()">Change Image</div>
          </div>
          <button type="button" class="remove-btn" id="remove-image">Remove</button>
        `;
        uploadContent.style.display = 'none';
        document.getElementById('remove-image').addEventListener('click', function () {
          photoInput.value = '';
          previewArea.innerHTML = '';
          uploadContent.style.display = 'flex';
        });
      }
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const github = document.getElementById('github').value;
        const file = photoInput.files[0];

        document.querySelector('h1').innerHTML = `Congrats, <span style="color:#ff6;">${name}</span>!<br/> Your ticket is ready.`;
        document.querySelector('.form').classList.add('invisible');
        document.querySelector('.tit2').innerHTML = `We have emailed your ticket to <br/> ${email} and will send updates.`;
        document.querySelector('.name').textContent = name;
        document.querySelector('.github').textContent = `@${github}`;
        document.querySelector('.ticket-container').classList.remove('invisible');
        document.querySelector('.ticket').classList.remove('invisible');

        if (file) {
          const photoURL = URL.createObjectURL(file);
          document.getElementById('user-photo').src = photoURL;
        }
      });
    }
  });