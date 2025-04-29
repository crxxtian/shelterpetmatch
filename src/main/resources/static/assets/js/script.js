$(document).ready(function () {
  let pets = [];
  let likedPets = JSON.parse(localStorage.getItem("likedPets")) || [];
  let currentIndex = 0;
  let filteredPets = [];
  let isDragging = false;
  let startX = 0;

  function loadPetsFromAPI() {
    return $.ajax({
      url: "http://10.103.2.192:8080/api/pets",
      method: "GET",
      dataType: "json"
    });
  }

  function loadPet() {
    if (currentIndex < filteredPets.length) {
      const pet = filteredPets[currentIndex];
      $("#pet-image").attr("src", pet.imageUrl).attr("alt", pet.name);
      $("#pet-name").text(pet.name);
      $("#pet-info").text(`${pet.type}, ${pet.age} years old, ${pet.breed}. ${pet.description}`);

      $("#swipe-card").css({
        transition: "none",
        transform: "translateX(0) rotate(0deg)",
        opacity: 1
      });
    } else {
      $("#swipe-card").html("<p class='text-center p-3'>No more pets to swipe!</p>").css("opacity", 1);

      // 🧹 Optional: clear filters if no more pets
      localStorage.removeItem("filteredPets");
    }
  }

  function animateSwipe(direction) {
    const moveX = direction === "left" ? "-120%" : "120%";
    const rotateDeg = direction === "left" ? "-20deg" : "20deg";

    $("#swipe-card").css({
      transition: "transform 0.5s ease, opacity 0.5s ease",
      transform: `translateX(${moveX}) rotate(${rotateDeg})`,
      opacity: 0
    });
  }

  function nextPet() {
    currentIndex++;
    loadPet();
  }

  function saveFavorite(pet) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !pet) return;

    $.ajax({
      url: "http://10.103.2.192:8080/api/favorites/add",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        userId: currentUser.id,
        petId: pet.id
      })
    })
    .then(() => {
      console.log('Favorite saved');
      likedPets.push(pet);
      localStorage.setItem("likedPets", JSON.stringify(likedPets));

      $("#toast-name").text(pet.name);
      $(".heart-pulse").addClass("animate");
      setTimeout(() => $(".heart-pulse").removeClass("animate"), 600);

      const toastEl = document.getElementById("likeToast");
      const toast = new bootstrap.Toast(toastEl, { delay: 1500 });
      toast.show();
    })
    .catch(err => {
      console.error('Failed to save favorite', err);
    });
  }

  $("#skip-btn").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (currentIndex >= filteredPets.length) return;

    animateSwipe("left");
    setTimeout(() => {
      nextPet();
    }, 500);
  });

  $("#like-btn").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (currentIndex >= filteredPets.length) {
      console.error("No more pets to like");
      return;
    }

    const currentPet = filteredPets[currentIndex];
    if (!currentPet) {
      console.error("Current pet is undefined");
      return;
    }

    saveFavorite(currentPet);
    animateSwipe("right");
    setTimeout(() => {
      nextPet();
    }, 500);
  });

  $("#swipe-card").on("mousedown touchstart", function (e) {
    if (currentIndex >= filteredPets.length) return;
    if ($(e.target).closest("#like-btn, #skip-btn").length) return;
    isDragging = true;
    startX = e.pageX || e.originalEvent.touches[0].clientX;
  });

  $(document).on("mousemove touchmove", function (e) {
    if (!isDragging || currentIndex >= filteredPets.length) return;

    let currentX = e.pageX || e.originalEvent.touches[0].clientX;
    let deltaX = currentX - startX;

    if (Math.abs(deltaX) > 20) {
      $("#swipe-card").css({
        transform: `translateX(${deltaX}px) rotate(${deltaX / 20}deg)`,
        transition: "none"
      });
    }
  });

  $(document).on("mouseup touchend", function (e) {
    if (!isDragging || currentIndex >= filteredPets.length) return;
    isDragging = false;

    let endX = e.pageX || e.originalEvent.changedTouches[0].clientX;
    let deltaX = endX - startX;

    if (deltaX > 100) {
      const currentPet = filteredPets[currentIndex];
      if (currentPet) {
        saveFavorite(currentPet);
        animateSwipe("right");
        setTimeout(() => {
          nextPet();
        }, 500);
      }
    } else if (deltaX < -100) {
      animateSwipe("left");
      setTimeout(() => {
        nextPet();
      }, 500);
    } else {
      $("#swipe-card").css({
        transition: "transform 0.3s ease",
        transform: "translateX(0) rotate(0deg)"
      });
    }
  });

  $("#share-btn").on("click", function () {
    if (currentIndex >= filteredPets.length) return;
    const pet = filteredPets[currentIndex];
    const fakeLink = `https://petmatch.app/profile/${encodeURIComponent(pet.name.toLowerCase())}`;
    navigator.clipboard.writeText(fakeLink).then(() => {
      alert("Profile link copied!");
    });
  });

  if (localStorage.getItem("theme") === "dark") {
    $("body").addClass("dark");
  }

  $("#dark-toggle").on("click", function () {
    $("body").toggleClass("dark");
    const mode = $("body").hasClass("dark") ? "dark" : "light";
    localStorage.setItem("theme", mode);
  });

  loadPetsFromAPI()
    .then(data => {
      pets = data;

      const savedFilteredPets = JSON.parse(localStorage.getItem("filteredPets"));
      if (savedFilteredPets && savedFilteredPets.length > 0) {
        console.log("Using filtered pets from localStorage");
        filteredPets = savedFilteredPets;
      } else {
        console.log("Using all pets");
        filteredPets = [...pets];
      }

      loadPet();
    })
    .catch(error => {
      console.error("Failed to load pets:", error);
      $("#swipe-card").html("<p class='text-center p-3 text-danger'>Failed to load pets. Please try again later.</p>");
    });
});
