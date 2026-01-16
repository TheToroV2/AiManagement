"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useCallback, useEffect } from "react";

import { getAssistants } from "@/app/services/assistantServices";
import { useAssistantStore } from "@/app/store/assistantStore";
import { buttonStyles, inputStyles, textareaStyles } from "@/app/constants/styles";
import { getAssistantResponse } from "@/app/data/assistantResponses";
import {
  Save,
  Send,
  RotateCcw,
  MessageCircle,
  BookMarked,
  Loader,
  CheckCircle,
} from "lucide-react";

export default function AssistantTrainingPage() {
  const { id } = useParams<{ id: string }>();

  // React Query → server state
  const { data: assistants, isLoading } = useQuery({
    queryKey: ["assistants"],
    queryFn: getAssistants,
  });

  const assistant = assistants?.find((a) => a.id === id);

  //Zustand → client state with proper subscription
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  
  useEffect(() => {
    if (!id) return;
    
    // Initialize with current state
    const currentHistory = useAssistantStore.getState().chatHistory[id] || [];
    setChatHistory(currentHistory);
    
    // Subscribe to store changes
    const unsubscribe = useAssistantStore.subscribe(
      (state) => {
        setChatHistory(state.chatHistory[id] || []);
      }
    );
    
    return () => unsubscribe();
  }, [id]);

  const addChatMessage = useAssistantStore(
    (state) => state.addChatMessage
  );
  const resetChat = useAssistantStore(
    (state) => state.resetChat
  );

  //Local UI state
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [trainingRules, setTrainingRules] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`training-rules-${id}`);
      return saved || "";
    }
    return "";
  });
  const [successMessage, setSuccessMessage] = useState(false);

  if (isLoading) return <p>Cargando asistente...</p>;
  if (!assistant) return <p>Asistente no encontrado</p>;

  const handleSend = () => {
    if (!input.trim()) return;

    addChatMessage(id, {
      sender: "user",
      message: input,
    });

    setInput("");
    setIsTyping(true);

    //Simulación de respuesta desde JSON predefinido
    setTimeout(() => {
      addChatMessage(id, {
        sender: "assistant",
        message: getAssistantResponse(id),
      });
      setIsTyping(false);
    }, 1500);
  };

  const handleSaveRules = () => {
    localStorage.setItem(`training-rules-${id}`, trainingRules);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <main style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <BookMarked size={32} color="#007bff" />
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 600 }}>
            {assistant.name}
          </h1>
        </div>
        <p style={{ margin: 0, opacity: 0.7, fontSize: 14, marginLeft: 44 }}>
          Idioma: {assistant.language} · Tono: {assistant.tone}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Entrenamiento */}
        <section
          style={{
            padding: 24,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fafafa",
            position: "relative" as const,
          }}
        >
          {successMessage && (
            <div
              style={{
                position: "absolute" as const,
                top: 12,
                right: 12,
                background: "#d4edda",
                border: "1px solid #c3e6cb",
                color: "#155724",
                padding: "12px 16px",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 500,
                animation: "slideIn 0.3s ease",
              }}
            >
              <CheckCircle size={18} />
              Guardado exitosamente
            </div>
          )}
          <h2 style={{ margin: "0 0 16px 0", fontSize: 18, fontWeight: 600 }}>
            Entrenamiento
          </h2>
          <p style={{ margin: "0 0 12px 0", fontSize: 13, color: "#666" }}>
            Sólo persistencia de datos en local.
          </p>
          <textarea
            placeholder="Instrucciones / reglas del asistente..."
            rows={8}
            value={trainingRules}
            onChange={(e) => setTrainingRules(e.target.value)}
            style={{
              ...textareaStyles.base,
              marginBottom: 12,
            }}
            onFocus={(e) => {
              Object.assign(e.currentTarget.style, textareaStyles.focus);
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#ddd";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <button
            onClick={handleSaveRules}
            style={{
              ...buttonStyles.primary,
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, buttonStyles.primaryHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, buttonStyles.primary);
            }}
            onMouseDown={(e) => {
              Object.assign(e.currentTarget.style, buttonStyles.primaryActive);
            }}
            onMouseUp={(e) => {
              Object.assign(e.currentTarget.style, buttonStyles.primaryHover);
            }}
          >
            <Save size={18} />
            Guardar
          </button>
        </section>

        {/* Chat Simulado */}
        <section
          style={{
            padding: 24,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fafafa",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <MessageCircle size={20} color="#007bff" />
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
              Chat Simulado
            </h2>
          </div>
          <p style={{ margin: "0 0 12px 0", fontSize: 13, color: "#666" }}>
            Chat Simulado
          </p>

          <div
            style={{
              border: "1px solid #ddd",
              padding: 16,
              minHeight: 250,
              marginBottom: 12,
              borderRadius: 4,
              background: "white",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {chatHistory.length === 0 ? (
              <p style={{ color: "#999", fontSize: 13 }}>
                El chat está vacío. Comienza escribiendo un mensaje...
              </p>
            ) : (
              chatHistory.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    padding: 8,
                    borderRadius: 4,
                    background:
                      msg.sender === "user" ? "#e3f2fd" : "#f5f5f5",
                    borderLeft:
                      msg.sender === "user"
                        ? "3px solid #007bff"
                        : "3px solid #666",
                  }}
                >
                  <strong
                    style={{
                      color:
                        msg.sender === "user" ? "#007bff" : "#333",
                      fontSize: 12,
                    }}
                  >
                    {msg.sender === "user" ? "Tú" : "Asistente"}:
                  </strong>
                  <p style={{ margin: "4px 0 0 0", fontSize: 13 }}>
                    {msg.message}
                  </p>
                </div>
              ))
            )}

            {isTyping && (
              <div
                style={{
                  padding: 8,
                  borderRadius: 4,
                  background: "#f5f5f5",
                  color: "#666",
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Loader size={14} className="animate-spin" />
                El asistente está escribiendo...
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe un mensaje..."
              style={inputStyles.base}
              onFocus={(e) => {
                Object.assign(e.currentTarget.style, inputStyles.focus);
              }}
              onBlur={(e) => {
                Object.assign(e.currentTarget.style, inputStyles.base);
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleSend}
                style={{
                  ...buttonStyles.primary,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, buttonStyles.primaryHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, buttonStyles.primary);
                }}
                onMouseDown={(e) => {
                  Object.assign(e.currentTarget.style, buttonStyles.primaryActive);
                }}
                onMouseUp={(e) => {
                  Object.assign(e.currentTarget.style, buttonStyles.primaryHover);
                }}
              >
                <Send size={16} />
                Enviar
              </button>
              <button
                onClick={() => resetChat(id)}
                style={{
                  ...buttonStyles.secondary,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, buttonStyles.secondaryHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, buttonStyles.secondary);
                }}
                onMouseDown={(e) => {
                  Object.assign(e.currentTarget.style, buttonStyles.secondaryActive);
                }}
                onMouseUp={(e) => {
                  Object.assign(e.currentTarget.style, buttonStyles.secondaryHover);
                }}
              >
                <RotateCcw size={16} />
                Reiniciar
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
