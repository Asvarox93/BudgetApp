// Dodawanie budzetu
const dodajBudzet = e => {
  e.preventDefault();

  const dane = {
    rodzaj: document.querySelector('[name="rodzaj"]').value,
    nazwa: document.querySelector('[name="nazwa"]').value,
    kwota: document.querySelector('[name="kwota"]').value
  };

  const errors = sprawdzDane(dane);

  if (errors) {
    const bledy = document.querySelector(".kalkulator__bledy");

    bledy.innerHTML = errors;
    bledy.classList.add("kalkulator__bledy--aktywny");

    setTimeout(() => {
      bledy.classList.remove("kalkulator__bledy--aktywny");
    }, 5000);

    return;
  }

  dodajElementDoBudzetu(dane);

  return;
};

const sprawdzDane = dane => {
  let errors = "";

  Object.keys(dane).forEach(e => {
    if (dane[e] === "") {
      if (e === "nazwa") {
        errors += `Wprowadz poprawne dane w polu dodaj opis <br>`;
      } else {
        errors += `Wprowadz poprawne dane w polu ${e} <br>`;
      }
    }
  });

  return errors;
};

const dodajElementDoBudzetu = dane => {
  //TODO: sprawdzenie czy wydatek, czy dochod a nastepnie dodanie do html.
};

document
  .querySelector(".kalkulator__formularz")
  .addEventListener("submit", dodajBudzet, false);
