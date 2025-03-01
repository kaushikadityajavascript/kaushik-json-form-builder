import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validation?: any;
  options?: string[];
  optionsApi?: string;
}

interface FormSchema {
  title: string;
  api: {
    method: string;
    url: string;
  };
  fields: FormField[];
}

const formSchema: FormSchema = {
  title: "User Registration",
  api: {
    method: "POST",
    url: "https://api.example.com/register"
  },
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      validation: { required: true, minLength: 3 }
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      validation: { required: true, pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$" }
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: ["Male", "Female", "Other"],
      validation: { required: true }
    },
    {
      name: "dob",
      label: "Date of Birth",
      type: "date",
      validation: { required: true }
    },
    {
      name: "skills",
      label: "Skills",
      type: "checkbox",
      options: ["React", "Node.js", "MongoDB", "TypeScript"]
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      optionsApi: "https://restcountries.com/v3.1/all"
    },
    {
      name: "submitBtn",
      label: "Register",
      type: "button"
    }
  ]
};

const DynamicForm: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [dropdownOptions, setDropdownOptions] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    // Fetch dynamic dropdown options
    formSchema.fields.forEach((field) => {
      if (field.optionsApi) {
        axios.get(field.optionsApi)
          .then((response) => {
            if (field.name === "country") {
              setDropdownOptions((prev) => ({
                ...prev,
                [field.name]: response.data.map((country: any) => country.name.common)
              }));
            }
          })
          .catch((error) => console.error("Error fetching options:", error));
      }
    });
  }, []);

  const onSubmit = (data: any) => {
    console.log("Submitting form:", data);
    axios({
      method: formSchema.api.method,
      url: formSchema.api.url,
      data: data
    })
      .then((res) => console.log("Success:", res.data))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{formSchema.title}</h2>
      {formSchema.fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>

          {/* Text, Email, Password, Date Input */}
          {["text", "email", "password", "date"].includes(field.type) && (
            <input
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name)}
            />
          )}

          {/* Radio Buttons */}
          {field.type === "radio" && (
            field.options?.map((option) => (
              <label key={option}>
                <input type="radio" value={option} {...register(field.name)} />
                {option}
              </label>
            ))
          )}

          {/* Checkboxes */}
          {field.type === "checkbox" && (
            field.options?.map((option) => (
              <label key={option}>
                <input type="checkbox" value={option} {...register(field.name)} />
                {option}
              </label>
            ))
          )}

          {/* Dropdown Select */}
          {field.type === "select" && (
            <select {...register(field.name)}>
              <option value="">Select {field.label}</option>
              {dropdownOptions[field.name]?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}

          {/* Submit Button */}
          {field.type === "button" && <button type="submit">{field.label}</button>}
        </div>
      ))}
    </form>
  );
};

export default DynamicForm;
