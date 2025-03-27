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
var src_exports = {};
__export(src_exports, {
  DynamicForm: () => DynamicForm_default
});
module.exports = __toCommonJS(src_exports);

// src/DynamicForm.tsx
var import_react = require("react");
var import_react_hook_form = require("react-hook-form");
var import_axios = __toESM(require("axios"));
var import_bootstrap_min = require("bootstrap/dist/css/bootstrap.min.css");
var import_jsx_runtime = require("react/jsx-runtime");
var DynamicForm = ({ schema, onSubmit }) => {
  const { register, handleSubmit, watch, setValue } = (0, import_react_hook_form.useForm)();
  const [dropdownOptions, setDropdownOptions] = (0, import_react.useState)({});
  const [files, setFiles] = (0, import_react.useState)({});
  const formValues = watch() || {};
  ;
  (0, import_react.useEffect)(() => {
    const fetchedUrls = /* @__PURE__ */ new Set();
    schema.fields.forEach((field) => {
      if (field.optionsApi && !fetchedUrls.has(field.optionsApi)) {
        fetchedUrls.add(field.optionsApi);
        console.log(`Fetching dropdown options from: ${field.optionsApi}`);
        import_axios.default.get(field.optionsApi).then((response) => {
          console.log(`API Response for ${field.name}:`, response.data);
          const data = response.data || [];
          setDropdownOptions((prev) => ({
            ...prev,
            [field.name]: data.length > 0 ? data.map((item) => item.name?.common || item.title || item.name) : ["No options available"]
          }));
        }).catch((error) => console.error(`Error fetching options for ${field.name}:`, error));
      }
    });
  }, []);
  const handleFileChange = (event, fieldName) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFiles((prev) => ({ ...prev, [fieldName]: file }));
    }
  };
  const processSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    Object.keys(files).forEach((key) => {
      if (files[key])
        formData.append(key, files[key]);
    });
    (0, import_axios.default)({
      method: schema.api.method,
      url: schema.api.url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    }).then((res) => onSubmit(res.data)).catch((err) => console.error("Error:", err));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container mt-4", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "mb-3", children: schema.title }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleSubmit(processSubmit), className: "p-4 border rounded shadow", children: [
      schema.fields.map((field) => {
        if (field.dependsOn && formValues[field.dependsOn] !== field.showIf)
          return null;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label", children: field.label }),
          ["text", "email", "password", "number", "date"].includes(field.type) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: field.type,
              className: "form-control",
              placeholder: field.placeholder,
              ...register(field.name, field.validation)
            }
          ),
          field.type === "radio" && field.options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "form-check", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "radio",
                className: "form-check-input",
                value: option,
                ...register(field.name, field.validation)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-check-label", children: option })
          ] }, option)),
          field.type === "checkbox" && field.options?.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "form-check", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "checkbox",
                className: "form-check-input",
                value: option,
                ...register(field.name)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-check-label", children: option })
          ] }, option)),
          field.type === "select" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "form-select", ...register(field.name), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: "", children: [
              "Select ",
              field.label
            ] }),
            (dropdownOptions[field.name] || field.options || []).map((option, index) => {
              const isObject = typeof option === "object" && option !== null;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "option",
                {
                  value: isObject ? option.name : option,
                  children: isObject ? option.name : option
                },
                isObject ? option.id || index : index
              );
            })
          ] }),
          field.type === "file" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "file",
              className: "form-control",
              onChange: (e) => handleFileChange(e, field.name)
            }
          )
        ] }, field.name);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "submit", className: "btn btn-primary w-100", children: "Submit" })
    ] })
  ] });
};
var DynamicForm_default = DynamicForm;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DynamicForm
});
