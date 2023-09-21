import React, { useEffect } from 'react';

function ConnectionTest() {
  useEffect(() => {
    // Realiza una solicitud GET al servidor
    fetch('/test', {
      method: 'GET',
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  }, []);

  return (
    <div>
      <h1>Verificar Conexión</h1>
    </div>
  );
}

export default ConnectionTest;