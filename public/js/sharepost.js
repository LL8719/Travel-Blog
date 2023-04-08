const sharePostForms = document.querySelectorAll('.existing-post-form');
sharePostForms.forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/share-post', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      alert('Post shared via email');
    } else {
      alert('Error sharing post via email');
    }
  });
});
