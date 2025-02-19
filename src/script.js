// Atualiza os grupos de data/hora conforme o valor do slider
function updateDaysFields() {
  var count = parseInt(document.getElementById("diasCount").value);
  document.getElementById("sliderValue").textContent = count;
  
  for (var i = 1; i <= 4; i++) {
    var group = document.getElementById("group" + i);
    if (i <= count) {
      group.style.display = "block";
      // Define os campos como obrigatórios
      var dataInput = group.querySelector('select[id^="dias"]');
      var timeInput = group.querySelector('input[list="horarios-list"]');
      if (dataInput) dataInput.required = true;
      if (timeInput) timeInput.required = true;
    } else {
      group.style.display = "none";
      // Remove a obrigatoriedade
      var dataInput = group.querySelector('select[id^="dias"]');
      var timeInput = group.querySelector('input[list="horarios-list"]');
      if (dataInput) dataInput.required = false;
      if (timeInput) timeInput.required = false;
    }
  }
  
  // Se o valor máximo (4) for selecionado, preenche automaticamente os selects
  if (count === 4) {
    document.getElementById("dias1").value = "21";
    document.getElementById("dias2").value = "22";
    document.getElementById("dias3").value = "23";
    document.getElementById("dias4").value = "24";
  }
}

// Função para validar o comentário, proibindo as palavras especificadas
function validateComment() {
  var commentInput = document.getElementById("comentario");
  var commentMsg = document.getElementById("comentarioMsg");
  var commentText = commentInput.value.toLowerCase();
  
  // Lista de palavras proibidas
  var insults = [
    "abécula",
    "abentesma",
    "achavascado",
    "alimária",
    "andrajoso",
    "barregã",
    "biltre",
    "cacóstomo",
    "cuarra",
    "estólido",
    "estroso",
    "estultilóquio",
    "nefelibata",
    "néscio",
    "pechenga",
    "sevandija",
    "somítico",
    "tatibitate",
    "xexé",
    "cheché",
    "xexelento"
  ];
  
  var isValid = true;
  for (var i = 0; i < insults.length; i++) {
    if (commentText.indexOf(insults[i]) !== -1) {
      isValid = false;
      break;
    }
  }
  
  if (isValid) {
    commentMsg.textContent = "comentário aceite";
  } else {
    commentMsg.textContent = "";
    commentInput.value = "";
    alert("Comentário não aceite. Por favor, evite as palavras proibidas.");
  }
}

// Slideshow e outros efeitos, executados quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
  // Slideshow
  var slideshow = document.getElementById("slideshow");
  if (slideshow) {
    var slides = slideshow.getElementsByTagName("img");
    var slideIndex = 0;
    function showSlide(index) {
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[index].style.display = "block";
    }
    function nextSlide() {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    }
    showSlide(slideIndex);
    setInterval(nextSlide, 3000); // Troca a cada 3 segundos
  }
  
  // Efeito hover na foto do festival (na homepage)
  var festivalPhoto = document.getElementById("festivalPhoto");
  if (festivalPhoto) {
    festivalPhoto.addEventListener("mouseover", function() {
      festivalPhoto.style.opacity = "0";
    });
    festivalPhoto.addEventListener("mouseout", function() {
      festivalPhoto.style.opacity = "1";
    });
  }
});
