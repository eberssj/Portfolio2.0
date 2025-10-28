import React, { useState } from 'react';
import '../styles/EmailForm.css';
import emailjs from '@emailjs/browser';

const EmailForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    titulo: '',
    email: '',
    mensagem: ''
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // --- coloque aqui os seus IDs do EmailJS ---
    const SERVICE_ID = 'service_ue3gvhm';
    const TEMPLATE_ID = 'template_280305';
    const PUBLIC_KEY = 'zjnG-CtxGkYSGpUGb';
    // -------------------------------------------

    // Validação simples
    if (!formData.nome_completo || !formData.email || !formData.mensagem) {
      alert('Por favor preencha Nome, Email e Mensagem.');
      return;
    }

    setSending(true);

    // O objeto com as variáveis que o template espera
    const templateParams = {
      nome_completo: formData.nome_completo,
      titulo: formData.titulo || 'Contato via portfólio',
      email: formData.email,
      mensagem: formData.mensagem,
      to_email: 'eberssjunior12@gmail.com'
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Email enviado com sucesso!');
        setFormData({ nome_completo: '', titulo: '', email: '', mensagem: '' });
      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert('Erro ao enviar email. Veja o console para detalhes.');
      })
      .finally(() => setSending(false));
  };

  return (
    <form className="emailform-container tech" onSubmit={handleSubmit}>
      <div className="emailform-row">
        <div className="emailform-group">
          <label className="emailform-label" htmlFor="nome_completo">Nome completo</label>
          <input
            type="text"
            id="nome_completo"
            name="nome_completo"
            value={formData.nome_completo}
            onChange={handleChange}
            className="emailform-input"
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div className="emailform-group">
          <label className="emailform-label" htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="emailform-input"
            placeholder="Assunto do email"
          />
        </div>
      </div>

      <div className="emailform-group">
        <label className="emailform-label" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="emailform-input"
          placeholder="Digite seu email"
          required
        />
      </div>

      <div className="emailform-group">
        <label className="emailform-label" htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          className="emailform-textarea"
          placeholder="Escreva sua mensagem"
          required
        />
      </div>

      <button type="submit" className="emailform-button tech" disabled={sending}>
        {sending ? 'Enviando...' : 'Enviar email'}
      </button>
    </form>
  );
};

export default EmailForm;
