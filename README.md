# Project Structure

This project follows a modular, domain-driven architecture.

## Folders

### Root
- **`src/`**: Contains all source code for the project.

### Key Directories
- `features/`: Domain-specific logic, encapsulating API calls, components, stores, and services.
  - `auth/`: Authentication logic.
  - `flow/`: Workflow-related functionality.
  - `projects/`: Project management features.

- `state/`: Global Zustand stores for theme and other shared state management.
- `ui/`: Shared reusable UI components.
- `api/`: Global API configurations and clients.
- `styles/`: Global styles and theming.

### Tests
- `__tests__/`: Organized testing for APIs, components, and services.
