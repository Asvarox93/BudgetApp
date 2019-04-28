(() => {
  let jestAktywny = false;

  const menuToggle = () => {
    const hamburgerButton = document.querySelector(".hamburger__przycisk");
    const nawigacja = document.querySelector(".nawigacja");
    nawigacja.classList.toggle("nawigacja--ukryj");
    hamburgerButton.classList.toggle("hamburger__przycisk--aktywny");
    jestAktywny = !jestAktywny;
  };

  const zmienStrone = e => {
    const budzet = document.querySelector(".budzet");
    const todo = document.querySelector(".todo");
    const budzetLink = document.querySelector("[data-link=budzet]");
    const todoLink = document.querySelector("[data-link=todo]");
    const hamburger = document.querySelector(".hamburger__przycisk");

    if (e === "budzet") {
      budzetLink.classList.add("nawigacja__aktywny");
      todoLink.classList.remove("nawigacja__aktywny");
      budzet.classList.remove("budzet__ukryj");
      todo.classList.remove("todo__pokaz");
      hamburger.classList.remove("hamburger__przycisk--todo");
      menuToggle();
    }
    if (e === "todo") {
      todoLink.classList.add("nawigacja__aktywny");
      budzetLink.classList.remove("nawigacja__aktywny");
      budzet.classList.add("budzet__ukryj");
      todo.classList.add("todo__pokaz");
      hamburger.classList.add("hamburger__przycisk--todo");
      menuToggle();
    }
  };

  document.addEventListener("DOMContentLoaded", e => {
    document.addEventListener("click", e => {
      if (e.target.closest(".hamburger__przycisk")) {
        menuToggle();
        return;
      }

      zmienStrone(e.target.dataset.link);

      if (jestAktywny == true) {
        if (e.target.closest(".nawigacja")) return;
        menuToggle();
        return;
      }
    });
  });
})();
