export const questions1 = [
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

export const questions2 = [
    {
        id: 1,
        type: "text",
        label: "Work",
        placeholder: "Where do you work?",
        required: true
    },
    {
        id: 2,
        type: "textarea",
        label: "Reasons",
        placeholder: "Why do you want to join?",
        required: true
    },
    {
        id: 3,
        type: "select",
        label: "Positions",
        options: [
            "Male",
            "Female",
            "Other"
        ],
        required: true
    },
    {
        id: 4,
        type: "radio",
        label: "Options",
        options: [
            "Online",
            "Friends",
            "Marketing",
            "Others"
        ],
        required: true
    },
    {
        id: 5,
        type: "checkbox",
        label: "Example",
        options: [
            "Tech",
            "sports",
            "Music",
            "Travel"
        ],
        required: false
    }
];