# AI Assistant Management App

Aplicación web para la gestión, entrenamiento y simulación de asistentes de IA.
Permite crear, editar, entrenar y chatear con asistentes de forma simulada.

Instrucciones para correr el proyecto
Requisitos

Node.js v18+

npm o yarn

Pasos
# Clonar el repositorio
git clone <url-del-repositorio>

# Entrar al proyecto
cd aimanagement

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev


La aplicación estará disponible en:
 http://localhost:3000

 Decisiones técnicas
 Stack utilizado

Next.js (App Router)
Para routing moderno, SSR/CSR y estructura escalable.

TypeScript
Para tipado estricto y detección temprana de errores.

Zustand
Manejo de estado global de UI y estado del cliente (modal, asistente seleccionado, chat simulado).

TanStack React Query
Manejo de estado del servidor (fetch, create, update, delete de asistentes).

Mock Services (in-memory)
Simulan una API real sin necesidad de backend.

 Separación de responsabilidades

React Query → Server State (asistentes CRUD)

Zustand → UI State + estado local (chat, selección, modales)

Services → Lógica asíncrona simulada

Components → UI reutilizable

 Esta separación permite escalar fácilmente a una API real.

 Características implementadas
 Gestión de Asistentes

Listado de asistentes

Creación de asistentes

Edición de asistentes

Eliminación de asistentes

Modal reutilizable (create / edit)

 Página de Entrenamiento (/assistant/[id])

Información del asistente

Edición de reglas (training / prompt)

Guardado con estado de carga

Mensaje de éxito al guardar

 Chat Simulado

Chat por asistente

Mensajes de usuario y asistente

Respuestas simuladas con delay (1–2 segundos)

Indicador de “escribiendo…”

Reinicio de conversación

 Priorización y limitaciones
 Funcionalidades no implementadas

Persistencia real en base de datos

Autenticación de usuarios

Diseño visual avanzado (UI framework)

 Motivo

Se priorizó:

Arquitectura correcta

Separación clara de estados

Flujo completo funcional

Código limpio y tipado

Estas decisiones permiten que el proyecto sea fácilmente escalable en una siguiente fase.

 Tiempo aproximado de dedicación

Entre 12 y 16 horas, distribuidas en:

Diseño de arquitectura

Implementación de estado global

CRUD de asistentes

Página de entrenamiento

Chat simulado

Ajustes de TypeScript y estructura

 Notas finales

Este proyecto está preparado para:

Conectarse a una API real

Persistir datos en backend

Integrar un motor real de IA
