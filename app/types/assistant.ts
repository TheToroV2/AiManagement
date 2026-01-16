export interface ResponseLength {
    short: number;
    medium: number;
    long: number;
}

export interface Assistant {
    id: string;
    name: string;
    language: "Español" | "Inglés" | "Portugués";
    tone: "Formal" | "Casual" | "Profesional" | "Amigable";
    responseLength: ResponseLength;
    audioEnabled: boolean;
    rules?: string;
}