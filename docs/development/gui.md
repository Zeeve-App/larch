# GUI (Graphical User Interface)

GUI is the core part of the application to have configure and connect to Zombienet service though Graphical interface.

## Tooling

- **Vite**: to do unit tests
- **Typescript**: to transpile Typescript code to JS
- **ESLint**: for linting codebase

## Core Packages used

- **React**: React is the handling UI components and their execution patterns
- **Tailwind**: Tailwind is used to generate CSS from the via class names 
- **Zustand**: Zustand to do state management of React application
- **Code Mirror**: Code mirror for showing and editing configurations

## Core-base Structure

```
- public : frontend base and UI assets like images and css files
- src
  - assets     : Assets are the UI
  - components : React components
  - pages      : Larch pages
  - hooks      : Custom React hooks (functions)
  - store      : Larch context store 
  - types      : Types used to maintain the application operations
  - utils      : Application utility functions
  - App.tsx    : GUI Application configuration and setup
  - index.tsx  : GUI Application code base entry point
```