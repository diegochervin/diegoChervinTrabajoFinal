import { useState, useEffect } from 'react';

function CotizacionDolar({ onCotizacion }) {
  const [cotizacion, setCotizacion] = useState(null);

  useEffect(() => {
    const fetchCotizacion = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares/oficial');
        if (!response.ok) {
          throw new Error('Error al obtener la cotización del dólar');
        }
        const data = await response.json();
        const dolarVenta = Number(data.venta);
        setCotizacion(dolarVenta);
        onCotizacion(dolarVenta); // 💡 Notificar al componente padre
      } catch (error) {
        console.error('Error al obtener la cotización del dólar:', error);
      }
    };

    fetchCotizacion();
  }, [onCotizacion]); // Solo se ejecuta una vez al montar

  return null; // No renderiza nada visualmente
}

export default CotizacionDolar;
