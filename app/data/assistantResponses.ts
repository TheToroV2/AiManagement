// Respuestas predefinidas para cada asistente
export const assistantResponses: Record<string, Record<string, string[]>> = {
  "1": {
    // Asistente de Ventas
    short: [
      "Perfecto, continuemos.",
      "Entendido.",
      "Claro.",
    ],
    medium: [
      "Entiendo perfectamente tus necesidades. Permíteme sugerirte una solución personalizada.",
      "Excelente pregunta. Basándome en lo que me comentas, tengo una propuesta para ti.",
      "Agradezco tu confianza. Veamos juntos qué opciones tienes disponibles.",
      "Entendido, identifico lo que buscas. Tengo varias alternativas que podrían funcionar.",
      "Perfecto, así podemos ofrecerte exactamente lo que necesitas.",
    ],
    long: [
      "Gracias por compartir esa información conmigo. Basándome en tus requerimientos específicos y considerando tu contexto actual, te propongo una estrategia integral que se adapte perfectamente a tus objetivos.",
      "Excelente, ahora tengo una visión clara de lo que requieres. He identificado tres opciones que podrían ser ideales para tu situación, cada una con beneficios específicos.",
    ],
  },
  "2": {
    // Soporte Técnico (responses en inglés)
    short: [
      "Got it.",
      "Understood.",
      "I see.",
    ],
    medium: [
      "I've reviewed your issue and I understand the problem. Let me guide you through the solution step by step.",
      "Thanks for the details. I think I can help you resolve this. First, let's try this approach.",
      "I can see what's happening here. Let's troubleshoot this together to get you back online.",
    ],
    long: [
      "Thank you for providing such detailed information. I've analyzed the error logs and identified the root cause. Here's a comprehensive solution that should resolve your issue completely, along with steps to prevent this in the future.",
      "I understand your technical problem thoroughly. Let me walk you through a detailed troubleshooting process. This approach addresses not only your immediate issue but also optimizes your system performance.",
    ],
  },
  default: {
    short: [
      "Entendido.",
      "Claro.",
      "De acuerdo.",
    ],
    medium: [
      "Entendido, procesaré tu solicitud.",
      "Perfecto, aquí está la información que solicitaste.",
      "Gracias por tu pregunta, permíteme ayudarte.",
    ],
    long: [
      "Excelente pregunta. Permíteme proporcionarte una respuesta completa y detallada sobre este tema.",
      "Entendido perfectamente. Basándome en los detalles que compartiste, aquí te presento un análisis comprensivo.",
    ],
  },
};

// Función para obtener respuestas del asistente según el id y longitud
export const getAssistantResponse = (
  assistantId: string,
  length: "short" | "medium" | "long" = "medium"
): string => {
  const assistantData = assistantResponses[assistantId] || assistantResponses.default;
  const responses = assistantData[length] || assistantData.medium;
  return responses[Math.floor(Math.random() * responses.length)];
};
