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
  // TODO: Stworzyć lepszą weryfikację wprowadzanch danych!
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
  const temp = getTemplateHtml(dane.rodzaj);
  temp.content.querySelector(".element__opis").innerHTML = dane.nazwa;
  temp.content.querySelector(".element__kwota").innerHTML = `${dane.kwota} zł`;

  document.querySelector(`.${dane.rodzaj}__lista`).appendChild(temp.content);
};

const getTemplateHtml = rodzaj => {
  const temp = document.querySelector(`#${rodzaj}__template`);
  const clone = temp.cloneNode(true);
  return clone;
};

document
  .querySelector(".kalkulator__formularz")
  .addEventListener("submit", dodajBudzet, false);
