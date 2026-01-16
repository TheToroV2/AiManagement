"use client";

import { useEffect, useState, useRef } from "react";
import { useAssistantStore } from "../store/assistantStore";
import { Assistant } from "../types/assistant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssistant, updateAssistant } from "../services/assistantServices";
import { useFormValidation } from "../hooks/useFormValidation";
import { validationRules } from "../utils/validationRules";
import {
  getResponseLengthValues,
  createResponseLengthObject,
  validateResponseLengthSum,
} from "../utils/assistantHelpers";
import { modalStyles } from "../constants/styles";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import ErrorMessage from "./ui/ErrorMessage";
import PercentageInput from "./ui/PercentageInput";
import StepIndicator from "./ui/StepIndicator";

const LANGUAGE_OPTIONS = [
  { value: "Español", label: "Español" },
  { value: "Inglés", label: "Inglés" },
  { value: "Portugués", label: "Portugués" },
];

const TONE_OPTIONS = [
  { value: "Profesional", label: "Profesional" },
  { value: "Casual", label: "Casual" },
  { value: "Formal", label: "Formal" },
  { value: "Amigable", label: "Amigable" },
];

const TOTAL_STEPS = 2;

export default function AssistantModal() {
  const {
    isModalOpen,
    modalMode,
    selectedAssistant,
    closeModal,
  } = useAssistantStore();

  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null);

  // Form state
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<Assistant["language"]>("Español");
  const [tone, setTone] = useState<Assistant["tone"]>("Profesional");
  
  // Paso 2: Porcentajes de longitud de respuesta
  const [shortPercentage, setShortPercentage] = useState<number>(30);
  const [mediumPercentage, setMediumPercentage] = useState<number>(50);
  const [longPercentage, setLongPercentage] = useState<number>(20);
  
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [rules, setRules] = useState("");
  const [mutationError, setMutationError] = useState<string | null>(null);

  // Form validation hook
  const { errors, validateField, clearError, clearAllErrors } = useFormValidation();

  // Mutations with optimistic updates
  const createMutation = useMutation({
    mutationFn: createAssistant,
    onMutate: async (newAssistant: Assistant) => {
      await queryClient.cancelQueries({ queryKey: ["assistants"] });
      const previousAssistants = queryClient.getQueryData<Assistant[]>(["assistants"]);

      // Optimistic update
      queryClient.setQueryData<Assistant[]>(
        ["assistants"],
        (old = []) => [...old, newAssistant]
      );

      return { previousAssistants };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assistants"] });
      closeModal();
    },
    onError: (error, newAssistant, context) => {
      // Rollback on error
      if (context?.previousAssistants) {
        queryClient.setQueryData(["assistants"], context.previousAssistants);
      }
      setMutationError(
        error instanceof Error
          ? error.message
          : "Error al crear el asistente. Por favor, inténtalo de nuevo."
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateAssistant,
    onMutate: async (updatedAssistant: Assistant) => {
      await queryClient.cancelQueries({ queryKey: ["assistants"] });
      const previousAssistants = queryClient.getQueryData<Assistant[]>(["assistants"]);

      // Optimistic update
      queryClient.setQueryData<Assistant[]>(
        ["assistants"],
        (old = []) => old.map((a) => (a.id === updatedAssistant.id ? updatedAssistant : a))
      );

      return { previousAssistants };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assistants"] });
      closeModal();
    },
    onError: (error, updatedAssistant, context) => {
      // Rollback on error
      if (context?.previousAssistants) {
        queryClient.setQueryData(["assistants"], context.previousAssistants);
      }
      setMutationError(
        error instanceof Error
          ? error.message
          : "Error al actualizar el asistente. Por favor, inténtalo de nuevo."
      );
    },
  });

  // Initialize form when modal opens
  useEffect(() => {
    if (!isModalOpen) return;

    setStep(1);
    setMutationError(null);
    clearAllErrors();

    if (modalMode === "edit" && selectedAssistant) {
      setName(selectedAssistant.name ?? "");
      setLanguage(selectedAssistant.language ?? "Español");
      setTone(selectedAssistant.tone ?? "Profesional");
      setRules(selectedAssistant.rules ?? "");
      setAudioEnabled(selectedAssistant.audioEnabled ?? false);
      
      // Cargar porcentajes desde el objeto ResponseLength
      const { short, medium, long } = getResponseLengthValues(
        selectedAssistant.responseLength
      );
      setShortPercentage(short);
      setMediumPercentage(medium);
      setLongPercentage(long);
    } else {
      setName("");
      setLanguage("Español");
      setTone("Profesional");
      setRules("");
      setAudioEnabled(false);
      setShortPercentage(30);
      setMediumPercentage(50);
      setLongPercentage(20);
    }
  }, [modalMode, selectedAssistant, isModalOpen, clearAllErrors]);

  // Handle ESC key and click outside
  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  // Real-time validation for name field
  const handleNameChange = (value: string) => {
    setName(value);
    clearError("name");
    if (value.trim().length > 0) {
      validateField("name", value, [validationRules.name()]);
    }
  };

  // Validar suma de porcentajes en tiempo real
  const validatePercentages = () => {
    const isValid = validateResponseLengthSum(
      shortPercentage,
      mediumPercentage,
      longPercentage
    );
    if (!isValid) {
      validateField("responseLength", "", [
        validationRules.responseLengthSum(shortPercentage, mediumPercentage, longPercentage),
      ]);
    } else {
      clearError("responseLength");
    }
    return isValid;
  };

  // Actualizar porcentajes y validar
  const handlePercentageChange = (
    type: "short" | "medium" | "long",
    value: number
  ) => {
    if (type === "short") setShortPercentage(value);
    if (type === "medium") setMediumPercentage(value);
    if (type === "long") setLongPercentage(value);
    
    // Validar después de un pequeño delay para permitir que el usuario termine de escribir
    setTimeout(() => {
      validatePercentages();
    }, 300);
  };

  const handleNext = () => {
    const isValid = validateField("name", name, [validationRules.name()]);
    if (!isValid) return;
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    clearError("responseLength");
  };

  const handleSave = () => {
    // Validar nombre
    const isNameValid = validateField("name", name, [validationRules.name()]);
    if (!isNameValid) {
      setStep(1);
      return;
    }

    // Validar porcentajes
    const isPercentagesValid = validatePercentages();
    if (!isPercentagesValid) {
      return;
    }

    setMutationError(null);

    const assistantPayload: Assistant = {
      id: selectedAssistant?.id ?? crypto.randomUUID(),
      name: name.trim(),
      language,
      tone,
      responseLength: createResponseLengthObject(
        shortPercentage,
        mediumPercentage,
        longPercentage
      ),
      audioEnabled,
      rules: rules.trim(),
    };

    if (modalMode === "create") {
      createMutation.mutate(assistantPayload);
    } else {
      updateMutation.mutate(assistantPayload);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;
  const totalPercentage = shortPercentage + mediumPercentage + longPercentage;

  if (!isModalOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div ref={modalRef} style={modalStyles.container}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>
          {modalMode === "create" ? "Crear Asistente" : "Editar Asistente"}
        </h2>

        {/* Step Indicator */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
        </div>

        {mutationError && <ErrorMessage>{mutationError}</ErrorMessage>}

        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <>
            <Input
              label="Nombre"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              disabled={isLoading}
              error={errors.name}
              showError={!!errors.name}
              autoFocus
            />

            <Select
              label="Idioma"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Assistant["language"])}
              disabled={isLoading}
              options={LANGUAGE_OPTIONS}
            />

            <Select
              label="Tono"
              value={tone}
              onChange={(e) => setTone(e.target.value as Assistant["tone"])}
              disabled={isLoading}
              options={TONE_OPTIONS}
            />
          </>
        )}

        {/* STEP 2: Response Configuration */}
        {step === 2 && (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, display: "block" }}>
                Longitud de Respuestas (la suma debe ser 100%)
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <PercentageInput
                  label="Respuestas Cortas"
                  value={shortPercentage}
                  onChange={(value) => handlePercentageChange("short", value)}
                  disabled={isLoading}
                  error={errors.responseLength}
                  showError={!!errors.responseLength}
                />
                <PercentageInput
                  label="Respuestas Medianas"
                  value={mediumPercentage}
                  onChange={(value) => handlePercentageChange("medium", value)}
                  disabled={isLoading}
                  error={errors.responseLength}
                  showError={false}
                />
                <PercentageInput
                  label="Respuestas Largas"
                  value={longPercentage}
                  onChange={(value) => handlePercentageChange("long", value)}
                  disabled={isLoading}
                  error={errors.responseLength}
                  showError={false}
                />
              </div>
              <div
                style={{
                  marginTop: 8,
                  padding: 8,
                  background: totalPercentage === 100 ? "#e8f5e9" : "#fff3cd",
                  borderRadius: 4,
                  fontSize: 12,
                  color: totalPercentage === 100 ? "#2e7d32" : "#856404",
                  fontWeight: 500,
                }}
              >
                Total: {totalPercentage}%
                {totalPercentage !== 100 && (
                  <span style={{ marginLeft: 8 }}>
                    (Faltan {100 - totalPercentage}% para completar)
                  </span>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                <input
                  type="checkbox"
                  checked={audioEnabled}
                  onChange={(e) => setAudioEnabled(e.target.checked)}
                  disabled={isLoading}
                  style={{
                    width: 18,
                    height: 18,
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                />
                Habilitar respuestas de audio
              </label>
            </div>

            <Textarea
              label="Reglas del Asistente (opcional)"
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              disabled={isLoading}
              rows={4}
            />
          </>
        )}

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
          {step === 2 && (
            <Button variant="secondary" onClick={handleBack} disabled={isLoading}>
              Atrás
            </Button>
          )}

          <Button variant="secondary" onClick={closeModal} disabled={isLoading}>
            Cancelar
          </Button>

          {step === 1 ? (
            <Button variant="primary" onClick={handleNext} disabled={isLoading}>
              Siguiente
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSave}
              isLoading={isLoading}
              disabled={totalPercentage !== 100}
            >
              Guardar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
