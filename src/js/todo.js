const dataKontroler = (() => {
  let elements = [];

  return {
    dodajElement: (rodzajTemplatki, opis) => {
      elements = [...elements, { rodzajTemplatki, opis }];
    },
    pobierzElementy: () => {
      return elements;
    },
    usunElement: (rodzajTemplatki, opis) => {
      const index = elements.findIndex(
        item => item.rodzajTemplatki == rodzajTemplatki && item.opis === opis
      );

      elements = [...elements.slice(0, index), ...elements.slice(index + 1)];
    }
  };
})();

const uiKontroler = (() => {
  const wyswietlElement = (rodzaj, opis) => {
    const lista = document.querySelector(`[data-template=${rodzaj}]`)
      .parentNode;
    const templatka = document
      .querySelector(`[data-template=${rodzaj}]`)
      .cloneNode(true);

    templatka.content.querySelector(".todo__opis").innerHTML = opis;
    lista.insertBefore(templatka.content, lista.firstChild);
  };
  return {
    //   Funkcja do wyświetlenia wielu elementów za pierwszym uruchomieniem apki
    //   wiedząc, że istnieje baza danych.
    // wyswietlWszystkieElementy: elementy => {
    //   elementy.map(e => {
    //       wyswietlElement(e.rodzajTemplatki, e.opis);
    //   });
    // },
    wyswietlJedenElement: (rodzajTemplatki, opis) => {
      wyswietlElement(rodzajTemplatki, opis);
    },
    usunElement: e => {
      e.parentNode.remove();
    },
    skreslElement: e => {
      e.classList.toggle("todo__element--skreslony");
    }
  };
})();

const todoAppKontroler = ((data, ui) => {
  const pokazInput = (rodzajTemplatki, input) => {
    const ukryjPozaFocusem = () => {
      input.classList.remove("todo__input--pokaz");
      input.removeEventListener("focusout", ukryjPozaFocusem);
      input.removeEventListener("keypress", gdyNacisnietyEnter);
      input.value = "";
    };

    const gdyNacisnietyEnter = e => {
      if (e.key === "Enter") {
        input.classList.remove("todo__input--pokaz");
        if (input.value) {
          data.dodajElement(rodzajTemplatki, input.value);
          ui.wyswietlJedenElement(rodzajTemplatki, input.value);
          input.value = "";
        }
        input.removeEventListener("keypress", gdyNacisnietyEnter);
      }
    };

    input.classList.add("todo__input--pokaz");
    input.focus();
    input.addEventListener("focusout", ukryjPozaFocusem);
    input.addEventListener("keypress", gdyNacisnietyEnter);
  };

  const dodawanieElementu = e => {
    const rodzajTemplatki = e.dataset.type;
    const poleInput = document.querySelector(
      `[data-template=${rodzajTemplatki}]`
    ).parentNode.previousElementSibling;

    pokazInput(rodzajTemplatki, poleInput);
  };

  const usuwanieElementu = e => {
    const opis = e.parentNode.firstChild.innerHTML;
    const rodzaj =
      e.parentNode.parentNode.previousElementSibling.previousElementSibling
        .dataset.type;
    data.usunElement(rodzaj, opis);
    ui.usunElement(e);
  };

  const dodajEventy = () => {
    document.querySelector("body").addEventListener("click", e => {
      if (e.target.className === "todo__dodaj") {
        dodawanieElementu(e.target);
      }
      if (e.target.className === "todo__usun") {
        usuwanieElementu(e.target);
      }
      if (
        e.target.className === "todo__element" ||
        e.target.className === "todo__element todo__element--skreslony"
      ) {
        ui.skreslElement(e.target);
      }
    });
  };

  return {
    inicjalizacja: () => {
      dodajEventy();
    }
  };
})(dataKontroler, uiKontroler);

todoAppKontroler.inicjalizacja();
