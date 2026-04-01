import React, { useState } from 'react';

// IMPORTACIONES CORREGIDAS
// Asegurate de que los nombres de archivo en tu carpeta assets sean EXACTAMENTE estos:
import logoCalo from './assets/Diseno_sin_titulo.png';
import texturaFondo from './assets/textura.jpg';

// Fotos del portafolio (Cambié los nombres para que coincidan con tus archivos subidos)
import foto1 from './assets/SaveClip.App_649329571_17896970712263293_1304250760004729062_n (1).jpg';
import foto2 from './assets/SaveClip.App_655028561_18106080562845906_6822093185478318846_n.jpg';
import foto3 from './assets/SaveClip.App_323882232_1341999866621087_9218846526554259555_n.jpg';
import fotoPlumas from './assets/SaveClip.App_655712457_18038450996565454_8834686866840141734_n.jpg';
import fotoPool from './assets/SaveClip.App_657753422_18114515569677649_8332308176352224921_n.jpg';

const colors = {
  terracota: '#8E281A',
  cobre: '#D77B5C',
  texto: '#F2F2F2',
  bordeCristal: 'rgba(255, 255, 255, 0.15)',
  whatsappGreen: '#25D366',
};

// Mezclamos Packs de texto con Fotos para el carrusel
const packsData = [
  { type: 'pack', title: "Fotos", items: ["Sesión corporativa", "Material original", "Retoque profesional"] },
  { type: 'image', url: foto1 },
  { type: 'pack', title: "Fotos + Video", items: ["Fotos alta calidad", "Video (UGC/Reels)", "Edición redes"] },
  { type: 'image', url: fotoPlumas },
  { type: 'pack', title: "Fotos + Web", items: ["Sesión completa", "Web profesional", "Identidad visual"] },
  { type: 'image', url: fotoPool }, 
  { type: 'pack', title: "Exclusivo", items: ["Pack audiovisual", "Diseño de marca", "Estrategia visual"] },
  { type: 'image', url: foto2 },
  { type: 'pack', title: "Social Media", items: ["Gestión de redes", "Packs de contenido", "Métricas"] },
  { type: 'image', url: foto3 },
];

