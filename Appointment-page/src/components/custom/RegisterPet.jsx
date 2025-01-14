import { useForm } from "react-hook-form"
import { Button } from "@shad/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@shad/form"
import { Input } from "@shad/input"
import { petQuestions } from "@custom/questions"
import { Textarea } from "@shad/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@shad/select"
import { RadioGroup, RadioGroupItem } from "@shad/radio-group"
import { usePetStore } from "@/StateZustand/authStore"

const PetForm = () => {
    const form = useForm({
        defaultValues: {
            name: "",
            species: "",
            race: "",
            comments: ""
        }
    });

    function onSubmit(data) {
        console.log(data);
        setUsers(data);
    }

    // Save form data to localStorage when fields change
    const onValueChange = (field, value) => {
        const currentData = localStorage.getItem("formData");
        const formData = currentData ? JSON.parse(currentData) : {};
        formData[field] = value;
        localStorage.setItem("formData", JSON.stringify(formData));
    };

    return (
        <div className="m-8 w-full flex justify-center items-center bg-gradient-to-b from-gray-200 to-gray-100 rounded-lg shadow-lg py-8">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-lg w-4/5">
                    {petQuestions.map((question) => (
                        <FormField
                            key={question.id}
                            control={form.control}
                            name={question.key}
                            rules={
                                question.rules
                            }
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{question.label}</FormLabel>
                                    <FormControl>
                                        {question.type === "text" ? (
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
                                                                className={field.value === option ? 'bg-black p-2 focus:ring-2' : 'bg-white p-2 border-gray-400'}
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
        </div>
    );
}

export default PetForm;