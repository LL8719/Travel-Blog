const likeButtonHandler = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('like-value')) {
        const post_id = event.target.getAttribute('data-id');
        const value = event.target.getAttribute('like-value');

        const response = await fetch(`/api/likes/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ value, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/homepage/');
        } else {
            alert('Failed to update like');
        }
    }
};

const filterInputHandler = async (event) => {
    event.preventDefault();
        
    const location = document.getElementById('byLocation').value.trim();
    const petFriendly = document.querySelector('#petFriendly').checked;
    const familyFriendly = document.querySelector('#familyFriendly').checked;

    let locationFilter = "";
    let petFilter = "";
    let familyFilter = "";

    if(location != ""){ locationFilter = `location=${location}&`; }
    if(petFriendly){ petFilter = "petFriendly=true&"; }
    if(familyFriendly){ familyFilter = "familyFriendly=true"; }

        const response = await fetch(`/homepage?${locationFilter}${petFilter}${familyFilter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/homepage?${locationFilter}${petFilter}${familyFilter}`);
        } else {
            alert('Failed to filter search');
        }
};

document
    .querySelectorAll('.likes-group').forEach(btn => {
        btn.addEventListener('click', likeButtonHandler);
    });

document
    .querySelector('.filter-group').addEventListener('click', filterInputHandler);





