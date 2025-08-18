import React, { useState, useEffect } from 'react';
// Importando os ícones que vamos usar da biblioteca 'react-icons'
import {
  FaWhatsapp, FaBuilding, FaFileInvoiceDollar, FaRss, FaEnvelope, FaSignOutAlt,
  FaShareAlt, FaTimes, FaLink, FaFacebook, FaLinkedin, FaSnapchatGhost
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { RiMessengerLine } from "react-icons/ri";
import './App.css';

// --- DADOS DA PÁGINA ---
// Altere aqui para personalizar o conteúdo do seu site.
const pageData = {
  profile: {
    logo: 'https://placehold.co/100x100/333333/FFFFFF?text=AD',
    title: 'AR contabilidade',
    subtitle: 'Toque no link desejado para iniciar o seu atendimento!',
  },
  shareCard: { // Dados para o card de compartilhamento
    image: 'https://placehold.co/200x200/1E1E1E/FFFFFF?text=AR', // Imagem do card
    title: 'AR Assessoria Contábil',
    url: 'wa.me/55...',
    accountType: 'Business Account'
  },
  sections: [
    {
      title: 'PARA O MICRO EMPREENDEDOR',
      links: [
        { title: 'PROMOÇÃO 50%OFF NA ASSESSORIA AO MEI', url: '#', icon: <FaWhatsapp /> },
        { title: 'SOU MEI E PRECISO DE UM CONTADOR', url: '#', icon: <FaWhatsapp /> },
      ],
    },
    {
      title: 'ASSESSORIA CONTÁBIL É AQUI',
      links: [
        { title: 'DESENQUADRAMENTO SIMPLES', url: '#', icon: <FaSignOutAlt /> },
        { title: 'ABERTURA DE EMPRESA', url: '#', icon: <FaBuilding /> },
        { title: 'IMPOSTO DE RENDA', url: '#', icon: <FaFileInvoiceDollar /> },
      ],
    },
    {
      title: 'FIQUE POR DENTRO!',
      links: [
         { title: 'FIQUE POR DENTRO!', url: '#', icon: <FaRss /> },
         { title: 'SAC', url: '#', icon: <FaEnvelope /> },
      ]
    }
  ],
};
// --- FIM DOS DADOS ---

// Componente do Modal de Compartilhamento
const ShareModal = ({ isOpen, onClose, cardData }) => {
  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copiado para a área de transferência!"); // Em um app real, usaríamos um toast/snackbar
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Share link</h3>
          <button onClick={onClose} className="close-button"><FaTimes /></button>
        </div>
        
        <div className="share-card">
          <img src={cardData.image} alt={cardData.title} className="share-card-image" />
          <div className="share-card-info">
            <h4>{cardData.title}</h4>
            <p className="share-card-url">{cardData.url}</p>
            <p className="share-card-account">{cardData.accountType}</p>
          </div>
        </div>

        <div className="social-share-buttons">
          <div className="social-icon-wrapper" onClick={copyToClipboard}>
            <div className="social-icon" style={{backgroundColor: '#f0f0f0'}}><FaLink style={{color: '#333'}}/></div>
            <span>Copy link</span>
          </div>
          <div className="social-icon-wrapper">
            <div className="social-icon" style={{backgroundColor: '#000'}}><FaXTwitter /></div>
            <span>X</span>
          </div>
          <div className="social-icon-wrapper">
            <div className="social-icon" style={{backgroundColor: '#1877F2'}}><FaFacebook /></div>
            <span>Facebook</span>
          </div>
           <div className="social-icon-wrapper">
            <div className="social-icon" style={{backgroundColor: '#25D366'}}><FaWhatsapp /></div>
            <span>WhatsApp</span>
          </div>
          <div className="social-icon-wrapper">
            <div className="social-icon" style={{backgroundColor: '#0A66C2'}}><FaLinkedin /></div>
            <span>LinkedIn</span>
          </div>
          <div className="social-icon-wrapper">
            <div className="social-icon" style={{backgroundColor: '#00B2FF'}}><RiMessengerLine /></div>
            <span>Messenger</span>
          </div>
          <div className="social-icon-wrapper">
            <div className="social-icon" style={{backgroundColor: '#FFFC00'}}><FaSnapchatGhost style={{color: '#000'}}/></div>
            <span>Snap</span>
          </div>
        </div>

        <div className="modal-footer">
          
        </div>
      </div>
    </div>
  );
};


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Efeito para travar o scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  return (
    <>
      <ShareModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        cardData={pageData.shareCard}
      />
      <div className="background">
        <div className="link-container">
          
          {/* Botão de compartilhar no topo */}
          <button className="share-button-top" onClick={() => setIsModalOpen(true)}>
            <FaShareAlt />
          </button>
          
          <header className="header">
            <img src={pageData.profile.logo} alt="Logo" className="logo" />
            <h1 className="title">{pageData.profile.title}</h1>
            <p className="subtitle">{pageData.profile.subtitle}</p>
          </header>
          
          <main>
            {pageData.sections.map((section, index) => (
              <section key={index} className="link-section">
                <h2 className="section-title">{section.title}</h2>
                <div className="links-list">
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={section.title === 'PARA O MICRO EMPREENDEDOR' ? 'link-button-special' : 'link-button-icon'}
                    >
                      <div className="link-icon">{link.icon}</div>
                      <span className="link-title">{link.title}</span>
                      <div className="arrow-icon">›</div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </main>

        </div>
      </div>
    </>
  );
}

export default App;