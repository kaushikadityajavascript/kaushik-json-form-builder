var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  DynamicForm: () => DynamicForm_default
});
module.exports = __toCommonJS(index_exports);

// src/DynamicForm.tsx
var import_react = require("react");
var import_react_hook_form = require("react-hook-form");
var import_axios = __toESM(require("axios"));
var import_jsx_runtime = require("react/jsx-runtime");
var formSchema = {
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
var DynamicForm = () => {
  const { register, handleSubmit } = (0, import_react_hook_form.useForm)();
  const [dropdownOptions, setDropdownOptions] = (0, import_react.useState)({});
  (0, import_react.useEffect)(() => {
    formSchema.fields.forEach((field) => {
      if (field.optionsApi) {
        import_axios.default.get(field.optionsApi).then((response) => {
          if (field.name === "country") {
            setDropdownOptions((prev) => ({
              ...prev,
              [field.name]: response.data.map((country) => country.name.common)
            }));
          }
        }).catch((error) => console.error("Error fetching options:", error));
      }
    });
  }, []);
  const onSubmit = (data) => {
    console.log("Submitting form:", data);
    (0, import_axios.default)({
      method: formSchema.api.method,
      url: formSchema.api.url,
      data
    }).then((res) => console.log("Success:", res.data)).catch((err) => console.error("Error:", err));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleSubmit(onSubmit), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: formSchema.title }),
    formSchema.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: field.label }),
      ["text", "email", "password", "date"].includes(field.type) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          type: field.type,
          placeholder: field.placeholder,
          ...register(field.name)
        }
      ),
      field.type === "radio" && field.options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", value: option, ...register(field.name) }),
        option
      ] }, option)),
      field.type === "checkbox" && field.options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", value: option, ...register(field.name) }),
        option
      ] }, option)),
      field.type === "select" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { ...register(field.name), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: "", children: [
          "Select ",
          field.label
        ] }),
        dropdownOptions[field.name]?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: option, children: option }, option))
      ] }),
      field.type === "button" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "submit", children: field.label })
    ] }, field.name))
  ] });
};
var DynamicForm_default = DynamicForm;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DynamicForm
});
