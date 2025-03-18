import React from 'react';
import { useNavigate } from 'react-router-dom';

function SimpleHome() {
  const navigate = useNavigate();
  
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <header style={{ 
        backgroundColor: '#ff6f61', 
        padding: '20px', 
        borderRadius: '8px 8px 0 0',
        color: 'white',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h1>Festival Vilar de Mouros 2025</h1>
      </header>
      
      <main>
        <h2 style={{ color: '#ff6f61', textAlign: 'center' }}>Bem-vindo ao site do Festival!</h2>
        <p style={{ textAlign: 'center' }}>
          O maior festival de música de Portugal está de volta em 2025.
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          margin: '30px 0' 
        }}>
          <button 
            onClick={() => navigate('/voluntario')}
            style={{
              backgroundColor: '#ff6f61',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Inscreva-se como Voluntário
          </button>
        </div>
      </main>
      
      <footer style={{ 
        backgroundColor: '#ff6f61', 
        padding: '15px', 
        borderRadius: '0 0 8px 8px',
        color: 'white',
        textAlign: 'center',
        marginTop: '20px'
      }}>
        <p>Contactos: Email: info@vilardemouros.com | Telefone: 1234-5678</p>
        <p>&copy; 2025 Festival Vilar de Mouros. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default SimpleHome; 