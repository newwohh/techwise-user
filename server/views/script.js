const toggleThemeButton = document.getElementById("toggleTheme");
const container = document.querySelector(".container");
const fab = document.getElementById("fab");

toggleThemeButton.addEventListener("click", () => {
  container.classList.toggle("dark-theme");
  fab.classList.toggle("dark-theme");
});

const fabButton = document.getElementById("fab");
fabButton.addEventListener("click", () => {
  alert("You clicked the Floating Action Button!");
});
