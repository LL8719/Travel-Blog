const newPostHandler = async (event) => {
  event.preventDefault();

  const newPost = document.querySelector('.create-button');
  const postForm = document.getElementById('new-post-form');
  
  if(newPost.innerText == "NEW POST"){
    postForm.style.display = "block";
    newPost.innerText = "CANCEL";
  }
  else{
    postForm.style.display = "none";
    newPost.innerText = "NEW POST";
  }
}

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const location = document.querySelector('#byLocation').value.trim();
    const petFriendly = document.querySelector('#petFriendly').checked;
    const familyFriendly = document.querySelector('#familyFriendly').checked;
    const image = document.querySelector('#image').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content, location, petFriendly, familyFriendly, image }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  document
  .querySelector('.create-button')
  .addEventListener('click', newPostHandler);

  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  