const SlideContent = ({ data }) => {
  if (data.type === 'image') {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }}>
        <img 
          src={data.url} 
          alt="Portfolio CALO" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', width: '100%', backgroundColor: 'rgba(215, 123, 92, 0.25)',
      textAlign: 'center', padding: '30px', boxSizing: 'border-box', borderRadius: '60px'
    }}>
      <h4 style={{ 
        color: colors.cobre, 
        fontFamily: "'Great Vibes', cursive", 
        fontSize: '55px', 
        fontWeight: 400, // Quitamos el Bold
        margin: '0 0 10px 0',
        lineHeight: 1
      }}>{data.title}</h4>
      <div style={{ height: '1px', width: '40px', backgroundColor: colors.cobre, margin: '15px auto' }}></div>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '16px', color: '#fff', letterSpacing: '0.15em', fontFamily: 'sans-serif' }}>
        {data.items.map((item, i) => (<li key={i} style={{ marginBottom: '5px' }}>{item}</li>))}
      </ul>
    </div>
  );
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const avanzarSlide = () => setCurrentSlide((prev) => (prev + 1) % packsData.length);

  const getSlideStyle = (index) => {
    const total = packsData.length;
    const diff = (index - currentSlide + total) % total;
    let opacity = 0; let transform = 'scale(0.8)'; let zIndex = 0;
    if (diff === 0) { opacity = 1; transform = 'scale(1)'; zIndex = 30; }
    else if (diff === 1) { opacity = 0.3; transform = 'scale(0.8) translateX(320px)'; zIndex = 10; }
    else if (diff === total - 1) { opacity = 0.3; transform = 'scale(0.8) translateX(-320px)'; zIndex = 10; }
    return { position: 'absolute', width: '100%', height: '100%', opacity, transform, zIndex, transition: 'all 0.6s ease' };
  };

  return (
    <div style={{ backgroundColor: colors.terracota, minHeight: '100vh', position: 'relative', overflowX: 'hidden', color: 'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

{/* BANNER SUPERIOR */}
<div style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: colors.terracota, color: '#fff', zIndex: 2000, height: '40px', display: 'flex', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 20s linear infinite' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', paddingRight: '60px' }}>
              <span style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
                PROMO LANZAMIENTO: USA EL CUPÓN <strong style={{ border: '1px dashed #fff', padding: '2px 10px', margin: '0 10px' }}>CALOTÍPICO</strong> Y OBTENÉ UN <strong style={{ color: colors.cobre }}>15% OFF</strong> •
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FONDO CON TEXTURA Y VIDEO */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${texturaFondo})`, backgroundSize: 'cover', opacity: 0.5 }}></div>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, mixBlendMode: 'screen' }}>
           <source src="https://res.cloudinary.com/dsyfitywd/video/upload/q_auto,f_auto/showreel_spzmjq.mp4" type="video/mp4" />
        </video>
      </div>

      <main style={{ position: 'relative', zIndex: 1, paddingTop: '200px', textAlign: 'center' }}>
        <header style={{ marginBottom: '80px' }}>
          <p style={{ letterSpacing: '0.5em', fontSize: '8px', opacity: 0.8, marginBottom: '20px' }}>ATRAVESÁ EL RUIDO. DESTACÁ. ANTICIPATE.</p>
          <h1 style={{ fontSize: '62px', margin: 0, fontWeight: 800 }}>ESTO ES</h1>
          <img src={logoCalo} alt="CALO VISUALES" style={{ width: '380px', marginTop: '-80px' }} />


  {/* SEPARADOR OPCIONAL PARA DAR PASO AL CARRUSEL */}
  <div style={{
    width: '40px',
    height: '2px',
    backgroundColor: colors.cobre,
    marginTop: '250px',
    marginBottom: '100px'
  }}></div>
        </header>

        {/* CARRUSEL DE PACKS Y FOTOS */}
        <section style={{ position: 'relative', height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '300px', height: '300px', position: 'relative' }}>
            {packsData.map((item, index) => (
              <div key={index} style={getSlideStyle(index)}>
                <div style={{ width: '100%', height: '100%', border: `1px solid ${colors.bordeCristal}`, borderRadius: '60px', overflow: 'hidden', backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <SlideContent data={item} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={avanzarSlide} style={{ position: 'absolute', right: '15%', backgroundColor: colors.cobre, color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', zIndex: 100, fontSize: '20px' }}>→</button>
        </section>

      </main>

{/* FOOTER CORPORATIVO DORADO & TERRACOTA */}
<footer style={{
  // Usamos un degradado sutil de tu color terracota para que tenga profundidad
  background: `linear-gradient(180deg, ${colors.terracota} 0%, #5D1A11 100%)`, 
  color: 'white',
  padding: '60px 20px 30px 20px',
  marginTop: '100px',
  // Borde superior dorado brillante
  borderTop: '2px solid',
  borderImageSource: 'linear-gradient(90deg, transparent, #F9E498, #D4AF37, #F9E498, transparent)',
  borderImageSlice: 1,
  position: 'relative',
  zIndex: 10,
  fontFamily: 'sans-serif'
}}>
  <div style={{
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    textAlign: 'left'
  }}>

    {/* COLUMNA 3: REDES (PRÓXIMAMENTE) */}
    <div>
      <h5 style={{ color: colors.cobre, marginBottom: '20px', fontSize: '16px', letterSpacing: '0.1em' }}>SÍGUENOS</h5>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {/* Instagram Icon */}
        <div style={{ opacity: 0.4, cursor: 'not-allowed' }} title="Próximamente">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.612 6.766 6.97 6.967 1.28.057 1.688.072 4.947.072s3.667-.015 4.947-.072c4.351-.2 6.764-2.612 6.967-6.97.058-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.97-6.967C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </div>
        {/* TikTok Icon */}
        <div style={{ opacity: 0.4, cursor: 'not-allowed' }} title="Próximamente">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-3.3 2.97-5.96 6.28-6.08 1.13-.04 2.27.18 3.3.68v4.07c-.58-.32-1.21-.49-1.88-.56-.94-.09-1.92.07-2.73.57-1.12.67-1.78 1.96-1.73 3.26.03 1.05.51 2.07 1.34 2.7.74.58 1.66.86 2.6.81 1.08-.02 2.1-.54 2.75-1.41.4-.54.61-1.19.64-1.87.03-2.86.01-5.71.01-8.57z" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  {/* CRÉDITOS FINALES */}
  <div style={{
    borderTop: '1px solid rgba(255,255,255,0.05)',
    marginTop: '50px',
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '12px',
    opacity: 0.4,
    letterSpacing: '0.1em'
  }}>
    © {new Date().getFullYear()} CALO VISUALES. TODOS LOS DERECHOS RESERVADOS.
  </div>
</footer>
      {/* BOTÓN WHATSAPP */}
      <a href="https://wa.me/5491100000000" style={{ position: 'fixed', bottom: '30px', right: '30px', backgroundColor: colors.whatsappGreen, padding: '15px', borderRadius: '50%', zIndex: 2000, boxShadow: '0 10px 25px rgba(0,0,0,0.3)', display: 'flex' }}>
        <svg width="30" height="30" fill="white" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.512-2.96-2.626-.087-.115-.708-.941-.708-1.795 0-.853.448-1.273.607-1.441.159-.169.346-.211.462-.211.115 0 .23 0 .331.005.106.005.249-.04.39.298.144.347.491 1.197.534 1.285.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.777 1.394.864.174.087.275.072.376-.043s.433-.505.548-.678c.115-.173.231-.144.39-.087.159.058 1.011.477 1.184.564.173.087.289.129.331.202.044.073.044.419-.1.824z" /></svg>
      </a>
    </div>
  );
}