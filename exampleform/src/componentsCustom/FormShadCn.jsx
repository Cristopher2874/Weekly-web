import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { ShadSchema } from "../../schemas/ShadSchema";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { questions1 } from "./FormBase";
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react";

function ProfileForm() {
    const form = useForm({
        resolver: zodResolver(ShadSchema),
        defaultValues: {
            name: "",
            "e-mail": "",
            message: "",
            "phone number": "",
            gender: "",
            "how did you hear about us?": "",
        }
    });

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('formData');
        return saved ? JSON.parse(saved) : {};
    });
    // Update localStorage when state changes
    useEffect(() => {
        const savedData = localStorage.getItem("formData");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            Object.keys(parsedData).forEach((key) => {
                form.setValue(key, parsedData[key]);
            });
        }
    }, [form]);

    const saveToLocalStorage = (formData) => {
        try {
            const existingData = localStorage.getItem('formData');
            let dataArray = [];

            if (existingData) {
                try {
                    const parsed = JSON.parse(existingData);
                    dataArray = Array.isArray(parsed) ? parsed : [parsed];
                } catch (parseError) {
                    console.error('Error parsing existing data:', parseError);
                    dataArray = [];
                }
            }

            dataArray.push({
                ...formData,
                timestamp: new Date().toISOString()
            });

            localStorage.setItem('formData', JSON.stringify(dataArray));
            console.log('Data saved successfully');
            exportToJSON();
            localStorage.clear();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const exportToJSON = () => {
        const formData = localStorage.getItem('formData');
        if (formData) {
            const dataStr = JSON.stringify(JSON.parse(formData), null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

            const exportFileDefaultName = 'form-data.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        }
    };

    const onSubmit = (data) => {
        saveToLocalStorage(data)
        console.log(data);
    };

    // Save form data to localStorage when fields change
    const onValueChange = (field, value) => {
        const currentData = localStorage.getItem("formData");
        const formData = currentData ? JSON.parse(currentData) : {};
        formData[field] = value;
        localStorage.setItem("formData", JSON.stringify(formData));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {questions1.map((question) => (
                    <FormField
                        key={question.id}
                        control={form.control}
                        name={question.label.toLowerCase()}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{question.label}</FormLabel>
                                <FormControl>
                                    {question.type === "text" || question.type === "email" ? (
                                        <Input
                                            type={question.type}
                                            placeholder={question.placeholder}
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                onValueChange(field.name, e.target.value);
                                            }}
                                        />
                                    ) : question.type === "textarea" ? (
                                        <Textarea
                                            placeholder={question.placeholder}
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                onValueChange(field.name, e.target.value);
                                            }}
                                        />
                                    ) : question.type === "select" ? (
                                        <Select onValueChange={(value) => {
                                            field.onChange(value);
                                            onValueChange(field.name, value);
                                        }}
                                            value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {question.options.map((option, index) => (
                                                    <SelectItem key={index} value={option}>{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : question.type === "radio" ? (
                                        <RadioGroup
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                onValueChange(field.name, value);
                                            }}
                                            value={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {question.options.map((option, index) => (
                                                <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={option}
                                                            id={`${field.name}-${index}`}
                                                            className={field.value === option ? 'bg-white p-2 focus:ring-2' : 'bg-black p-2 border-gray-400'}
                                                        />
                                                    </FormControl>
                                                    <FormLabel htmlFor={`${field.name}-${index}`} className="font-normal">
                                                        {option}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    ) : question.type === "checkbox" ? (
                                        <>
                                        </>
                                    ) : null}
                                </FormControl>
                                <FormDescription>
                                    {question.description}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button type="submit" variant="destructive" size="sm">Submit</Button>
            </form>
        </Form>
    );
}

export default ProfileForm;
