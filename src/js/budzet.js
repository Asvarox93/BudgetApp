// Dodawanie budzetu

const budgetController = (() => {
  let dochodLista = [0];
  let wydatkiLista = [0];
  let saldo = 0;
  let sumaDochodu = 0;
  let sumaWydatki = 0;
  let wydatkiProcent = 0;

  const aktualizujBudzet = () => {
    const getsum = (total, num) => {
      return total + num;
    };
    sumaDochodu = Math.round(dochodLista.reduce(getsum) * 100) / 100;
    sumaWydatki = Math.round(wydatkiLista.reduce(getsum) * 100) / 100;

    saldo = Math.floor((sumaDochodu - sumaWydatki) * 100) / 100;
    wydatkiProcent =
      Math.floor(((sumaWydatki * 100) / sumaDochodu) * 100) / 100;
  };

  return {
    dodajElementDoBudzetu: dane => {
      if (dane.rodzaj === "dochod") {
        dochodLista.push(dane.kwota);
      }
      if (dane.rodzaj === "wydatki") {
        wydatkiLista.push(dane.kwota);
      }

      aktualizujBudzet();
    },
    usunElementZBudzetu: e => {
      const rodzaj = e.parentNode.parentNode.dataset.type;
      const kwota = e.parentNode.previousElementSibling.innerHTML
        .match(/\d+/g)
        .map(Number);

      if (rodzaj === "dochod") {
        const index = dochodLista.indexOf(kwota[0]);
        if (index !== -1) {
          dochodLista.splice(index, 1);
        }
      }
      if (rodzaj === "wydatki") {
        const index = wydatkiLista.indexOf(kwota[0]);
        if (index !== -1) {
          wydatkiLista.splice(index, 1);
        }
      }

      aktualizujBudzet();
    },
    pobierzDaneBudzetu: () => {
      const dane = {
        sumaDochodu,
        sumaWydatki,
        saldo,
        wydatkiProcent
      };
      return dane;
    }
  };
})();

const uiController = (() => {
  const getTemplateHtml = rodzaj => {
    const temp = document.querySelector(`#${rodzaj}__template`);
    const clone = temp.cloneNode(true);
    return clone;
  };

  return {
    zglosBledy: e => {
      const bledy = document.querySelector(".kalkulator__bledy");

      bledy.innerHTML = e;
      bledy.classList.add("kalkulator__bledy--aktywny");

      setTimeout(() => {
        bledy.classList.remove("kalkulator__bledy--aktywny");
      }, 5000);
    },

    dodajElementBudzetuDoUI: dane => {
      const temp = getTemplateHtml(dane.rodzaj);

      temp.content.querySelector(".element__opis").innerHTML = dane.nazwa;
      temp.content.querySelector(".element__kwota").innerHTML = `${
        dane.kwota
      } zł`;

      document
        .querySelector(`.${dane.rodzaj}__lista`)
        .appendChild(temp.content);
    },
    aktualizujBudzetUI: dane => {
      const budzetSrodki = document.querySelector(".budzet__srodki");
      const dochodSrodki = document.querySelector(".dochod__srodki");
      const wydatkiSrodki = document.querySelector(".wydatki__srodki");
      const wydatkiProcent = document.querySelector(".wydatki__procent");

      budzetSrodki.innerHTML = dane.saldo + " zł";
      dochodSrodki.innerHTML = dane.sumaDochodu + " zł";
      wydatkiSrodki.innerHTML = dane.sumaWydatki + " zł";
      wydatkiProcent.innerHTML = dane.wydatkiProcent + " %";
    }
  };
})();

const appController = ((budget, ui) => {
  const dodajBudzet = () => {
    // e.preventDefault();

    const dane = {
      rodzaj: document.querySelector('[name="rodzaj"]').value,
      nazwa: document.querySelector('[name="nazwa"]').value,
      kwota:
        Math.floor(
          document.querySelector('[name="kwota"]').value.replace(",", ".") * 100
        ) / 100
    };

    if (sprawdzDane(dane)) {
      return;
    }
    budget.dodajElementDoBudzetu(dane);
    ui.dodajElementBudzetuDoUI(dane);
    ui.aktualizujBudzetUI(budget.pobierzDaneBudzetu());
  };

  const usunElementZBudzetu = e => {
    budget.usunElementZBudzetu(e);
    ui.aktualizujBudzetUI(budget.pobierzDaneBudzetu());
    e.parentNode.parentNode.remove();
  };

  const sprawdzDane = dane => {
    let errors = "";

    Object.keys(dane).forEach(e => {
      if (dane[e] === "") {
        if (e === "nazwa") {
          errors += `Wprowadz dane w polu dodaj opis <br>`;
        } else {
          errors += `Wprowadz dane w polu ${e} <br>`;
        }
      } else if (e === "nazwa" && dane[e].length < 3) {
        errors += `Wprowadz minimum 3 znaki w polu ${e} <br>`;
      } else if (
        (e === "kwota" && (isNaN(parseFloat(dane[e])) && !isFinite(dane[e]))) ||
        String(dane[e]).includes("-")
      ) {
        errors += `Wprowadz poprawne dane w polu ${e} (tylko liczby) <br>`;
      }
    });

    if (errors) {
      ui.zglosBledy(errors);
      return true;
    }

    return;
  };

  return {
    inicjalizacja: () => {
      document.querySelector("body").addEventListener("click", e => {
        if (e.target.className === "far fa-check-circle") {
          dodajBudzet();
        }
        if (e.target.className === "far fa-times-circle") {
          usunElementZBudzetu(e.target);
        }
      });
    }
  };
})(budgetController, uiController);

appController.inicjalizacja();
