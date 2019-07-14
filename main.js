//this controls the slidshow in the about section

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("myslides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

//JS for the auto scroll for food
var slideIndex = 0;
let playing = true;
let pauseButton = document.getElementById("pause");
//let slideInterval = setTimeout(showSlides2, 5000); // Change image every 5 seconds
showSlides2();

function showSlides2() {
  let i;
  let slides = document.getElementsByClassName("mySlides2");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].style.transition = "1.5";
  setTimeout(showSlides2, 5000); //make sure to turn this back on before deploying
}

//this code controls the pause button
// function pauseSlideshow() {
//   pauseButton.innerHTML = `<i class="fas fa-pause"></i>`;
//   playing = false;
//   clearTimeout(slideInterval);
// }
// function playSlideshow() {
//   pauseButton.innerHTML = `<i class="fas fa-play"></i>`;
//   playing = true;
//   slideInterval = setTimeout(showSlides2, 5000);
// }

// pauseButton.onclick = function() {
//   if (playing) {
//     pauseSlideshow();
//   } else {
//     playSlideshow();
//   }
// };

$(document).ready(() => {
  //this assigns an active class to each tab item and then highlights each item
  $(document).on("click", ".tabItem", function() {
    $(".tabItem").removeClass("active2");
    $(this).addClass("active2");
    let content = $(this).attr("data-shizzle");
    $("#content-inner section").removeClass("active1");
    $("#" + content).addClass("active1");
  });

  $.get(
    "https://obscure-tundra-54269.herokuapp.com/fine-dining",
    function(menu) {
      $.each(menu, function(category, items) {
        $("#menu").append('<div class="column ' + category + '"></div>');
        $(".column." + category).append("<h1>" + category + "<h1>");
        $.each(items, function(index, item) {
          let price = parseFloat(item.price).toFixed(2);
          $(".column." + category).append(
            "<h3>" +
              item.name +
              " - $" +
              price +
              "</h3> " +
              " <blockquote>" +
              item.description +
              "</blockquote><br>"
          );
        });
      });
      console.log(menu);
    },
    "json"
  );
});
