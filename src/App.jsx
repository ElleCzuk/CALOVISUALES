import React, { useState, useEffect } from 'react';

// ASSETS FÍSICOS COMPROBADOS
import logoCalo from './assets/CALOLOGO.png'; 
import texturaFondo from './assets/textura.jpg';
import fotoElle from './assets/elle.png'; 
import fotoMayra from './assets/mayra.png'; 
import VideoPlayer from './VideoPlayer';

// VIDEO REEL
const videoShowreel = "https://res.cloudinary.com/dsyfitywd/video/upload/q_auto,f_auto/showreel_1_flz8i7.mp4";

const colors = {
  terracota: '#8C3D2B',
  terracotaOscuro: '#5A2318',
  marqueeBg: '#702D1F',
  negroProfundo: '#0B0504',
  texto: '#FFFFFF',
};

export default function App() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const windowHeight = window.innerHeight || 800;
  
  // Progreso del viaje del logo
  const progressLogo = Math.min(scrollY / (windowHeight * 0.75), 1);
  const logoScale = 1 - progressLogo * 0.18; 
  const logoTranslateX = progressLogo * -28; 

  // Lógica de luces dinámicas continuas basadas en la posición del scroll actual
  // Evitamos que las luces se corten por sección: ahora se mueven fluidamente por la pantalla
  const luzFondoY = (scrollY % (windowHeight * 2)) / 2;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundColor: colors.negroProfundo, minHeight: '100vh', color: colors.texto, fontFamily: "'Raleway', sans-serif", overflowX: 'hidden' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;800&family=Raleway:wght@200;300;400;500;600;700&display=swap');
        
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; background-color: ${colors.negroProfundo}; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: ${colors.marqueeBg};
          z-index: 1000;
          height: 44px;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .marquee-content {
          display: flex;
          white-space: nowrap;
          animation: marquee 35s linear infinite;
        }

        .marquee-item {
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          padding-right: 70px;
          text-transform: uppercase;
          opacity: 0.9;
        }

        /* Tabla de servicios limpia */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0px 40px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }

        .service-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 26px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          text-decoration: none;
          color: white;
          transition: all 0.3s ease;
        }

        .service-row:hover {
          opacity: 0.75;
          padding-left: 8px;
        }

        /* Botón de flecha ultra-estilizado y sutil (11.jpg) */
        .arrow-btn-sutil {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.25);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          background: transparent;
          color: #fff;
        }

        .service-row:hover .arrow-btn-sutil {
          border-color: rgba(255, 255, 255, 0.9);
          background: rgba(255,255,255,0.08);
          transform: scale(1.05);
        }

        .arrow-icon {
          width: 13px;
          height: 13px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.3;
        }

        /* Módulos horizontales sin cortes de fondo */
        .modulo-section {
          height: 75vh;
          width: 100%;
          display: flex;
          position: relative;
          box-sizing: border-box;
          scroll-margin-top: 44px;
          overflow: hidden;
          background: transparent; /* Fondo transparente para heredar el lienzo continuo posterior */
        }

        .modulo-left {
          width: 45%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 5% 0 10%;
          z-index: 10;
          box-sizing: border-box;
        }

        .modulo-right {
          width: 55%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          box-sizing: border-box;
        }

        .mockup-base {
          width: 265px;
          height: 530px;
          background-color: #000;
          border-radius: 40px;
          border: 4px solid rgba(255,255,255,0.12);
          overflow: hidden;
          box-shadow: -25px 35px 65px rgba(0,0,0,0.85);
          position: absolute;
          transition: transform 0.4s ease;
        }

        .hilo-separador {
          width: 40px;
          height: 1px;
          background-color: rgba(255,255,255,0.25);
          margin-bottom: 24px;
        }
        
        @media (max-width: 768px) {
          .modulo-section {
            flex-direction: column;
            height: auto; /* Permite que la sección crezca según el contenido */
            padding: 40px 20px;
            .text-center-mobile {
              text-align: center !important;
            }
          }
          .modulo-left, .modulo-right {
            width: 100% !important; /* Ocupan todo el ancho */
            padding: 0 !important;
          }
          .mockup-base {
            position: relative; /* Cambia de posición absoluta a relativa */
            margin: 20px auto;
          }
        }
        
      `}</style>

      {/* ================= LIENZO DE FÓNDO CINEMATOGRÁFICO UNIFICADO (Intervención técnica para fondo de video) ================= */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundColor: colors.negroProfundo, overflow: 'hidden' }}>
 
<div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
  {/* Video de fondo con textura encima */}
  <video 
    src={videoShowreel} autoPlay loop muted playsInline 
    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} 
  />
  <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${texturaFondo})`, opacity: 0.2, mixBlendMode: 'overlay' }}></div>
