export const userQuestions = [
    {
        id: 1,
        key: "name",
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        rules: {
            required: "Name is required",
            minLength: {
                value: 8,
                message: "Name must be at least 8 characters"
            },
        }
    },
    {
        id: 2,
        key: "email",
        type: "email",
        label: "E-mail",
        placeholder: "Enter your e-mail",
        rules: {
            required: "E-mail is required",
            minLength: {
                value: 3,
                message: "E-mail must be at least 3 characters"
            },
        }
    },
    {
        id: 3,
        key: "phone",
        type: "text",
        label: "Phone number",
        placeholder: "Enter your phone number",
        rules: {
            required: "Phone number is required",
            minLength: {
                value: 8,
                message: "Number must be at least 8 characters"
            },
        }
    },
    {
        id: 4,
        key: "password",
        type: "text",
        label: "Password",
        placeholder: "Create a password",
        rules: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
            },
            validate: {
                hasNumber: (value) =>
                    /\d/.test(value) || "Password must contain a number",
                hasUpperCase: (value) =>
                    /[A-Z]/.test(value) || "Password must contain an uppercase letter"
            }
        }
    },
    {
        id: 5,
        key: "gender",
        type: "select",
        label: "Gender",
        options: [
            "Male",
            "Female",
            "Other"
        ],
        rules: {
            required: "Select a gender"
        }
    },
    {
        id: 6,
        key: "source",
        type: "radio",
        label: "How did you hear about us?",
        options: [
            "Online",
            "Friends",
            "Marketing",
            "Others"
        ],
        rules:{
            required: false
        }
    }
];

export const petQuestions = [
    {
        id: 1,
        key: "name",
        type: "text",
        label: "Name",
        placeholder: "Enter your pet's name",
        rules: {
            required: "Name of pet is required",
            minLength: {
                value: 3,
                message: "Name must be at least 3 characters"
            },
        }
    },
    {
        id: 1,
        key: "species",
        type: "text",
        label: "Species",
        placeholder: "Enter your pet's species",
        rules: {
            required: "Species of pet is required",
            minLength: {
                value: 3,
                message: "Species must be at least 3 characters"
            },
        }
    },
    {
        id: 1,
        key: "race",
        type: "text",
        label: "Race",
        placeholder: "Enter your pet's race",
        rules: {
            required: "Race of pet is required",
            minLength: {
                value: 3,
                message: "Race must be at least 3 characters"
            },
        }
    },
    {
        id: 1,
        key: "comments",
        type: "textarea",
        label: "Extra comments for threatement",
        placeholder: "Allergies, color, operations...",
        rules: {
            required: false,
        }
    },
];