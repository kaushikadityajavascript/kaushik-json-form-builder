import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validation?: any;
  options?: string[];
  optionsApi?: string;
  dependsOn?: string; 
  showIf?: string | boolean;
}

interface FormSchema {
  title: string;
  api: {
    method: string;
    url: string;
  };
  fields: FormField[];
}

const DynamicForm: React.FC<{ schema: FormSchema; onSubmit: (data: any) => void }> = ({ schema, onSubmit }) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [dropdownOptions, setDropdownOptions] = useState<{ [key: string]: string[] }>({});
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  // Watch form values to handle conditional field visibility
  const formValues = watch() || {};;

 useEffect(() => {
  const fetchedUrls = new Set<string>();

  schema.fields.forEach((field) => {
    if (field.optionsApi && !fetchedUrls.has(field.optionsApi)) {
      fetchedUrls.add(field.optionsApi);
      console.log(`Fetching dropdown options from: ${field.optionsApi}`);

      axios.get(field.optionsApi)
        .then((response) => {
          console.log(`API Response for ${field.name}:`, response.data);
          const data = response.data || [];

          setDropdownOptions((prev) => ({
            ...prev,
            [field.name]: data.length > 0
              ? data.map((item: any) => item.name?.common || item.title || item.name)
              : ["No options available"],
          }));
        })
        .catch((error) => console.error(`Error fetching options for ${field.name}:`, error));
    }
  });
}, []);

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFiles((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  const processSubmit = (data: any) => {
    const formData = new FormData();

    // Append all form fields
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append file uploads
    Object.keys(files).forEach((key) => {
      if (files[key]) formData.append(key, files[key]!);
    });

    axios({
      method: schema.api.method,
      url: schema.api.url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => onSubmit(res.data))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="container mt-4" onClick={(e) => e.stopPropagation()}>
      <h2 className="mb-3">{schema.title}</h2>
      <form onSubmit={handleSubmit(processSubmit)} className="p-4 border rounded shadow">
        {schema.fields.map((field) => {
          // Check if the field has conditional visibility
          if (field.dependsOn && formValues[field.dependsOn] !== field.showIf) return null;

          return (
            <div key={field.name} className="mb-3">
              <label className="form-label">{field.label}</label>

              {/* Text, Email, Password, Number, Date, Textarea */}
              {["text", "email", "password", "number", "date"].includes(field.type) && (
                <input
                  type={field.type}
                  className="form-control"
                  placeholder={field.placeholder}
                  {...register(field.name, field.validation)}
                />
              )}

              {/* Radio Buttons */}
              {field.type === "radio" &&
                field.options?.map((option) => (
                  <div key={option} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      value={option}
                      {...register(field.name, field.validation)}
                    />
                    <label className="form-check-label">{option}</label>
                  </div>
                ))}

              {/* Checkboxes */}
              {field.type === "checkbox" &&
                field.options?.map((option) => (
                  <div key={option} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={option}
                      {...register(field.name)}
                    />
                    <label className="form-check-label">{option}</label>
                  </div>
                ))}

              {/* Dropdown Select */}
               {field.type === "select" && (
  <select className="form-select" {...register(field.name)}>
    <option value="">Select {field.label}</option>
    {(dropdownOptions[field.name] || field.options || []).map((option, index) => {
      // Type Guard to check if option is an object
      const isObject = typeof option === "object" && option !== null;
      return (
        <option 
          key={isObject ? (option as any).id || index : index} // Ensure key is unique
          value={isObject ? (option as any).name : option} // Extract name if object, else use string
        >
          {isObject ? (option as any).name : option} 
        </option>
      );
    })}
  </select>
)}
              {/* File Upload */}
              {field.type === "file" && (
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleFileChange(e, field.name)}
                />
              )}
            </div>
          );
        })}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
