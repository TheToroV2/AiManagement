"use client";

import { Assistant } from "../types/assistant";
import { useAssistantStore } from "../store/assistantStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAssistant } from "../services/assistantServices";
import Button from "./ui/Button";
import ErrorMessage from "./ui/ErrorMessage";
import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Edit,
  Trash2,
  Volume2,
  Globe,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

interface AssistantCardProps {
  assistant: Assistant;
}

export default function AssistantCard({ assistant }: AssistantCardProps) {
  const openModal = useAssistantStore((state) => state.openModal);
  const queryClient = useQueryClient();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //actualiza la UI inmediatamente antes de la respuesta del servidor
  const deleteMutation = useMutation({
    mutationFn: deleteAssistant,
    onMutate: async (assistantId: string) => {
      setIsDeleting(true);
      // Cancelar queries en progreso para evitar sobrescribir el optimistic update
      await queryClient.cancelQueries({ queryKey: ["assistants"] });

      // Snapshot del valor anterior
      const previousAssistants = queryClient.getQueryData<Assistant[]>([
        "assistants",
      ]);

      // NO remover inmediatamente para que el mensaje sea visible
      return { previousAssistants };
    },
    onError: (error, assistantId, context) => {
      setIsDeleting(false);
      // Rollback: restaurar el estado anterior en caso de error
      if (context?.previousAssistants) {
        queryClient.setQueryData(["assistants"], context.previousAssistants);
      }
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Error al eliminar el asistente"
      );
    },
    onSuccess: () => {
      setDeleteError(null);
      setDeleteSuccess(true);
      // Esperar 3 segundos antes de remover del DOM
      setTimeout(() => {
        queryClient.setQueryData<Assistant[]>(
          ["assistants"],
          (old = []) => old.filter((a) => a.id !== assistant.id)
        );
        setIsDeleting(false);
      }, 3000);
      // Invalidar para asegurar sincronización con el servidor
      queryClient.invalidateQueries({ queryKey: ["assistants"] });
    },
  });

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de eliminar "${assistant.name}"?`)) {
      setDeleteError(null);
      deleteMutation.mutate(assistant.id);
    }
  };

  const handleEdit = () => {
    openModal("edit", assistant);
  };

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        background: "white",
        transition: "all 0.3s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        cursor: "default",
        position: "relative" as const,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.1)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.05)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {deleteSuccess && (
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
          Asistente eliminado
        </div>
      )}
      <div style={{ flex: 1, opacity: deleteSuccess ? 0.5 : 1, transition: "opacity 0.3s ease" }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: 600 }}>
          {assistant.name}
        </h3>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 13,
            color: "#666",
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Globe size={16} />
            {assistant.language}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Lightbulb size={16} />
            {assistant.tone}
          </div>
        </div>
        {deleteError && (
          <ErrorMessage style={{ marginTop: 8, fontSize: 12 }}>
            {deleteError}
          </ErrorMessage>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, opacity: deleteSuccess ? 0.5 : 1, transition: "opacity 0.3s ease", pointerEvents: deleteSuccess ? "none" : "auto" }}>
        <Link href={`/assistant/${assistant.id}`}>
          <Button
            variant="primary"
            style={{
              padding: "8px 14px",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s ease",
            }}
            title="Entrenar"
            disabled={deleteSuccess}
          >
            <BookOpen size={16} />
            Entrenar
          </Button>
        </Link>
        <Button
          variant="primary"
          onClick={handleEdit}
          disabled={deleteMutation.isPending || deleteSuccess}
          style={{
            padding: "8px 14px",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all 0.2s ease",
          }}
          title="Editar"
        >
          <Edit size={16} />
          Editar
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          isLoading={deleteMutation.isPending}
          disabled={deleteSuccess}
          style={{
            padding: "8px 14px",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all 0.2s ease",
          }}
          title="Eliminar"
        >
          <Trash2 size={16} />
          Eliminar
        </Button>
      </div>
    </div>
  );
}