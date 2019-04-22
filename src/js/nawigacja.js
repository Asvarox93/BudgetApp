{
  document.addEventListener("DOMContentLoaded", e => {
    const hamburgerButton = document.querySelector(".hamburger__przycisk");
    const nawigacja = document.querySelector(".nawigacja");
    let jestAktywny = false;

    document.addEventListener("click", e => {
      if (e.target.closest(".hamburger__przycisk")) {
        nawigacja.classList.toggle("nawigacja--ukryj");
        hamburgerButton.classList.toggle("hamburger__przycisk--aktywny");
        jestAktywny = !jestAktywny;
        return;
      }
      if (jestAktywny == true) {
        if (e.target.closest(".nawigacja")) return;
        nawigacja.classList.add("nawigacja--ukryj");
        hamburgerButton.classList.remove("hamburger__przycisk--aktywny");
        jestAktywny = !jestAktywny;
        return;
      }
    });
  });
}
