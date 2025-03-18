import React, { useState, useEffect, useCallback } from 'react';
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
  const validateComment = useCallback((text) => {
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
  }, []);

  // Função para validar o formulário completo
  const validateForm = useCallback(() => {
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
    setFormValid(Object.keys(errors).length === 0);
  }, [nome, contacto, diasCount, dias, horarios, comentarioValido, comentario]);

  // Efeito para validar o formulário completo
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Efeito para validar comentário em tempo real
  useEffect(() => {
    if (comentario) {
      validateComment(comentario);
    }
  }, [comentario, validateComment]);

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
  };

  // Função para atualizar o dia específico
  const handleDiaChange = (index, value) => {
    setDias({
      ...dias,
      [index]: value
    });
  };

  // Função para selecionar horário
  const selectHorario = (index, value) => {
    setHorarios({
      ...horarios,
      [index]: value
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formValid) {
      // Destacar todos os erros
      validateForm();
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
                    onChange={(e) => setNome(e.target.value)}
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
                    onChange={(e) => setContacto(e.target.value)}
                    className={formErrors.contacto ? "error" : ""}
                    required 
                  />
                  {formErrors.contacto && <span className="error-message">{formErrors.contacto}</span>}
                </div>
              </div>
              
              <div className="form-section">
                <h3>Disponibilidade</h3>
                <p>
                  <label>Quantos dias você pode participar?</label>
                </p>
                <div className="day-buttons">
                  {[1, 2, 3, 4].map((day) => (
                    <button
                      key={day}
                      type="button"
                      className={`day-button ${diasCount === day ? 'active' : ''}`}
                      onClick={() => selectDay(day)}
                    >
                      {day} {day === 1 ? 'Dia' : 'Dias'}
                    </button>
                  ))}
                </div>
                
                {/* Grupos de data/hora */}
                <div id="daysContainer">
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
                <h3>Comentários Adicionais</h3>
                <div className="form-field">
                  <label htmlFor="comentario">Conte-nos um pouco sobre suas experiências anteriores ou por que deseja ser voluntário:</label>
                  <textarea 
                    id="comentario" 
                    name="comentario" 
                    rows="4" 
                    cols="50"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className={!comentarioValido ? "error" : ""}
                  ></textarea>
                  <span id="comentarioMsg" className={comentarioValido ? "valid" : "invalid"}>
                    {comentarioMsg}
                  </span>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  disabled={!formValid}
                >
                  Submeter Candidatura
                </button>
                {!formValid && <p className="form-error-summary">Por favor, corrija os erros antes de submeter.</p>}
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