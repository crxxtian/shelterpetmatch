$(document).ready(function () {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    window.location.href = 'index.html'; // safer to go back to login
    return;
  }

  let likedPets = [];
  let selectedPetIndex = null;
  const petModal = new bootstrap.Modal(document.getElementById('petModal'));

  // Fetch favorites from MySQL
  function fetchFavorites() {
    fetch(`http://10.112.4.124:8080/api/favorites/${currentUser.id}`)
      .then(response => response.json())
      .then(data => {
        likedPets = data;
        renderFavorites();
      })
      .catch(error => console.error('Error fetching favorites:', error));
  }

  // Render the list of favorite pets
  function renderFavorites() {
    const favoritesList = $('#favorites-list');
    favoritesList.empty();

    if (likedPets.length === 0) {
      favoritesList.html("<p class='text-center mt-4 text-muted'>You have no favorite pets yet.</p>");
      return;
    }

    likedPets.forEach((favorite, index) => {
      const pet = favorite.pet;
	  const petCard = `
	    <div class="col-md-4 mb-4">
	      <div class="card h-100 shadow-sm pet-card" data-index="${index}" style="cursor: pointer;">
	        <div class="ratio ratio-1x1">
	          <img src="${pet.imageUrl}" class="card-img-top rounded-top" alt="${pet.name}" style="object-fit: cover;">
	        </div>
	        <div class="card-body text-center">
	          <h5 class="card-title">${pet.name}</h5>
	          <p class="card-text">${pet.type} • ${pet.age} yrs • ${pet.breed}</p>
	        </div>
	      </div>
	    </div>
	  `;
      favoritesList.append(petCard);
    });
  }

  // Open pet modal and show details
  function openPetModal(index) {
    selectedPetIndex = index;
    const pet = likedPets[index].pet;
    $('#modalPetImg').attr('src', pet.imageUrl).attr('alt', pet.name);
    $('#modalPetName').text(pet.name);
    $('#modalPetInfo').text(`${pet.type}, ${pet.age} years old`);
    $('#modalPetBreed').text(pet.breed);
    $('#modalPetDescription').text(pet.description);
    petModal.show();
  }

  // Remove a single favorite
  $('#removeFavoriteBtn').on('click', function () {
    if (selectedPetIndex === null || !likedPets[selectedPetIndex]) return;
    const petId = likedPets[selectedPetIndex].pet.id;

    fetch(`http://10.112.4.124:8080/api/favorites/remove/${currentUser.id}/${petId}`, {
      method: 'DELETE'
    })
      .then(() => {
        petModal.hide();
        fetchFavorites();
      })
      .catch(error => console.error('Error removing favorite:', error));
  });

  // Clear all favorites
  $('#clear-favorites').on('click', function () {
    if (!confirm('Are you sure you want to clear all favorites?')) return;

    const deleteRequests = likedPets.map(favorite =>
      fetch(`http://10.112.4.124:8080/api/favorites/remove/${currentUser.id}/${favorite.pet.id}`, {
        method: 'DELETE'
      })
    );

    Promise.all(deleteRequests)
      .then(() => fetchFavorites())
      .catch(error => console.error('Error clearing favorites:', error));
  });

  // Click on pet card
  $(document).on('click', '.pet-card', function () {
    const index = $(this).data('index');
    openPetModal(index);
  });

  // First load
  fetchFavorites();
});
