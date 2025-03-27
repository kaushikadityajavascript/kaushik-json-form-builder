# kaushik-json-form-builder

A JSON-based dynamic form builder for React, built using `react-hook-form`. This library allows you to generate forms dynamically from a JSON schema, including support for validation, dynamic dropdowns, and API integration.

## Installation

```sh
npm install kaushik-json-form-builder
```

or

```sh
yarn add kaushik-json-form-builder
```

## Usage

Import the `DynamicForm` component and pass a form schema as props.

### Basic Example

```tsx
import React from "react";
import { DynamicForm } from "kaushik-json-form-builder";

const formSchema = {
  title: "User Registration",
  api: {
    method: "POST",
    url: "https://api.example.com/register",
  },
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      validation: { required: true, minLength: 3 },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      validation: {
        required: true,
        pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
      },
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: ["Male", "Female", "Other"],
      validation: { required: true },
    },
    {
      name: "dob",
      label: "Date of Birth",
      type: "date",
      validation: { required: true },
    },
    {
      name: "skills",
      label: "Skills",
      type: "checkbox",
      options: ["React", "Node.js", "MongoDB", "TypeScript"],
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      optionsApi: "https://restcountries.com/v3.1/all",
    },
    {
      name: "submitBtn",
      label: "Register",
      type: "button",
    },
  ],
};

const App = () => {
  return (
    <div>
      <h1>Dynamic Form Example</h1>
      <DynamicForm formSchema={formSchema} />
    </div>
  );
};

export default App;
```

## Form Schema Structure

The `formSchema` object should have the following structure:

- **title**: Form title.
- **api**: API configuration for form submission.
  - `method`: HTTP method (`GET`, `POST`, etc.).
  - `url`: API endpoint.
- **fields**: Array of field objects, where each field can have:
  - `name`: Unique field name (required).
  - `label`: Field label.
  - `type`: Input type (`text`, `email`, `password`, `date`, `radio`, `checkbox`, `select`, `button`).
  - `placeholder`: Input placeholder (optional).
  - `validation`: Validation rules (e.g., `{ required: true, minLength: 3 }`).
  - `options`: Array of options for `radio`, `checkbox`, and `select` fields.
  - `optionsApi`: API endpoint for dynamically fetching `select` options.

## Supported Input Types

- **Text Inputs** (`text`, `email`, `password`, `date`)
- **Radio Buttons** (`radio` with `options` array)
- **Checkboxes** (`checkbox` with `options` array)
- **Dropdown Select** (`select` with `options` or `optionsApi` for dynamic data)
- **Button** (`button` to submit the form)

## Features

✅ Dynamic form generation from JSON schema\
✅ Client-side validation using `react-hook-form`\
✅ Supports text, email, password, date, radio, checkbox, and select inputs\
✅ API integration for form submission\
✅ Fetch dynamic dropdown options from an API\
✅ Simple and customizable

## License

MIT © 2025 Kaushik Aditya
