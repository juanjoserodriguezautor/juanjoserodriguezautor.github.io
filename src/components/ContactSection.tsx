import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ArrowRight, Instagram, MessageSquare, ShieldCheck } from 'lucide-react';
import { AUTHOR_INFO } from '../data/authorData';
import { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const validateForm = (): string | null => {
    const cleanName = formData.nombre.trim();
    const cleanEmail = formData.email.trim();
    const cleanMessage = formData.mensaje.trim();

    if (cleanName.length < 2) {
      return 'Por favor, introduce tu nombre completo.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return 'Por favor, introduce una dirección de correo electrónico válida.';
    }
    if (cleanMessage.length < 10) {
      return 'Por favor, escribe un mensaje de al menos 10 caracteres.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam Honeypot check
    if (honeypot) {
      setStatus('success');
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setStatus('error');
      setErrorMessage(validationError);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(AUTHOR_INFO.socials.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre.trim(),
          email: formData.email.trim(),
          subject: formData.asunto.trim() || 'Mensaje desde la web de autor',
          message: formData.mensaje.trim(),
          _gotcha: honeypot,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      } else {
        setStatus('error');
        setErrorMessage(
          'Hubo un problema al procesar el envío. Por favor, inténtalo de nuevo o contáctame por redes sociales.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Error de conexión al enviar el mensaje. Por favor, comprueba tu conexión o contáctame por redes sociales.'
      );
    }
  };

  return (
    <section
      id="contacto"
      aria-label="Contacto y redes sociales"
      className="py-20 md:py-28 bg-[#141210] text-[#F7F3EB] relative border-b border-black scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-sans-clean text-xs font-semibold tracking-[0.35em] text-[#C4501E] uppercase">
            Contacto Editorial & Lectores
          </span>
          <div className="h-px bg-[#F7F3EB]/20 flex-1 max-w-xs" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Intro & Accessible Form */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-editorial italic text-4xl sm:text-5xl text-[#F7F3EB] font-light leading-tight">
              ¿Tienes algo que decirme? Escríbeme.
            </h2>

            <p className="font-body-sans text-sm sm:text-base text-[#F7F3EB]/80 leading-relaxed max-w-xl font-light">
              Para cualquier consulta editorial, entrevistas, presentaciones o simplemente para compartir tus impresiones tras leer alguna de mis novelas.
            </p>

            {/* Form State Handling */}
            {status === 'success' ? (
              <div
                id="form-success-card"
                className="bg-[#1F1C18] border border-[#8B2E12]/50 p-8 rounded-lg text-center space-y-4 animate-fade-in"
              >
                <div className="w-12 h-12 rounded-full bg-[#8B2E12]/30 text-[#C4501E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl text-[#F7F3EB] font-normal">
                  ¡Mensaje enviado con éxito!
                </h3>
                <p className="font-body-sans text-sm text-[#F7F3EB]/70 max-w-md mx-auto">
                  Gracias por ponerte en contacto. He recibido tu mensaje y te responderé lo antes posible.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] text-xs font-sans-clean uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                id="author-contact-form"
                onSubmit={handleSubmit}
                className="space-y-5 pt-2"
                noValidate
              >
                {/* Honeypot anti-bot oculto */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-gotcha">No rellenar este campo</label>
                  <input
                    id="contact-gotcha"
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 p-3.5 bg-red-950/50 border border-red-500/40 rounded-xs text-red-200 text-xs font-body-sans animate-fade-in"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#C4501E]" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nombre Input */}
                  <div>
                    <label
                      htmlFor="contact-nombre"
                      className="block font-sans-clean text-xs font-medium uppercase tracking-wider text-[#F7F3EB]/90 mb-1.5"
                    >
                      Nombre <span className="text-[#C4501E]">*</span>
                    </label>
                    <input
                      id="contact-nombre"
                      type="text"
                      name="nombre"
                      maxLength={100}
                      autoComplete="name"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Ej. Carlos Márquez"
                      className="w-full px-4 py-3 bg-white/[0.07] border border-white/20 rounded-xs text-[#F7F3EB] font-body-sans text-sm focus:outline-none focus:border-[#C4501E] focus:ring-1 focus:ring-[#C4501E] transition-colors placeholder:text-white/35"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-sans-clean text-xs font-medium uppercase tracking-wider text-[#F7F3EB]/90 mb-1.5"
                    >
                      Correo electrónico <span className="text-[#C4501E]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      maxLength={120}
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tuemail@ejemplo.com"
                      className="w-full px-4 py-3 bg-white/[0.07] border border-white/20 rounded-xs text-[#F7F3EB] font-body-sans text-sm focus:outline-none focus:border-[#C4501E] focus:ring-1 focus:ring-[#C4501E] transition-colors placeholder:text-white/35"
                    />
                  </div>
                </div>

                {/* Asunto Input */}
                <div>
                  <label
                    htmlFor="contact-asunto"
                    className="block font-sans-clean text-xs font-medium uppercase tracking-wider text-[#F7F3EB]/90 mb-1.5"
                  >
                    Asunto <span className="text-white/40 text-[10px]">(Opcional)</span>
                  </label>
                  <input
                    id="contact-asunto"
                    type="text"
                    name="asunto"
                    maxLength={150}
                    value={formData.asunto}
                    onChange={handleChange}
                    placeholder="Ej. Impresiones sobre El Diario del Apocalipsis / Consulta editorial"
                    className="w-full px-4 py-3 bg-white/[0.07] border border-white/20 rounded-xs text-[#F7F3EB] font-body-sans text-sm focus:outline-none focus:border-[#C4501E] focus:ring-1 focus:ring-[#C4501E] transition-colors placeholder:text-white/35"
                  />
                </div>

                {/* Mensaje Textarea */}
                <div>
                  <label
                    htmlFor="contact-mensaje"
                    className="block font-sans-clean text-xs font-medium uppercase tracking-wider text-[#F7F3EB]/90 mb-1.5"
                  >
                    Mensaje <span className="text-[#C4501E]">*</span>
                  </label>
                  <textarea
                    id="contact-mensaje"
                    name="mensaje"
                    maxLength={2500}
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Escribe tu mensaje, consulta o comentario aquí..."
                    className="w-full px-4 py-3 bg-white/[0.07] border border-white/20 rounded-xs text-[#F7F3EB] font-body-sans text-sm focus:outline-none focus:border-[#C4501E] focus:ring-1 focus:ring-[#C4501E] transition-colors placeholder:text-white/35 resize-y"
                  />
                </div>

                {/* Submit Button & Privacy Note */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#8B2E12] hover:bg-[#A63816] text-[#F7F3EB] font-sans-clean text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando mensaje...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar mensaje</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <span className="inline-flex items-center gap-1.5 text-[11px] font-body-sans text-[#F7F3EB]/50">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C4501E]" />
                    <span>Envío cifrado · Tus datos no se comparten con terceros</span>
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Social Media & Community */}
          <div className="lg:col-span-5 space-y-8 lg:pl-4">
            <div>
              <p className="font-sans-clean text-xs font-semibold tracking-[0.3em] uppercase text-[#F7F3EB]/70 mb-6">
                Sígueme en Redes Oficiales
              </p>

              <div className="space-y-4">
                {/* Instagram Link */}
                <a
                  id="social-link-instagram"
                  href={AUTHOR_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#C4501E]/50 rounded-md transition-all duration-200"
                  aria-label="Seguir a Juan José Rodríguez en Instagram (se abre en nueva pestaña)"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#F7F3EB] group-hover:border-[#C4501E] group-hover:text-[#C4501E] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-sans-clean text-xs font-medium tracking-wider uppercase text-[#F7F3EB] group-hover:text-[#C4501E] transition-colors">
                        Instagram
                      </p>
                      <p className="font-body-sans text-xs text-[#F7F3EB]/60">
                        @juanjo.autor
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#C4501E] group-hover:translate-x-1 transition-all" />
                </a>

                {/* X / Twitter Link */}
                <a
                  id="social-link-x"
                  href={AUTHOR_INFO.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#C4501E]/50 rounded-md transition-all duration-200"
                  aria-label="Seguir a Juan José Rodríguez en X / Twitter (se abre en nueva pestaña)"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#F7F3EB] group-hover:border-[#C4501E] group-hover:text-[#C4501E] transition-colors font-sans-clean font-bold text-xs">
                      𝕏
                    </div>
                    <div>
                      <p className="font-sans-clean text-xs font-medium tracking-wider uppercase text-[#F7F3EB] group-hover:text-[#C4501E] transition-colors">
                        X / Twitter
                      </p>
                      <p className="font-body-sans text-xs text-[#F7F3EB]/60">
                        @Juanjoautor
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#C4501E] group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>

            {/* Additional note for readers */}
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-md space-y-2">
              <div className="flex items-center gap-2 text-xs font-sans-clean text-[#C4501E] uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Club de Lectura y Reseñas</span>
              </div>
              <p className="font-editorial italic text-sm text-[#F7F3EB]/75 leading-relaxed">
                Si has leído alguna de mis obras y quieres dejar tu valoración en Amazon o compartir tu reseña en redes sociales, ¡me encantará leerte! Cada opinión ayuda enormemente a que nuevas historias sigan viendo la luz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
