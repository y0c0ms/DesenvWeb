// Atualiza os grupos de data/hora conforme o valor do slider
function updateDaysFields() {
  const count = parseInt(document.getElementById("diasCount").value);
  document.getElementById("sliderValue").textContent = count;
  
  for (let i = 1; i <= 4; i++) {
    const group = document.getElementById("group" + i);
    if (i <= count) {
      group.style.display = "block";
      // Define os campos como obrigatórios
      const dataInput = group.querySelector('select[id^="dias"]');
      const timeInput = group.querySelector('input[list="horarios-list"]');
      if (dataInput) dataInput.required = true;
      if (timeInput) timeInput.required = true;
    } else {
      group.style.display = "none";
      // Remove a obrigatoriedade
      const dataInput = group.querySelector('select[id^="dias"]');
      const timeInput = group.querySelector('input[list="horarios-list"]');
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
  const commentInput = document.getElementById("comentario");
  const commentMsg = document.getElementById("comentarioMsg");
  const normalizedComment = commentInput.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  // Lista de palavras proibidas
  const insults = [
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
  
  let isValid = true;
  for (let i = 0; i < insults.length; i++) {
    // Normaliza as palavra proibidas para remover acentos e converter para minúsculas
    const normalizedInsult = insults[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (normalizedComment.indexOf(normalizedInsult) !== -1) {
      isValid = false;
      break;
    }
  }
  
  if (isValid) {
    commentMsg.textContent = "comentário aceite";
  } else {
    commentMsg.textContent = "";
    commentInput.value = "";
    alert("Comentário não aceite. Por favor, evite usar insultos.");
  }
}

// Slideshow e outros efeitos, executados quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
  // Slideshow
  const slideshow = document.getElementById("slideshow");
  if (slideshow) {
    const slides = slideshow.getElementsByTagName("img");
    let slideIndex = 0;
    function showSlide(index) {
      for (let i = 0; i < slides.length; i++) {
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
  
  // Efeito hover na foto do festival
  const festivalPhoto = document.getElementById("festivalPhoto");
  if (festivalPhoto) {
    festivalPhoto.addEventListener("mouseover", function() {
      festivalPhoto.style.opacity = "0";
    });
    festivalPhoto.addEventListener("mouseout", function() {
      festivalPhoto.style.opacity = "1";
    });
  }
});
