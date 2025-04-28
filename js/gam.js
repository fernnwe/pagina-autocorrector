const palabrasValidas = [
    "manzana", "casa", "perro", "gato", "escuela", "universidad", "programacion",
    "amigo", "familia", "estudio", "libro", "mesa", "silla", "ventana", "puerta",
    "camino", "juego", "palabra", "musica", "deporte"
  ];

  function verificarPalabra() {
    const entrada = document.getElementById('palabra').value.trim();
    const resultado = document.getElementById('resultado');

    if (entrada === '') {
      resultado.textContent = 'Por favor, escribe una palabra.';
      resultado.className = 'text-center text-lg font-medium text-red-600 mb-8';
      return;
    }

    resultado.textContent = `✅ "${entrada}" se ha enviado para pronunciación.`;
    resultado.className = 'text-center text-lg font-medium text-green-600 mb-8';
    hablar(entrada);
  }

  function hablar(texto) {
    const mensaje = new SpeechSynthesisUtterance(texto);
    mensaje.lang = 'es-ES'; // Español de España, o 'es-MX' si prefieres latino
    mensaje.rate = 0.9;
    window.speechSynthesis.speak(mensaje);
  }

  function sugerirPalabra(palabra) {
    let palabraCercana = '';
    let menorDistancia = Infinity;

    palabrasValidas.forEach(valida => {
      const distancia = calcularDistancia(palabra, valida);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        palabraCercana = valida;
      }
    });

    return menorDistancia <= 3 ? palabraCercana : null;
  }

  function calcularDistancia(a, b) {
    const matriz = [];

    for (let i = 0; i <= a.length; i++) {
      matriz[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
      matriz[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a.charAt(i - 1) === b.charAt(j - 1)) {
          matriz[i][j] = matriz[i - 1][j - 1];
        } else {
          matriz[i][j] = Math.min(
            matriz[i - 1][j - 1] + 1,
            matriz[i][j - 1] + 1,
            matriz[i - 1][j] + 1
          );
        }
      }
    }
    return matriz[a.length][b.length];
  }