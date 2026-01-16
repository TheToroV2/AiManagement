import { create } from "zustand";
import { Assistant } from "../types/assistant";

export type ModalMode = "create" | "edit";

interface ChatMessage {
  sender: "user" | "assistant";
  message: string;
}

interface AssistantStore {
  // UI State - Zustand maneja solo estado de UI
  selectedAssistant: Assistant | null;
  isModalOpen: boolean;
  modalMode: ModalMode;

  // Client-side state (chat history)
  chatHistory: Record<string, ChatMessage[]>;

  // Actions
  selectAssistant: (assistant: Assistant | null) => void;
  openModal: (mode: ModalMode, assistant?: Assistant) => void;
  closeModal: () => void;

  addChatMessage: (
    assistantId: string,
    message: ChatMessage
  ) => void;

  resetChat: (assistantId: string) => void;
}

export const useAssistantStore = create<AssistantStore>((set) => ({
  // UI State - React Query maneja la lista de asistentes (server state)
  selectedAssistant: null,
  isModalOpen: false,
  modalMode: "create",

  // Client-side state
  chatHistory: {},

  // Actions
  selectAssistant: (assistant) =>
    set({ selectedAssistant: assistant }),

  openModal: (mode, assistant) =>
    set({
      isModalOpen: true,
      modalMode: mode,
      selectedAssistant: assistant ?? null,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      selectedAssistant: null,
    }),

  addChatMessage: (assistantId: string, message: ChatMessage) =>
    set((state) => ({
      chatHistory: {
        ...state.chatHistory,
        [assistantId]: [
          ...(state.chatHistory[assistantId] || []),
          message,
        ],
      },
    })),

  resetChat: (assistantId: string) =>
    set((state) => ({
      chatHistory: {
        ...state.chatHistory,
        [assistantId]: [],
      },
    })),
}));
