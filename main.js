// Griglia 6x6,
// ad ogni click (su ogni rettangolino) parte una richiesta AJAX che prende un numero random da 1 a 9 (primo end-point della API in slide).
// Se il num ritornato è <= 5 il quadrato diventa giallo,
// se è > di 5 il quadrato diventa verde.
// Il numero ottenuto appare al centro del quadrato
$(document).ready(function(){

  // salvo in una variabile il riferimento al container
  var container = $('.container-square');

  // creo 36 quadrati con il ciclo for
  for (var i = 0; i < 36; i++) {
    container.append('<div class="square"></div>');
  }

  // aggancio l'evento click ai quadrati, delegandolo al container
  container.on('click', '.square',
    function () {
      // salvo in una variabile il riferimento all'elemento cliccato in quel momento
      var self = $(this);
      // eseguo chiamata ajax per farmi ritornare un numero random da 0 a 9
      $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/random/int",
        method: "GET",
        success: function (data, stato) {
          // salvo in una variabile il numero randomo ritornato dalla chiamata ajax
          var numberRandom = data.response;
          console.log(numberRandom);
          if (numberRandom <= 5) {
            self.css({
              "background-color": "yellow"
            });
          } else {
            self.css({
              "background-color": "green"
          });
          }
        },
        error: function (richiesta, stato, errore) {
          console.log(richiesta, stato, errore);
        }
      });
  });

});
