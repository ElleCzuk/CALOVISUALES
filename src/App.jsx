import React, { useState } from 'react';

const colors = {
  terracota: '#8E281A',
  cobre: '#D77B5C',
  texto: '#F2F2F2',
  bordeCristal: 'rgba(255, 255, 255, 0.15)',
  whatsappGreen: '#25D366',
  negroObturador: '#050505',
};

const packsData = [
  { title: "Fotos", items: ["Sesión corporativa", "Material original", "Retoque profesional"], highlight: true },
  { title: "Fotos + Video", items: ["Fotos alta calidad", "Video (UGC/Reels)", "Edición redes"], highlight: true },
  { title: "Fotos + Web", items: ["Sesión completa", "Web profesional", "Identidad visual"], highlight: true },
  { title: "Exclusivo", items: ["Pack audiovisual", "Diseño de marca", "Estrategia visual"], isPremium: true, highlight: true },
  { title: "Social Media", items: ["Gestión de redes", "Packs de contenido", "Métricas"], highlight: true },
];

const SlideContent = ({ data }) => {
  const isExclusivo = data.title.toLowerCase() === "exclusivo";

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', width: '100%',
      backgroundColor: data.highlight ? 'rgba(215, 123, 92, 0.25)' : 'rgba(0, 0, 0, 0.85)',
      textAlign: 'center', padding: '30px', boxSizing: 'border-box',
      position: 'relative',
      // Añadimos un borde más brillante si es el resaltado
      border: isExclusivo ? `2px solid ${colors.cobre}` : 'none',
      borderRadius: '60px'
    }}>
      
      
      

      <div style={{ width: '100%', marginTop: 'auto', marginBottom: 'auto' }}>
        <h4 style={{ 
          color: colors.cobre, 
          fontFamily: "'Great Vibes', cursive",
          fontSize: '55px', 
          fontWeight: 400, 
          textTransform: 'none', 
          letterSpacing: '0', 
          margin: '0 0 5px 0',
          lineHeight: 1,
        }}>{data.title}</h4>

        <div style={{ 
          height: '1px', 
          width: '40px', 
          backgroundColor: colors.cobre, 
          margin: '15px auto', 
          opacity: 0.8 
        }}></div>
        
        <ul style={{ 
          listStyle: 'none', padding: 0, margin: 0, 
          fontSize: '16px', // Bajamos un poco para que respire
          lineHeight: '2', 
          fontWeight: 400, 
          color: '#fff', 
          letterSpacing: '0.15em',
          fontFamily: 'sans-serif' 
        }}>
          {data.items.map((item, i) => (
            <li key={i} style={{ marginBottom: '5px' }}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const avanzarSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % packsData.length);
  };

  const getSlideStyle = (index) => {
    const total = packsData.length;
    const diff = (index - currentSlide + total) % total;
    let opacity = 0;
    let transform = 'scale(0.8) translateX(0)';
    let zIndex = 0;

    if (diff === 0) {
      opacity = 1; transform = 'scale(1) translateX(0)'; zIndex = 30;
    } else if (diff === 1) {
      opacity = 0.2; transform = 'scale(0.8) translateX(380px)'; zIndex = 10;
    } else if (diff === total - 1) {
      opacity = 0.2; transform = 'scale(0.8) translateX(-380px)'; zIndex = 10;
    }

    return {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      opacity, transform, zIndex, transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    };
  };

  return (
    <div style={{ backgroundColor: colors.terracota, minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        /* ANIMACIÓN DE MOVIMIENTO INFINITO */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes aparecerYPalpitar {
          0% { opacity: 0; transform: translateX(10px) scale(0.8); }
          10% { opacity: 1; transform: translateX(0px) scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        * { box-sizing: border-box; }
      `}</style>
{/* BANNER EN MOVIMIENTO */}
<div style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        backgroundColor: colors.terracota, color: '#fff',
        zIndex: 2000, overflow: 'hidden', height: '40px',
        display: 'flex', alignItems: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          animation: 'marquee 20s linear infinite', // Velocidad del banner
          willChange: 'transform'
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', paddingRight: '60px' }}>
              <span style={{ fontSize: '13px', letterSpacing: '0.1em', fontWeight: 500 }}>
                <span style={{ opacity: 0.7 }}>PROMO LANZAMIENTO:</span> USA EL CUPÓN 
                <strong style={{ 
                  border: '1px dashed #fff', padding: '2px 10px', 
                  margin: '0 10px', borderRadius: '4px', color: '#fff' 
                }}>CALOTÍPICO</strong> 
                Y OBTENÉ UN <strong style={{ color: colors.cobre }}>15% OFF</strong> EN TU PRIMER PACK •
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* FONDO */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <div style={{ 
          position: 'absolute', width: '100%', height: '100%', 
          backgroundImage: 'url("/src/assets/Diseño sin título (9).jpg")', 
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 
        }}></div>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'screen', opacity: 0.4 }}>
          <source src="https://res.cloudinary.com/dsyfitywd/video/upload/q_auto,f_auto/showreel_spzmjq.mp4" type="video/mp4" />
        </video>
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10, paddingTop: '100px' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{ letterSpacing: '0.6em', fontSize: '11px', marginBottom: '25px', opacity: 0.8, fontWeight: 700, color: 'white' }}>
            ATRAVESÁ EL RUIDO. DESTACÁ. ANTICIPATE.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: 'clamp(45px, 9vw, 85px)', fontWeight: 1000, margin: 0, lineHeight: 0.8,  color: colors.blanco }}>ESTO ES</h1>
            <div style={{ width: 'clamp(180px, 60vw, 520px)', marginTop: 'calc(-30px - 4vw)', marginBottom: 'calc( 200px - 2vw)' }}>
                <img src="/src/assets/Diseno_sin_titulo.png" alt="CALO VISUALES" style={{ width: '100%' }} />
            </div>
          </div>
        </header>

        <section style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '320px', height: '320px' }}>
            {packsData.map((pack, index) => (
              <div key={index} style={getSlideStyle(index)}>
                <div style={{
                  width: '100%', height: '100%', 
                  border: `1px solid ${colors.bordeCristal}`,
                  borderRadius: '60px', overflow: 'hidden', position: 'relative',
                  backdropFilter: 'blur(10px)'
                }}>
                  <SlideContent data={pack} />
                </div>
              </div>
            ))}
          </div>

          <button onClick={avanzarSlide} style={{
            position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
            width: '60px', height: '100px', backgroundColor: colors.cobre, border: 'none', 
            borderRadius: '15px 40px 40px 15px', cursor: 'pointer', zIndex: 100,
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style={{ transform: 'rotate(90deg)' }}>
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
        </section>

        <footer style={{ textAlign: 'center', marginTop: '60px', paddingBottom: '100px' }}>
            <p style={{ fontSize: 'clamp(20px, 5vw, 45px)', fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', color: 'white' }}>
              SOMOS TU EQUIPO DE CONTENIDO
            </p>
        </footer>
      </main>

      <a href="https://wa.me/5491100000000" target="_blank" rel="noreferrer" style={{ 
        position: 'fixed', bottom: '30px', right: '30px', display: 'flex', 
        alignItems: 'center', gap: '15px', textDecoration: 'none', zIndex: 9999 
      }}>
        <span style={{ 
          color: 'white', fontWeight: 700, fontSize: '11px', backgroundColor: colors.cobre, 
          padding: '10px 20px', borderRadius: '20px 20px 0px 20px', textTransform: 'uppercase',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)', letterSpacing: '0.1em',
          animation: 'aparecerYPalpitar 1.5s ease-out 1s both' 
        }}>Escribinos</span>
        <div style={{ 
          width: '55px', height: '55px', backgroundColor: colors.whatsappGreen, 
          borderRadius: '50%', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' 
        }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.512-2.96-2.626-.087-.115-.708-.941-.708-1.795 0-.853.448-1.273.607-1.441.159-.169.346-.211.462-.211.115 0 .23 0 .331.005.106.005.249-.04.39.298.144.347.491 1.197.534 1.285.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.777 1.394.864.174.087.275.072.376-.043s.433-.505.548-.678c.115-.173.231-.144.39-.087.159.058 1.011.477 1.184.564.173.087.289.129.331.202.044.073.044.419-.1.824z" />
            </svg>
        </div>
      </a>
    </div>
  );
}
