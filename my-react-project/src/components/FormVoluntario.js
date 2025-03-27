import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormVoluntario.css';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';

// Lista de palavras proibidas
const PROHIBITED_WORDS = [
  "abécula", "abentesma", "achavascado", "alimária", "andrajoso",
  "barregã", "biltre", "cacóstomo", "cuarra", "estólido",
  "estroso", "estultilóquio", "nefelibata", "néscio", "pechenga",
  "sevandija", "somítico", "tatibitate", "xexé", "cheché", "xexelento"
];

function FormVoluntario() {
  const navigate = useNavigate();
  
  // Estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [contacto, setContacto] = useState("");
  const [diasCount, setDiasCount] = useState(1);
  const [dias, setDias] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [horarios, setHorarios] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [comentario, setComentario] = useState("");
  const [comentarioValido, setComentarioValido] = useState(true);
  const [comentarioMsg, setComentarioMsg] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Função para validar comentário, proibindo palavras especificadas
  const validateComment = (text) => {
    if (!text) {
      setComentarioValido(true);
      setComentarioMsg("");
      return true;
    }
    
    const normalizedComment = text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    
    const isValid = !PROHIBITED_WORDS.some(word => {
      const normalizedWord = word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      return normalizedComment.includes(normalizedWord);
    });
    
    setComentarioValido(isValid);
    setComentarioMsg(isValid ? "comentário aceite" : "comentário contém palavras proibidas");
    
    return isValid;
  };

  // Função para validar o formulário completo
  const validateForm = () => {
    const errors = {};
    
    // Validar nome
    if (!nome) {
      errors.nome = "Nome é obrigatório";
    }
    
    // Validar contacto
    if (!contacto) {
      errors.contacto = "Contacto é obrigatório";
    } else if (!/^[0-9]+$/.test(contacto)) {
      errors.contacto = "Contacto deve conter apenas números";
    }
    
    // Validar dias
    for (let i = 1; i <= diasCount; i++) {
      if (!dias[i]) {
        errors[`dia${i}`] = `Data ${i} é obrigatória`;
      }
      if (!horarios[i]) {
        errors[`horario${i}`] = `Horário ${i} é obrigatório`;
      }
    }
    
    // Validar comentário
    if (!comentarioValido && comentario) {
      errors.comentario = "Comentário contém palavras proibidas";
    }
    
    setFormErrors(errors);
    const isValid = Object.keys(errors).length === 0;
    setFormValid(isValid);
    return isValid;
  };

  // Função para selecionar o número de dias
  const selectDay = (days) => {
    setDiasCount(days);
    
    // Se for selecionado 4 dias, preenche automaticamente as datas
    if (days === 4) {
      setDias({
        ...dias,
        1: "21",
        2: "22",
        3: "23",
        4: "24"
      });
    }
    
    // Valida o formulário após alteração
    validateForm();
  };

  // Função para atualizar o dia específico
  const handleDiaChange = (index, value) => {
    const newDias = {
      ...dias,
      [index]: value
    };
    setDias(newDias);
    
    // Valida o formulário após alteração
    validateForm();
  };

  // Função para selecionar horário
  const selectHorario = (index, value) => {
    const newHorarios = {
      ...horarios,
      [index]: value
    };
    setHorarios(newHorarios);
    
    // Valida o formulário após alteração
    validateForm();
  };
  
  // Função para lidar com alterações de nome
  const handleNomeChange = (e) => {
    setNome(e.target.value);
    validateForm();
  };
  
  // Função para lidar com alterações de contacto
  const handleContactoChange = (e) => {
    setContacto(e.target.value);
    validateForm();
  };
  
  // Função para lidar com alterações de comentário
  const handleComentarioChange = (e) => {
    const newComentario = e.target.value;
    setComentario(newComentario);
    validateComment(newComentario);
    validateForm();
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Exibir popup de agradecimento
    setShowThankYou(true);
  };

  return (
    <div className="container">
      <Header />
      <Navigation />
      
      {showThankYou ? (
        <div className="thank-you-popup">
          <div className="popup-content">
            <h2>Obrigado {nome} pela sua inscrição!</h2>
            <p>Em breve será contactado pela organização do festival.</p>
            <p>Estamos ansiosos para ter você no nosso time de voluntários!</p>
            <button onClick={() => navigate("/")}>Voltar à Página Inicial</button>
          </div>
        </div>
      ) : (
        <article>
          <section>
            <h2>Formulário de Candidatura a Voluntário</h2>
            <div className="form-intro">
              <p>Junte-se à equipe de voluntários do Festival Vilar de Mouros 2025! Preencha o formulário abaixo 
              para se candidatar e fazer parte deste evento incrível.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Informações Pessoais</h3>
                <div className="form-field">
                  <label htmlFor="nome">Nome Completo:</label>
                  <input 
                    type="text" 
                    id="nome" 
                    name="nome" 
                    value={nome}
                    onChange={handleNomeChange}
                    className={formErrors.nome ? "error" : ""}
                    required 
                  />
                  {formErrors.nome && <span className="error-message">{formErrors.nome}</span>}
                </div>
                
                <div className="form-field">
                  <label htmlFor="contacto">Contacto (Telefone):</label>
                  <input 
                    type="tel" 
                    id="contacto" 
                    name="contacto" 
                    pattern="[0-9]+" 
                    value={contacto}
                    onChange={handleContactoChange}
                    className={formErrors.contacto ? "error" : ""}
                    required 
                  />
                  {formErrors.contacto && <span className="error-message">{formErrors.contacto}</span>}
                </div>
              </div>
              
              <div className="form-section">
                <h3>Disponibilidade</h3>
                <div className="days-selector">
                  <p>Selecione quantos dias pode estar presente:</p>
                  <div className="days-buttons">
                    {[1, 2, 3, 4].map((dayCount) => (
                      <button
                        key={dayCount}
                        type="button"
                        className={`day-button ${diasCount === dayCount ? 'active' : ''}`}
                        onClick={() => selectDay(dayCount)}
                      >
                        {dayCount} {dayCount === 1 ? 'dia' : 'dias'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="days-container">
                  {Array.from({ length: diasCount }, (_, i) => i + 1).map((dayIndex) => (
                    <div className="dayGroup" key={dayIndex}>
                      <div className="day-header">
                        <span className="day-number">{dayIndex}</span>
                        <h4>Dia {dayIndex}</h4>
                      </div>
                      
                      <div className="form-field">
                        <label htmlFor={`dias${dayIndex}`}>Data:</label>
                        <select 
                          id={`dias${dayIndex}`} 
                          name={`dias${dayIndex}`} 
                          value={dias[dayIndex]}
                          onChange={(e) => handleDiaChange(dayIndex, e.target.value)}
                          className={formErrors[`dia${dayIndex}`] ? "error" : ""}
                          required={dayIndex <= diasCount}
                        >
                          <option value="">Selecione um dia</option>
                          <option value="21">21 de Julho (Quinta-feira)</option>
                          <option value="22">22 de Julho (Sexta-feira)</option>
                          <option value="23">23 de Julho (Sábado)</option>
                          <option value="24">24 de Julho (Domingo)</option>
                        </select>
                        {formErrors[`dia${dayIndex}`] && <span className="error-message">{formErrors[`dia${dayIndex}`]}</span>}
                      </div>
                      
                      <div className="form-field">
                        <label>Horário de Preferência:</label>
                        <div className="horario-buttons" data-group={dayIndex}>
                          {["O dia todo", "Tarde", "Noite"].map((timeOption) => (
                            <button
                              key={timeOption}
                              type="button"
                              className={`horario-button ${horarios[dayIndex] === timeOption ? 'active' : ''}`}
                              onClick={() => selectHorario(dayIndex, timeOption)}
                            >
                              {timeOption}
                            </button>
                          ))}
                        </div>
                        {formErrors[`horario${dayIndex}`] && <span className="error-message">{formErrors[`horario${dayIndex}`]}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-section">
                <h3>Comentários Adicionais:</h3>
                <div className="form-field">
                  <textarea 
                    rows="4" 
                    name="comentario" 
                    value={comentario}
                    onChange={handleComentarioChange}
                    className={!comentarioValido ? "error" : ""}
                  ></textarea>
                  {comentarioMsg && (
                    <span className={comentarioValido ? "success-message" : "error-message"}>
                      {comentarioMsg}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={!formValid}
                >
                  Enviar Inscrição
                </button>
              </div>
            </form>
          </section>
        </article>
      )}
      
      <Footer />
    </div>
  );
}

export default FormVoluntario; 