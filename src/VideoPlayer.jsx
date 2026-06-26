import { useEffect, useRef } from 'react';

const VideoPlayer = ({ publicId }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Verificamos que la librería cargó y que tenemos el elemento
    if (window.cloudinary && videoRef.current && !playerRef.current) {
      
      // La API correcta de la librería 2.x es .videoPlayer()
      playerRef.current = window.cloudinary.videoPlayer(videoRef.current, {
        cloudName: 'dsyfitywd',
        secure: true
      });

      playerRef.current.source(publicId, {
        autoplay: true,
        muted: true,
        loop: true,
        controls: false
      });
    }

    return () => {
      // Limpieza adecuada
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [publicId]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
      {/* Usamos ref en lugar de id para asegurar que Cloudinary apunte al nodo correcto */}
      <video 
        ref={videoRef} 
        className="cld-video-player"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default VideoPlayer;