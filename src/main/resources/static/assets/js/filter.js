$(document).ready(function () {
  let pets = [];

  function loadPetsFromAPI() {
    return $.ajax({
      url: "http://10.103.2.192:8080/api/pets",
      method: "GET",
      dataType: "json"
    });
  }

  function applyFilters(pets, type, ageRange) {
    return pets.filter(pet => {
      const typeMatch = (type === "all" || pet.type === type);
      const ageMatch =
        ageRange === "all" ||
        (ageRange === "0-1" && pet.age <= 1) ||
        (ageRange === "1-3" && pet.age > 1 && pet.age <= 3) ||
        (ageRange === "3-5" && pet.age > 3 && pet.age <= 5) ||
        (ageRange === "5+" && pet.age > 5);
      return typeMatch && ageMatch;
    });
  }

  // Load all pets from server
  loadPetsFromAPI()
    .then(data => {
      pets = data;
    })
    .catch(error => {
      console.error("Failed to load pets:", error);
      pets = [];
    });

  $("#filter-form").on("submit", function (e) {
    e.preventDefault();

    const selectedType = $("#pet-type").val();
    const selectedAge = $("#pet-age").val();

    const filteredPets = applyFilters(pets, selectedType, selectedAge);

    localStorage.setItem("filteredPets", JSON.stringify(filteredPets));
    window.location.href = "app.html"; // Correct page to go after filtering
  });
});
