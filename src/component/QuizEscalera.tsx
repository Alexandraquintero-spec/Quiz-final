import React, { useState } from 'react';

export const QuizEscalera: React.FC = () => {
  const [inputN, setInputN] = useState<string>("1234");
  const [resultado, setResultado] = useState<{ longitud: number; escalera: number } | null>(null);
  const [error, setError] = useState<string>("");

  const calcularEscalera = () => {
    setError("");
    const nStr = inputN.trim();
    
    // Validaciones básicas de entrada numérica positiva sin cero
    if (!/^[1-9]+$/.test(nStr) || nStr.length > 9) {
      setError("Por favor ingresa un número entero positivo de 1 a 9 dígitos que NO contenga el dígito 0.");
      setResultado(null);
      return;
    }

    let N = parseInt(nStr, 10);

    // Variables de control estrictas con un solo ciclo
    let maxLongitud = 1;
    let maxEscalera = N % 10; // Si solo tiene 1 dígito

    let longitudActual = 1;
    let escaleraActualTemp = N % 10;
    let multiplicadorActual = 10;

    let digitoAnterior = N % 10;
    N = Math.floor(N / 10);

    while (N > 0) {
      const digitoActual = N % 10;

      // Una escalera válida ocurre si el dígito actual es exactamente una unidad menor que el anterior (leído de derecha a izquierda)
      if (digitoActual + 1 === digitoAnterior) {
        longitudActual++;
        escaleraActualTemp = digitoActual * multiplicadorActual + escaleraActualTemp;
        multiplicadorActual *= 10;
      } else {
        // Si se rompe la secuencia, verificamos si la actual es la mayor
        // (Nota: si hay empate con la misma longitud máxima, se prioriza la de la izquierda según el recorrido o lógica requerida)
        if (longitudActual > maxLongitud) {
          maxLongitud = longitudActual;
          maxEscalera = escaleraActualTemp;
        }
        // Reiniciar conteo para la nueva secuencia
        longitudActual = 1;
        escaleraActualTemp = digitoActual;
        multiplicadorActual = 10;
      }

      digitoAnterior = digitoActual;
      N = Math.floor(N / 10);
    }

    // Comprobación final al salir del ciclo
    if (longitudActual >= maxLongitud) {
      maxLongitud = longitudActual;
      maxEscalera = escaleraActualTemp;
    }

    setResultado({ longitud: maxLongitud, escalera: maxEscalera });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Quiz: La escalera más larga</h2>
      <p style={styles.subtitle}>ADSO</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Ingrese el número N:</label>
        <input 
          type="text" 
          value={inputN} 
          onChange={(e) => setInputN(e.target.value)}
          style={styles.input}
          placeholder="Ej: 1234 o 891234567"
        />
        <button onClick={calcularEscalera} style={styles.button}>
          Calcular Escalera
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {resultado && (
        <div style={styles.resultBox}>
          <h3>Resultado del Análisis:</h3>
          <p><strong>Longitud máxima:</strong> {resultado.longitud}</p>
          <p><strong>Número de la escalera:</strong> {resultado.escalera}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '450px',
    margin: '30px auto',
    padding: '25px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    margin: '0 0 5px 0',
    color: '#2c3e50',
    textAlign: 'center' as const,
  },
  subtitle: {
    textAlign: 'center' as const,
    color: '#7f8c8d',
    fontSize: '13px',
    marginBottom: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px',
  },
  error: {
    color: '#c0392b',
    fontSize: '13px',
    marginTop: '10px',
  },
  resultBox: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '4px solid #27ae60',
  },
};

export default QuizEscalera;