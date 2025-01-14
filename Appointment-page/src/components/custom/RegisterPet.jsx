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
import { usePetStore } from "@/StateZustand/authStore"
import { useAuthStore } from "@/StateZustand/authStore";

const PetForm = () => {
    const addPet = usePetStore((state) => state.addPet);
    const user = useAuthStore((state) => state.user);
    const currentUser = useAuthStore((state) => state.getUser(user));

    const form = useForm({
        defaultValues: {
            name: "",
            species: "",
            race: "",
            comments: "",
            owner: currentUser.name ? currentUser.name : "",
        }
    });

    function onSubmit(data) {
        data.owner = currentUser.name ? currentUser.name : "";
        addPet(data);
    }

    // Save form data to localStorage when fields change
    const onValueChange = (field, value) => {
        const currentData = localStorage.getItem("formData");
        const formData = currentData ? JSON.parse(currentData) : {};
        formData[field] = value;
        localStorage.setItem("formData", JSON.stringify(formData));
    };

    return (
        <div className="m-8 flex justify-center items-center bg-gradient-to-b from-gray-200 to-gray-100 rounded-lg shadow-lg py-8">
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