# Web App MyTodoEditor

## Overview

**MyTodoEditor** is a sample enterprise web app demonstrating CRUD operations against a REST backend.
The frontend is built with [PrimeVue](https://primevue.org/) components for [Vue 3](https://vuejs.org/)
and communicates with the [**TodoService** backend](https://github.com/alaska-software/todo-service/blob/main/backend/readme.md).

## Features

- **CRUD Operations**: Create, Read, Update, Delete todo items
- **Data Table**: Sortable, filterable, and paginated table with CSV export
- **Form Validation**: Input validation before saving
- **Error Handling**: User-friendly toast notifications and error messages

## Tech Stack

### Frontend Framework
- **[PrimeVue](https://primevue.org/)** - Rich set of UI components for Vue 3
- **[Vue 3](https://vuejs.org)** - Progressive JavaScript framework using Composition API
- **[Vite](https://vitejs.dev)** - Fast build tool and development server
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework for styling

### Backend Framework
- **[Xbase++ MSA Framework](http://guide.alaska-software.net/microservices.html)** - REST microservice architecture for the TodoService backend


## Architecture

The following sequence diagram shows how the frontend loads todo items from the backend:

![Loading Todo Items](docs/loading-todoitems.png)

The frontend (PrimeVue/Vue 3) makes HTTP requests to the backend (Xbase++ MSA), which queries the database and returns data in a standardized envelope format.

## Backend

The backend is [**TodoService**](https://github.com/alaska-software/todo-service/blob/main/backend/readme.md), a REST microservice built with
the Alaska Software **[MSA Framework for Xbase++](http://guide.alaska-software.net/microservices.html)**.
It listens on port `9100` by default.

### REST API

| Method | Path              | Description                    |
|--------|-------------------|--------------------------------|
| GET    | `/todoitems`      | Get all todo items             |
| GET    | `/todoitems/{id}` | Get a specific todo item by id |
| POST   | `/todoitems`      | Create a new todo item         |
| PUT    | `/todoitems/{id}` | Update an existing todo item   |
| DELETE | `/todoitems/{id}` | Delete a todo item by id       |

**Note**: All API endpoints return responses in a standardized envelope format (see [Response Envelope](#response-envelope) below).

### Response Envelope

All API responses follow this structure:

```json
{
  "result": {
    "data": [...],
    "dictionaries": {...}
  },
  "error": null
}
```

- **`result`**: Contains the successful response data
  - **`data`**: The main payload (array of todo items, single item, etc.)
  - **`dictionaries`**: Reference data (states, priorities, etc.)
- **`error`**: Contains error information if the request failed, otherwise `null`

This envelope pattern ensures consistent error handling and allows the backend to include reference data alongside the main response.


## Frontend

The frontend is built with [PrimeVue](https://primevue.org/) components for [Vue 3](https://vuejs.org).

### Requirements

- [Node.js 18.14.2](https://nodejs.org/en) or later

### Project Structure

```
src/
├── components/     # Reusable Vue components
├── composables/    # Vue 3 composables
├── constants/      # UI and validation messages
├── dictionaries/   # State and priority lookup data
├── router/         # Vue Router configuration
├── services/       # API service layer
└── views/          # Page views
```

## Getting Started

### 1. Start the Backend

Download the backend from [TodoService on GitHub](https://github.com/alaska-software/todo-service/tree/main/backend), build and run it.

Verify it is running:

```bash
curl http://localhost:9100/todoitems
```


Expected response:

```json
{
  "result": {
    "data": [
      {
        "id": 1,
        "created": "2023-01-01T12:00:00",
        "text": "Sample todo",
        "changed": "2023-01-01T12:00:00",
        "state": "IP",
        "priority": "1"
      }
    ],
    "dictionaries": {
      "states": [
        {"id": "IP", "name": "In Progress"},
        {"id": "DO", "name": "Done"}
      ],
      "priorities": [
        {"id": "1", "name": "High"},
        {"id": "2", "name": "Medium"}
      ]
    }
  },
  "error": null
}
```

### 2. Check out or update the project from the GitHub repository

```bash
git clone https://github.com/alaska-software/todo-service.git
cd todo-service/frontend/web
```

### 3. Configure the Backend URL in the Frontend

Edit `src/services/dataService.js` to point to the correct backend:

- `http://localhost:9100/` — local development

### 4. Install Dependencies in the Frontend

```bash
npm ci
```


### 5. Start the Frontend Dev Server

```bash
npm run dev
```

