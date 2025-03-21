document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("navbar");
    const logoImg = document.querySelector("#logoHeader img");
    const logoOriginal = "assets/img/kronos.jpg";
    const logoBlanco = "assets/img/kronos_blanco.png";

    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) { 
        navbar.classList.add("scrolled");
        // Cambiar al logo blanco cuando se hace scroll
        logoImg.src = logoBlanco;
      } else {
        navbar.classList.remove("scrolled");
        // Volver al logo original cuando se está en la parte superior
        logoImg.src = logoOriginal;
      }
    });
  });