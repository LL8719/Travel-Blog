const displayUpdateHandler = async (event) => {
    event.preventDefault();
  
    const oldPost = document.getElementById('old-post-form');
    
    oldPost.style.display = "block";
  }

const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const title = document.querySelector('#post-title').value.trim();
        const location = document.querySelector('#byLocation').value.trim();
        const petFriendly = document.querySelector('#petFriendly').checked;
        const familyFriendly = document.querySelector('#familyFriendly').checked;
        const content = document.querySelector('#post-content').value.trim();

        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, location, petFriendly, familyFriendly, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    }
};

const delButtonHandler = async (event) => {
    console.log(event.target);
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

document
.querySelector('.post-update')
.addEventListener('click', displayUpdateHandler);

document
    .querySelector('.form-save')
    .addEventListener('click', updateButtonHandler);

document
    .querySelector('.post-delete')
    .addEventListener('click', delButtonHandler);

