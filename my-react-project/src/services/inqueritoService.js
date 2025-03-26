// Local storage keys
const INQUERITOS_KEY = 'inqueritos_festival';
const RESPOSTA_ATUAL_KEY = 'resposta_atual_inquerito';

// Initialize the local storage with an empty array if not exists
const initializeLocalStorage = () => {
  if (!localStorage.getItem(INQUERITOS_KEY)) {
    localStorage.setItem(INQUERITOS_KEY, JSON.stringify([]));
  }
};

// Get all submitted surveys
export const getInqueritos = () => {
  initializeLocalStorage();
  return JSON.parse(localStorage.getItem(INQUERITOS_KEY) || '[]');
};

// Save a new survey response
export const saveInquerito = (inquerito) => {
  initializeLocalStorage();
  
  // Get current stored surveys
  const inqueritos = getInqueritos();
  
  // Add timestamp and unique ID
  const novoInquerito = {
    ...inquerito,
    id: Date.now().toString(),
    dataSubmissao: new Date().toISOString()
  };
  
  // Save current survey as the active one for response page
  localStorage.setItem(RESPOSTA_ATUAL_KEY, JSON.stringify(novoInquerito));
  
  // Add to the list and save
  inqueritos.push(novoInquerito);
  localStorage.setItem(INQUERITOS_KEY, JSON.stringify(inqueritos));
  
  return novoInquerito;
};

// Get the current active response (last submitted)
export const getRespostaAtual = () => {
  const resposta = localStorage.getItem(RESPOSTA_ATUAL_KEY);
  return resposta ? JSON.parse(resposta) : null;
};

// Get survey statistics
export const getEstatisticas = () => {
  const inqueritos = getInqueritos();
  
  // Initialize statistics objects
  const artistasStats = {};
  const horariosStats = {};
  const criticasList = [];
  
  // Process all surveys
  inqueritos.forEach(inquerito => {
    // Process artists
    Object.entries(inquerito.artistasSelecionados).forEach(([artistaId, selected]) => {
      if (selected) {
        artistasStats[artistaId] = (artistasStats[artistaId] || 0) + 1;
      }
    });
    
    // Process preferred times
    const horario = inquerito.horarioPreferido;
    horariosStats[horario] = (horariosStats[horario] || 0) + 1;
    
    // Process criticisms
    if (inquerito.criticas && inquerito.criticas.trim() !== '') {
      criticasList.push(inquerito.criticas);
    }
  });
  
  return {
    artistasStats,
    horariosStats,
    criticasList
  };
}; 