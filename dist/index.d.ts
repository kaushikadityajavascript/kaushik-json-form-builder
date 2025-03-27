import React from 'react';

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
declare const DynamicForm: React.FC<{
    schema: FormSchema;
    onSubmit: (data: any) => void;
}>;

export { DynamicForm };
