import { Assistant } from "../types/assistant";

let assistants: Assistant[] = [
  {
    id: "1",
    name: "Asistente de Ventas",
    language: "Español",
    tone: "Profesional",
    responseLength: {
      short: 30,
      medium: 50,
      long: 20,
    },
    audioEnabled: true,
    rules:
      "Eres un asistente especializado en ventas. Siempre sé cordial.",
  },
];

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

//Mock CRUD functions

//Get
export const getAssistants = async (): Promise<Assistant[]> => {
  await delay(300);
  return assistants;
};

//Create
export const createAssistant = async (
  assistant: Assistant
): Promise<Assistant> => {
  await delay(300);
  assistants.push(assistant);
  return assistant;
};

//Update
export const updateAssistant = async (
  updated: Assistant
): Promise<Assistant> => {
  await delay(300);
  assistants = assistants.map((a) =>
  a.id === updated.id ? updated : a
);
return updated;
};

export const deleteAssistant = async (id: string): Promise<void> => {
  await delay(300);

  if (Math.random() < 0.1){
    throw new Error("Fallo la eliminacio del asistente");
  }

  assistants = assistants.filter((a) => a.id !== id);
};