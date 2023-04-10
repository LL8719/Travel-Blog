const commentButtonHandler = async (event) => {
  event.preventDefault();

const comment_text = document.querySelector('#post-comment').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const post_id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      //Stringify:  Turns the params passed 'comment_text, post_id' into JSON
      // this will be referred to in route as ...req.body
      // and will be equivalent to adding the following in the sql request
      // comment_text: value
      // post_id: value
      // where value is the value of the variable in this method
      body: JSON.stringify({ comment_text, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/allposts/'+post_id);
    } else {
      alert('Failed to add comment');
    }
  }
};

document
  .querySelector('.post-list')
  .addEventListener('submit', commentButtonHandler);
