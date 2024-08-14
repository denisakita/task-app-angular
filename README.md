# TaskAppAngular

**TaskAppAngular** is an Angular application designed as a task management tool, featuring Angular Material for UI components, a mock backend using JSON Server, CRUD functionality, task export into CSV format, and a dashboard interface.

## Features

- **Angular Material (Latest Version)**: Provides modern UI components to enhance the application's look and feel.
- **JSON Server**: A mock backend for simulating RESTful API interactions with full CRUD (Create, Read, Update, Delete) operations.
- **Export to CSV**: Allows users to export tasks into a CSV file for easy sharing and reporting.
- **Dashboard**: A comprehensive dashboard to display and manage tasks efficiently.

## Development Server

To run the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code Scaffolding

Generate new components, directives, pipes, services, classes, guards, interfaces, enums, or modules using:

```bash
ng generate component component-name
```

## Build

To build the project:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

To execute the unit tests via Karma:

```bash
ng test
```

## Running End-to-End Tests

To execute the end-to-end tests via a platform of your choice:

```bash
ng e2e
```

*Note:* You need to add a package that implements end-to-end testing capabilities before running this command.

## Exporting Tasks to CSV

To export tasks to a CSV file, use the export functionality provided in the application. The CSV file will contain all the necessary details about your tasks.

## Dashboard

The dashboard provides a visual summary of tasks, with options to manage and filter tasks based on various criteria.

## JSON Server Setup

To set up the mock backend using JSON Server:

1. Install JSON Server if not already installed:
   ```bash
   npm install -g json-server
   ```

2. Run JSON Server with your `db.json`:
   ```bash
   json-server --watch src/assets/db.json
   ```

This will serve your `db.json` file at `http://localhost:3000/`, simulating a RESTful API for CRUD operations.

## Further Help

For more help on the Angular CLI, use:

```bash
ng help
```

Or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli).

---

