document
  .getElementById("dark-mode-toggle")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".navbar").classList.toggle("dark-mode");
    document.querySelector(".header").classList.toggle("dark-mode");
    document.querySelectorAll("section").forEach(function (section) {
      section.classList.toggle("dark-mode");
    });
    document.querySelector(".footer").classList.toggle("dark-mode");
  });