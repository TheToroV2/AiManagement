"use client";
import { useQuery } from "@tanstack/react-query";
import { getAssistants } from "./services/assistantServices";
import { useAssistantStore } from "./store/assistantStore";
import AssistantCard from "./components/AssistantCard";
import AssistantModal from "./components/AssistantModal";
import Button from "./components/ui/Button";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ErrorMessage from "./components/ui/ErrorMessage";
import AssistantCardSkeleton from "./components/ui/AssistantCardSkeleton";

export default function Home() {
  // React Query maneja el estado del servidor (lista de asistentes)
  const { 
    data, 
    isLoading, 
    isFetching, 
    error, 
    isError,
    refetch 
  } = useQuery({
    queryKey: ["assistants"],
    queryFn: getAssistants,
  });

  // Zustand maneja solo el estado de UI (modal)
  const openModal = useAssistantStore((state) => state.openModal);

  const handleCreateAssistant = () => {
    openModal("create");
  };

  // Mostrar skeleton loaders durante la carga inicial
  const showSkeletons = isLoading && !data;
  // Mostrar indicador de refetch cuando ya hay datos pero se está actualizando
  const showRefetchIndicator = isFetching && !isLoading && data;

  return (
    <main style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h1 style={{ margin: 0 }}>Gestión de Asistentes IA</h1>
          {showRefetchIndicator && (
            <LoadingSpinner 
              size="small" 
              message="Actualizando..."
              style={{ marginLeft: 8 }}
            />
          )}
        </div>
        <Button 
          variant="primary" 
          onClick={handleCreateAssistant}
          disabled={isLoading}
        >
          + Crear Asistente
        </Button>
      </div>

      {/* Loading State: Skeleton Loaders */}
      {showSkeletons && (
        <div>
          {[1, 2, 3].map((i) => (
            <AssistantCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div style={{ marginBottom: 24 }}>
          <ErrorMessage>
            {error instanceof Error
              ? error.message
              : "Error al cargar los asistentes. Por favor, recarga la página."}
          </ErrorMessage>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Button variant="primary" onClick={() => refetch()}>
              Reintentar
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && (!data || data.length === 0) && (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            color: "#666",
          }}
        >
          <p style={{ fontSize: 18, marginBottom: 8 }}>
            No hay asistentes creados
          </p>
          <p style={{ fontSize: 14, marginBottom: 16 }}>
            Comienza creando tu primer asistente
          </p>
          <Button variant="primary" onClick={handleCreateAssistant}>
            Crear Primer Asistente
          </Button>
        </div>
      )}

      {/* Success State: List of Assistants */}
      {!isLoading && !isError && data && data.length > 0 && (
        <div>
          {data.map((assistant) => (
            <AssistantCard key={assistant.id} assistant={assistant} />
          ))}
        </div>
      )}

      <AssistantModal />
    </main>
  );
}
