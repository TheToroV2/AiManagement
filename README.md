# AI Assistant Management App

Web application for managing, training, and simulating AI assistants.  
Allows users to create, edit, train, and chat with assistants in a simulated environment.

---

## How to run the project

### Requirements
- Node.js v18+
- npm or yarn

### Steps
```bash
git clone <repository-url>
cd aimanagement
npm install
npm run dev
```
The application will be available at:  
http://localhost:3000

---

## Technical decisions

### Tech stack

- **Next.js (App Router)**  
  Used for modern routing, SSR/CSR support, and scalable project structure.

- **TypeScript**  
  Provides strict typing and early error detection.

- **Zustand**  
  Manages global UI state and client-side state such as modals, selected assistant, and simulated chat.

- **TanStack React Query**  
  Handles server state (fetch, create, update, delete assistants).

- **Mock Services (in-memory)**  
  Simulates a backend API without requiring a real server.

---

## Separation of responsibilities

- **React Query**  
  Server state management (assistant CRUD operations).

- **Zustand**  
  UI state and client-side state (modals, selected assistant, chat history).

- **Services**  
  Asynchronous logic and API simulation.

- **Components**  
  Reusable UI components and presentation logic.

This separation allows the project to scale easily and migrate to a real backend.

---

## Implemented features

### Assistant management
- Assistant listing
- Create assistant
- Edit assistant
- Delete assistant
- Reusable modal for create and edit

### Training page (`/assistant/[id]`)
- Displays assistant information
- Text area to edit training rules / prompts
- Save button with loading state
- Success message after saving
- Client-side persistence of training data

### Simulated chat
- Independent chat per assistant
- User and assistant messages
- Simulated assistant responses with 1–2 second delay
- Visual typing indicator
- Reset conversation functionality

---

## Prioritization and limitations

### Not implemented
- Real database persistence
- Authentication and authorization
- Advanced UI framework or design system

### Reason
Priority was given to:
- Clean and scalable architecture
- Clear separation between server state and UI state
- Fully functional user flows
- Clean, readable, and strongly typed code

These decisions make the project easy to extend in future phases.

---

## Approximate time spent

Between **12 and 16 hours**, including:
- Architecture design
- Global state management
- Assistant CRUD implementation
- Training page development
- Simulated chat implementation
- TypeScript refinements and structure cleanup

---

## Final notes

This project is prepared for:
- Integration with a real backend API
- Database persistence
- Authentication and user management
- UI improvements using a design system
