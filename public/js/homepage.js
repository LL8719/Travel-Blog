const commentButtonHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#post-comment').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to add comment');
    }
  }
};

document
  .querySelector('.post-list')
  .addEventListener('submit', commentButtonHandler);

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