</div>
        {/* TEXTURA ORGÁNICA PERSISTENTE: Sube un nivel de z-index y ajusta opacidad para fundirse con el video */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${texturaFondo})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, mixBlendMode: 'overlay', zIndex: 2 }}></div>
        
        {/* LUZ DINÁMICA AMBIENTAL 1: Mantiene su lógica y sube z-index */}
        <div style={{ 
          position: 'absolute', 
          width: '80vw', 
          height: '80vw', 
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.terracotaOscuro} 0%, rgba(11,5,4,0) 70%)`,
          top: `calc(10% - ${luzFondoY}px)`,
          right: '-20vw',
          opacity: 0.45,
          zIndex: 3,
          filter: 'blur(40px)',
          transition: 'top 0.2s ease-out'
        }}></div>

        {/* LUZ DINÁMICA AMBIENTAL 2: Mantiene su lógica y sube z-index */}
        <div style={{ 
          position: 'absolute', 
          width: '75vw', 
          height: '75vw', 
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.terracota} 0%, rgba(11,5,4,0) 65%)`,
          bottom: `calc(-10% + ${luzFondoY}px)`,
          left: '-25vw',
          opacity: 0.35,
          zIndex: 3,
          filter: 'blur(50px)',
          transition: 'bottom 0.2s ease-out'
        }}></div>

        {/* VIÑETEADO OSCURO CONTINUO: Sube z-index para unificar todo */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 45%, rgba(11,5,4,0.8) 100%)', zIndex: 4 }}></div>
      </div>

      {/* ================= MARQUEE SUPERIOR FIJO ================= */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="marquee-item">
              PROMO LANZAMIENTO: USA EL CUPÓN <strong style={{ fontWeight: '700' }}>CALOTÍPICO</strong> Y OBTENÉ UN <span style={{ fontWeight: '700' }}>15% OFF</span> • 
            </span>
          ))}
        </div>
      </div>
      

      {/* Contenido de la Página */}
      <div style={{ position: 'relative', zIndex: 5, paddingTop: '44px' }}>

        {/* ================= INTRODUCCIÓN CON LUZ CENTRAL ALTA ================= */}
        <div style={{ position: 'relative', background: `radial-gradient(circle at center, rgba(140,61,43,0.35) 0%, transparent 75%)` }}>
          
          {/* PANTALLA 1: HERO (Logo Centrado + Frase Integrada) */}
          <div style={{ height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'sticky', top: '44px', zIndex: 3, pointerEvents: progressLogo > 0.8 ? 'none' : 'auto', opacity: 1 - (progressLogo * 1.5) }}>
            <div style={{ transform: `scale(${logoScale}) translateX(${logoTranslateX}vw)`, transition: 'transform 0.01s linear', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.42em', marginBottom: '0.005px', opacity: 0.9, fontWeight: 500 }}>ATRAVESÁ EL RUIDO. DESTACÁ. ANTICIPATE.</p>
              <img src={logoCalo} alt="CALO" style={{ width: '100%', maxWidth: '390px', height: 'auto' }} />
            </div>
          </div>

{/* PANTALLA 2: ¿CÓMO TE AYUDAMOS? */}
<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 60px', position: 'relative', zIndex: 2 }}>
  <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '80px', alignItems: 'center' }}>
    
    {/* --- AQUÍ APLICAMOS LA CLASE hide-mobile --- */}
    <div className="hide-mobile" style={{ opacity: progressLogo, transform: `translateX(${(1 - progressLogo) * -30}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.42em', marginBottom: '6px', opacity: 0.9, fontWeight: 500 }}>ATRAVESÁ EL RUIDO. DESTACÁ. ANTICIPATE.</p>
      <img src={logoCalo} alt="CALO" style={{ width: '100%', maxWidth: '390px', height: 'auto', }} />
      <div className="text-center-mobile" style={{ textAlign: 'left', opacity: progressLogo, transform: `translateX(${(1 - progressLogo) * 30}px)` }}>
  </div>
  </div>
    
    <div style={{ textAlign: 'left', opacity: progressLogo, transform: `translateX(${(1 - progressLogo) * 30}px)` }}>
      <p style={{ fontSize: '16px', lineHeight: '1.8', fontWeight: 300, marginBottom: '40px' }}>
        En <strong style={{ fontWeight: 700 }}>CALO</strong> transformamos ideas, servicios y conocimientos en <strong style={{ fontWeight: 700 }}>contenido audiovisual y estrategias digitales</strong> que conectan con las personas, construyen autoridad y generan oportunidades reales de negocio.
      </p>
      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', letterSpacing: '0.15em', marginBottom: '24px', fontWeight: 700 }}>¿CÓMO TE AYUDAMOS?</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px', fontWeight: 300, opacity: 0.85 }}>
        <li>• Creamos contenido que explica claramente lo que hacés.</li>
        <li>• Diseñamos estrategias que acompañan tus objetivos comerciales.</li>
        <li>• Producimos videos y piezas visuales que generan confianza.</li>
        <li>• Gestionamos tu presencia digital para que puedas enfocarte en tu negocio.</li>
      </ul>
    </div>
  </div>
</div>

          {/* INTERVENCIÓN 2: Eliminamos completamente la lógica de scroll del Showreel (centrado y escala) y su z-index alto */}
          {/* Mantenemos la sección para ocupar espacio en el scroll y transicionar suavemente a 'Somos' */}
          <div style={{ height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
            {/* Contenedor vacío o con un separador visual mínimo si se desea */}
          </div>

        </div>

        {/* ================= SECCIÓN: HOLA! SOMOS... ================= */}
        <section style={{ minHeight: '5vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '120px 40px' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '44px', fontWeight: 700, margin: '0 0 80px 0', textAlign: 'center', lineHeight: '1.1', letterSpacing: '0.02em' }}>
            HOLA!<br /><span style={{ fontSize: '40px', fontWeight: 800, color: 'rgba(255,255,255,0.75)' }}>SOMOS...</span>
          </h2>

          <div style={{ maxWidth: '950px', width: '100%', display: 'flex', flexDirection: 'column', gap: '45px' }}>
            {/* Card Elle */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '32px', padding: '40px 50px', display: 'flex', alignItems: 'center', gap: '45px', transform: 'rotate(-1deg)', maxWidth: '800px', alignSelf: 'flex-start', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
              <img src={fotoElle} alt="Elle" style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(255,255,255,0.06)' }} />
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '28px', fontWeight: 800, margin: '0 0 4px 0' }}>ELLE</h4>
                <p style={{ fontSize: '11.5px', fontWeight: 600, margin: '0 0 14px 0', color: '#D77B5C', letterSpacing: '0.02em' }}>Gestión de Proyectos | Estrategia Digital | Diseño de Producto SaaS</p>
                <p style={{ fontSize: '13.5px', fontWeight: 300, lineHeight: '1.6', opacity: 0.85, margin: 0 }}>Me especializo en el diseño de productos digitales, experiencias de usuario (UX) y estrategias de comunicación que ayudan a organizaciones y profesionales a ordenar procesos, conectar con su audiencia y crecer de manera sostenible.</p>
              </div>
            </div>

            {/* Card Mayra */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '32px', padding: '40px 50px', display: 'flex', alignItems: 'center', gap: '45px', transform: 'rotate(0.6deg)', maxWidth: '800px', alignSelf: 'flex-end', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ textAlign: 'right' }}>
                <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '28px', fontWeight: 800, margin: '0 0 4px 0' }}>MAYRA</h4>
                <p style={{ fontSize: '11.5px', fontWeight: 600, margin: '0 0 14px 0', color: '#D77B5C', letterSpacing: '0.02em' }}>Fotografía Corporativa | Gestión Comercial | Experiencia del Cliente</p>
                <p style={{ fontSize: '13.5px', fontWeight: 300, lineHeight: '1.6', opacity: 0.85, margin: 0 }}>Me especializo en fotografía comercial y desarrollo de negocios. Combino la creación de contenido visual con una fuerte orientación comercial para ayudar a marcas y profesionales a conectar con las personas adecuadas y hacer crecer sus proyectos.</p>
              </div>
              <img src={fotoMayra} alt="Mayra" style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(255,255,255,0.06)' }} />
            </div>
          </div>
        </section>

        {/* ================= NUESTROS SERVICIOS (Grilla limpia 4.jpg) ================= */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 60px' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '52px', fontWeight: 700, textAlign: 'center', marginBottom: '60px', letterSpacing: '0.02em' }}>NUESTROS SERVICIOS</h2>
          
          <div className="services-grid">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="#modulo-1" className="service-row">
                <span style={{ fontSize: '15.5px', fontWeight: 400 }}>Estrategia Digital & Productos</span>
                <div className="arrow-btn-sutil">
                  <svg className="arrow-icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </a>
              <a href="#modulo-2" className="service-row">
                <span style={{ fontSize: '15.5px', fontWeight: 400 }}>Consulta Inicial & Diagnóstico</span>
                <div className="arrow-btn-sutil">
                  <svg className="arrow-icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </a>
              <a href="#modulo-3" className="service-row">
                <span style={{ fontSize: '15.5px', fontWeight: 400 }}>Community Management</span>
                <div className="arrow-btn-sutil">
                  <svg className="arrow-icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="#modulo-4" className="service-row">
                <span style={{ fontSize: '15.5px', fontWeight: 400 }}>Producción & Edición de Contenido</span>
                <div className="arrow-btn-sutil">
                  <svg className="arrow-icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </a>
              <a href="#modulo-5" className="service-row">
                <span style={{ fontSize: '15.5px', fontWeight: 400 }}>Estrategia de Cobertura Integrada</span>
                <div className="arrow-btn-sutil">
                  <svg className="arrow-icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </a>
              <a href="#modulo-6" className="service-row">
                <span style={{ fontSize: '15.5px', fontWeight: 400 }}>Producción Avanzada con IA</span>
                <div className="arrow-btn-sutil">
                  <svg className="arrow-icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </a>
            </div>
          </div>
        </section>

{/* ================= MÓDULOS CALO VISUALES ================= */}

{/* MÓDULO 1: Estrategia Digital */}
<section id="modulo-1" className="modulo-section">
  <div className="modulo-left">
    <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '38px', fontWeight: 300, margin: '0 0 20px 0', lineHeight: '1.2' }}>Estrategia Digital &<br /><strong style={{ fontWeight: 700 }}>Productos</strong></h2>
    <div className="hilo-separador"></div>
    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0', lineHeight: '1.5' }}>¿Tenés una idea, un servicio o un negocio que necesita más estructura para crecer?</h4>
    <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: '1.6', opacity: 0.8, margin: 0 }}>Ayudamos a organizaciones y profesionales a ordenar procesos, diseñar experiencias digitales y transformar ideas complejas en soluciones claras, intuitivas y escalables.</p>
  </div>
  <div className="modulo-right">
    <div className="phone-container">
      <div className="mockup-base" style={{ zIndex: 5 }}>
        <VideoPlayer id="video-1" publicId="010101_f6rmcr" />
      </div>
    </div>
  </div>
</section>

{/* MÓDULO 2: Consulta Inicial */}
<section id="modulo-2" className="modulo-section">
  <div className="modulo-right" style={{ width: '55%' }}>
    <div className="phone-container">
      <div className="mockup-base" style={{ zIndex: 5 }}>
        <VideoPlayer id="video-2" publicId="020202_uaezpy" />
      </div>
    </div>
  </div>
  <div className="modulo-left" style={{ width: '45%', padding: '0 10% 0 3%' }}>
    <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '38px', fontWeight: 300, margin: '0 0 20px 0', lineHeight: '1.2' }}>Consulta Inicial<br /><strong style={{ fontWeight: 700 }}>& Diagnóstico</strong></h2>
    <div className="hilo-separador"></div>
    <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: '1.6', opacity: 0.8, margin: 0 }}>Analizamos tu presencia online, detectamos oportunidades de mejora y diseñamos planes de acción concretos para alinear tu comunicación con los objetivos reales de tu negocio.</p>
  </div>
</section>

{/* MÓDULO 3: Community Management */}
<section id="modulo-3" className="modulo-section">
  <div className="modulo-left">
    <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '38px', fontWeight: 300, margin: '0 0 20px 0', lineHeight: '1.2' }}>Community<br /><strong style={{ fontWeight: 700 }}>Management</strong></h2>
    <div className="hilo-separador"></div>
    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0', lineHeight: '1.5' }}>¿Te cuesta sostener una presencia activa y coherente en redes sociales?</h4>
    <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: '1.6', opacity: 0.8, margin: 0 }}>Planificamos, gestionamos y optimizamos tus canales digitales para que tu marca mantenga una comunicación profesional, consistente y perfectamente alineada con tus objetivos comerciales.</p>
  </div>
  <div className="modulo-right">
    <div className="phone-container">
      <div className="mockup-base" style={{ zIndex: 5 }}>
        <VideoPlayer id="video-3" publicId="030303_tpqiiv" />
      </div>
    </div>
  </div>
</section>

{/* MÓDULO 4: Producción & Edición */}
<section id="modulo-4" className="modulo-section">
  <div className="modulo-right" style={{ width: '55%' }}>
    <div className="phone-container">
      <div className="mockup-base" style={{ zIndex: 5 }}>
        <VideoPlayer id="video-4" publicId="010101_f6rmcr" />
      </div>
    </div>
  </div>
  <div className="modulo-left" style={{ width: '45%', padding: '0 10% 0 3%' }}>
    <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '38px', fontWeight: 300, margin: '0 0 20px 0', lineHeight: '1.2' }}>Producción &<br /><strong style={{ fontWeight: 700 }}>Edición de Contenido</strong></h2>
    <div className="hilo-separador"></div>
    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0', lineHeight: '1.5' }}>¿Sabés que tenés mucho para comunicar, pero no encontrás la forma de hacerlo atractivo?</h4>
    <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: '1.6', opacity: 0.8, margin: 0 }}>Creamos contenido audiovisual de alto impacto pensado exclusivamente para captar atención en segundos, transmitir confianza absoluta y acercar tu propuesta de valor a tus clientes ideales.</p>
  </div>
</section>

{/* MÓDULO 5: Cobertura Integrada */}
<section id="modulo-5" className="modulo-section">
  <div className="modulo-left">
    <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '38px', fontWeight: 300, margin: '0 0 20px 0', lineHeight: '1.2' }}>Estrategia de<br /><strong style={{ fontWeight: 700 }}>Cobertura Integrada</strong></h2>
    <div className="hilo-separador"></div>
    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0', lineHeight: '1.5' }}>¿Necesitás una solución completa para mantener activa la comunicación de tu empresa?</h4>
    <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: '1.6', opacity: 0.8, margin: 0 }}>Diseñamos planes completos de contenido adaptados al ritmo de tu organización. Combinamos la dirección estratégica con la gestión técnica de canales y la producción audiovisual in-situ.</p>
  </div>
  <div className="modulo-right">
    <div className="phone-container">
      <div className="mockup-base" style={{ zIndex: 5 }}>
        <VideoPlayer id="video-5" publicId="020202_uaezpy" />
      </div>
    </div>
  </div>
</section>

{/* MÓDULO 6: IA Avanzada */}
<section id="modulo-6" className="modulo-section">
  <div className="modulo-right" style={{ width: '55%' }}>
    <div className="phone-container">
      <div className="mockup-base" style={{ zIndex: 5 }}>
        <VideoPlayer id="video-6" publicId="030303_tpqiiv" />
      </div>
    </div>
  </div>
  <div className="modulo-left" style={{ width: '45%', padding: '0 10% 0 3%' }}>
    <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '38px', fontWeight: 300, margin: '0 0 20px 0', lineHeight: '1.2' }}>Producción<br /><strong style={{ fontWeight: 700 }}>Avanzada con IA</strong></h2>
    <div className="hilo-separador"></div>
    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0', lineHeight: '1.5' }}>¿Querés producir más contenido sin sacrificar calidad ni autenticidad?</h4>
    <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: '1.6', opacity: 0.8, margin: 0 }}>Incorporamos herramientas avanzadas de inteligencia artificial generativa para optimizar procesos creativos, acelerar sustancialmente los tiempos de entrega y expandir las posibilidades visuales de tu marca.</p>
  </div>
</section>
        {/* ================= FORMULARIO DE CONTACTO PREMIUM ================= */}
        <section style={{ padding: '120px 20px 100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '28px', padding: '45px 40px', maxWidth: '460px', width: '100%', boxSizing: 'border-box', boxShadow: '0 40px 90px rgba(0,0,0,0.7)' }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', fontWeight: 500, marginBottom: '35px', textAlign: 'center', letterSpacing: '0.08em' }}>SOLICITÁ TU CONSULTA <span style={{ fontWeight: 800 }}>GRATIS</span></h3>
            
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
                <label style={{ fontSize: '10px', letterSpacing: '0.12em', opacity: 0.7, fontWeight: 600 }}>NOMBRE</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} style={{ width: '100%', height: '44px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0 16px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
                <label style={{ fontSize: '10px', letterSpacing: '0.12em', opacity: 0.7, fontWeight: 600 }}>EMAIL</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', height: '44px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0 16px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
                <label style={{ fontSize: '10px', letterSpacing: '0.12em', opacity: 0.7, fontWeight: 600 }}>TELÉFONO</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} style={{ width: '100%', height: '44px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0 16px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ marginTop: '10px', height: '45px', backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em' }}>ENVIAR SOLICITUD</button>
            </form>
          </div>

          <div style={{ marginTop: '80px', fontSize: '10px', opacity: 0.25, letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} CALO VISUALES. TODOS LOS DERECHOS RESERVADOS.
          </div>
        </section>

      </div>
    </div>
  );
}