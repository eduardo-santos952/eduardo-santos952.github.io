const API = "https://star-planets-api.herokuapp.com/";
let sky = document.querySelector('.sky');

function createDiv(size) {

  let circle = document.createElement('div');
  circle.classList.add('circle');

  let randRange5 = Math.floor(Math.random() * 5) + 1;
  circle.classList.add(`blink_${randRange5}`);

  let widthAndHeight = random(size, 'px');
  circle.style.height = circle.style.width = widthAndHeight;

  circle.style.left = random(window.innerWidth, 'px');
  circle.style.top = random(window.innerHeight, 'px');
  // circle.style.backgroundColor = randomColor();

  sky.appendChild(circle);
}

let [starSlider, sizeSlider] = document.querySelectorAll('.slider');
let [stars, size] = document.querySelectorAll('.value');

[starSlider, sizeSlider].forEach(slider => {
  slider.addEventListener('change', () => {
    stars.textContent = starSlider.value;
    size.textContent = sizeSlider.value;
  });
  slider.addEventListener('change', () => {
    paintStars(starSlider.value, sizeSlider.value);
  });
});



function paintStars(stars, size) {
  while (sky.firstChild) {
    sky.removeChild(sky.firstChild);
  }
  for (let i = 0; i < stars; i++) {
    createDiv(size);
  }
}


function random(range, unit) {
  let randNum = Math.floor(Math.random() * range) + 1;
  return `${randNum}${unit}`;
}

paintStars(50, 5);

$.getJSON(API, function(data) {
  $('#api-version').html(`API: ${data.title} <br /> Versão: <span class="badge badge-success">${data.version}</span>`);
});

$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

const typeit = new TypeIt('#hero', {
    speed: 50,
    startDelay: 900
  })
  .type('Eduardo Santos, desenvolvedor backend')
  .pause(300)
  .delete(7)
  .pause(250)
  .type('frontend')
  .pause(750)
  .delete(8)
  .type('<strong>fullstack.</strong>')
  .options({
    speed: 50,
    deleteSpeed: 50
  })
  .pause(750)
  .go();


$(".form-planet input").tooltipster({
  animation: 'fade',
  updateAnimation: 'null',
  trigger: 'custom',
  position: 'bottom',
  debug: false,
});

$(".form-etapa-1 select").tooltipster({
  animation: 'fade',
  updateAnimation: 'null',
  trigger: 'custom',
  position: 'bottom',
  debug: false,
});

$(".form-planet").validate({
  rules: {
    name: {
      required: true,
      minlength: 1,
    },
    slug: {
      required: true,
      minlength: 1,
    },
    climate: {
      required: true,
      minlength: 1,
    },
    terrain: {
      required: true,
      minlength: 1,
    },
    films: {
      minlength: 1,
    },
  },
  messages: {
    name: {
      required: "Nome é obrigatório",
      minlength: "Pelomenos 2 caracteres",
    },
    slug: {
      required: "Slug é obrigatório",
      minlength: "Pelomenos 2 caracteres",
    },
    climate: {
      required: "Clima é obrigatório",
      minlength: "Pelomenos 2 caracteres",
    },
    terrain: {
      required: "Tipo de terreno é obrigatório",
      minlength: "Pelomenos 2 caracteres",
    },
    films: {
      minlength: "Pelomenos 2 caracteres",
    },
  },
  errorPlacement: function (error, element) {
    element.addClass("formError");
    //error.insertAfter(element);
    var ele = element,
      err = error.text();
    if (err != null && err !== '') {
      ele.tooltipster('content', err);
      ele.tooltipster('show');
    }
  },
  unhighlight: function (element, errorClass, validClass) {
    $(element).removeClass("formError").removeClass(errorClass).addClass(validClass).tooltipster({
      trigger: 'close'
    });
  },
  submitHandler: function (form) {
    var fields = $( form ).serializeArray();
    $.ajax({
      type: "POST",
      url: API + "planets",
      /* endereço do script PHP */
      async: true,
      data: fields,
      /* informa Url */
      success: function (data) {
        /* sucesso */
        $('.card-title').html(data.message);
        $('#link-planet').attr('href', API+"planets/id/"+data.planeta._id);
        
      },
      beforeSend: function () {
        /* antes de enviar */
        $(".form-planet").fadeOut(500);
        $(".form-container").css('background-color', '#352c32');
        $("#loader").fadeIn(500);
      },
      complete: function () {
        /* completo */
        $('.form-container').fadeOut(300);
        $('.card-response').fadeIn(300);
      }
    });
  }
});