/**
 * Volunteer Form JavaScript
 * Handles the functionality for the volunteer application form
 */

// Atualiza os grupos de data/hora conforme o valor do slider
function updateDaysFields() {
  const count = parseInt(document.getElementById("diasCount").value);
  document.getElementById("sliderValue").textContent = count;
  
  for (let i = 1; i <= 4; i++) {
    const group = document.getElementById("group" + i);
    if (!group) continue;
    
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

// Lista de palavras proibidas
const PROHIBITED_WORDS = [
  "abécula", "abentesma", "achavascado", "alimária", "andrajoso",
  "barregã", "biltre", "cacóstomo", "cuarra", "estólido",
  "estroso", "estultilóquio", "nefelibata", "néscio", "pechenga",
  "sevandija", "somítico", "tatibitate", "xexé", "cheché", "xexelento"
];

// Função para validar o comentário, proibindo as palavras especificadas
function validateComment() {
  const commentInput = document.getElementById("comentario");
  const commentMsg = document.getElementById("comentarioMsg");
  
  if (!commentInput || !commentMsg) return;
  
  const normalizedComment = commentInput.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  
  let isValid = !PROHIBITED_WORDS.some(word => {
    const normalizedWord = word
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return normalizedComment.includes(normalizedWord);
  });
  
  if (isValid) {
    commentMsg.textContent = "comentário aceite";
  } else {
    commentMsg.textContent = "";
    commentInput.value = "";
    alert("Comentário não aceite. Por favor, evite usar insultos.");
  }
}

// Inicializar o formulário quando a página carregar
document.addEventListener("DOMContentLoaded", function() {
  // Verifica se estamos na página de voluntário
  const diasCountSlider = document.getElementById("diasCount");
  if (diasCountSlider) {
    // Inicializa os campos de dias
    updateDaysFields();
    
    // Adiciona listeners para validação em tempo real
    const commentInput = document.getElementById("comentario");
    if (commentInput) {
      commentInput.addEventListener("blur", function() {
        const validateBtn = document.querySelector('button[onclick="validateComment()"]');
        if (validateBtn && commentInput.value.trim()) {
          validateComment();
        }
      });
    }
  }
}); 