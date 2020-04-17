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

      // creo variabili per usare il template di handlebars
      var target = $('#message-template').html();
      var template = Handlebars.compile(target);

      var context = {
        state: "Error",
        text: "Non puoi cliccare più di una volta sullo stesso square"
      }

      var templateHtml = template(context);


      // faccio un controllo, se lo square ha la classe cliccato faccio apparire un messaggio di errore
      if (self.hasClass('clicked')) {
        $('body').append(templateHtml);

        // altrimenti esegui tutto il resto
      } else {
        // eseguo chiamata ajax per farmi ritornare un numero random da 0 a 9
        $.ajax({
          url: "https://flynn.boolean.careers/exercises/api/random/int",
          method: "GET",
          success: function (data, stato) {
            // salvo in una variabile il numero randomo ritornato dalla chiamata ajax
            var numberRandom = data.response;
            console.log(numberRandom);
            
            self.text(numberRandom); // al centro dello square cliccato appare il numero random

            // aggiungo la classe "clicked" allo square cliccato
            self.addClass('clicked');

            // rimuovo il messaggio d'errore
            $('.message').remove();

            // se il numero è minore o uguale a 5 lo square si colora di giallo
            if (numberRandom <= 5) {
              self.css({
                "background-color": "yellow"
              });

              // altrimenti si colora di verde
            } else {
              self.css({
                "background-color": "green"
            });
            }
          },
          error: function (richiesta, stato, errore) {

          }
        });
      }

  });

});
