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
