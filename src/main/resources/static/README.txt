==============================
ShelterPetMatch – Final Project
==============================

A swipe-based front-end web application for discovering and saving adoptable pets.  
This project simulates a real partnership with the **Humane Society of Central Illinois** (for educational/demo purposes only).

All functionality runs in the browser using HTML, CSS, JavaScript (with jQuery), and Bootstrap — and is served through Spring Boot as a static site.

---------------------------------------
WHAT'S INCLUDED
---------------------------------------

- index.html           → Landing page with animated 3D intro
- app.html             → Main swipe interface (like/skip pets)
- favorites.html       → Dashboard showing liked pets
- filter.html          → Filter pets by type and age

- assets/
  └── css/style.css        → All styling, layout, animations
  └── js/script.js         → Swipe logic, filters, modals, storage
  └── data/pets.json       → Local pet profile data (JSON)
  └── images/              → Pet images and interface icons

- src/
  └── main/
      └── resources/
          └── static/
              → All front-end files placed here for Spring Boot

- pom.xml               → Spring Boot project setup (Maven)

---------------------------------------
HOW TO RUN THE PROJECT (Spring Boot)
---------------------------------------

1. Unzip the folder `PetMatch.zip`

2. Open a terminal or command prompt inside the project folder

3. Run this command (from the root of the project):

   On Windows:
   .\mvnw.cmd spring-boot:run

   On Mac/Linux:
   ./mvnw spring-boot:run

4. Once running, open your browser and go to:

   http://10.103.2.192:8080

   You’ll see the landing page. Click “Enter” to begin swiping pets.

Spring Boot automatically serves all files from the `/static` folder.

---------------------------------------
FRONT-END USE CASES
---------------------------------------

1. **Swipe to Like / Skip Pets**
   → Interactive swipe UI using buttons or touch gestures  
   → Smooth animations & transitions

2. **Add Pets to Favorites**
   → Liked pets saved to localStorage  
   → Prevents duplicates

3. **View Favorites in Dashboard**
   → Grid layout of liked pets with full profile info  
   → Responsive display with Bootstrap cards

4. **Filter Pets by Type and Age**
   → Dropdown selects filter pet list (e.g., Cats, 0–2 yrs)  
   → Applies instantly when swiping

5. **Pet Detail Modal**
   → Clicking a pet card shows full-screen modal with details  
   → Clean, mobile-friendly layout

 **Bonus Features**
- Dark Mode Toggle
- Copy Pet Profile Link (fake share feature)
- "You matched with [Pet Name]!" toast popup
- Heart pulse animation on like
- Clear all favorites button
- Enter key for liking pets (keyboard support)

---------------------------------------
TECHNOLOGIES USED
---------------------------------------

- HTML5 / CSS3 / JavaScript (ES6)
- jQuery
- Bootstrap 5
- Spring Boot (Java + Maven)
- LocalStorage (browser-side persistence)

---------------------------------------
IMPORTANT NOTES
---------------------------------------

- All content is front-end only; Spring Boot simply serves the files  
- No backend logic or database is used  
- Project runs fully offline once served

---------------------------------------
Submission-Ready
---------------------------------------

Everything is self-contained inside this Spring Boot project.  
Ready to run and demo using `mvnw spring-boot:run` or from any IDE.

Thanks!
