# Todo Service

A complete todo management application with a microservice backend and multiple frontend implementations.

## Overview

This repository contains:
- **Backend**: REST microservice built with Alaska Software MSA Framework (Xbase++)
- **Web Frontend**: Enterprise web app using PrimeVue + Vue 3
- **Mobile Frontend**: Cross-platform mobile app using Quasar + Vue 3 + Cordova

## Quick Start

### Backend Setup
```bash
cd backend
xar PROJECT -install
pbuild -a
cd run
create-table.exe
todo-service.exe -exe
```

The backend runs on `http://localhost:9100` by default.

### Web Frontend Setup
```bash
cd frontend/web
npm ci
npm run dev
```

### Mobile Frontend Setup
```bash
cd frontend/mobile
# See frontend/mobile/docs/DEVELOPMENT_ANDROID.md or DEVELOPMENT_MACOS.md
```

## REST API

| Method | Path              | Description                    |
|--------|-------------------|--------------------------------|
| GET    | `/todoitems`      | Get all todo items             |
| GET    | `/todoitems/{id}` | Get a specific todo item by id |
| POST   | `/todoitems`      | Create a new todo item         |
| PUT    | `/todoitems/{id}` | Update an existing todo item   |
| DELETE | `/todoitems/{id}` | Delete a todo item by id       |

## Tech Stack

**Backend**:
- Alaska Software Xbase++ MSA Framework
- Automated REST routing and type conversion
- Built-in health monitoring and process resilience

**Web Frontend**:
- PrimeVue + Vue 3 + Vite
- Tailwind CSS
- Data table with sorting, filtering, CSV export

**Mobile Frontend**:
- Quasar 2 + Vue 3 + Vite
- Cordova for iOS/Android
- Material Design UI

## Documentation

- [Backend README](backend/readme.md)
- [Web Frontend README](frontend/web/README.md)
- [Mobile Frontend README](frontend/mobile/README.md)
