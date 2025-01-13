import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@shad/card"
import { Input } from "@shad/input"
import { Button } from "@shad/button"
import { Label } from "@shad/label"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/StateZustand/authStore"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@shad/form"
import { useForm } from "react-hook-form"

const LogInCard = () => {
    const navigate = useNavigate();
    const error = useAuthStore((state) => state.error);
    const setError = useAuthStore((state) => state.setError);
    const setUser = useAuthStore((state) => state.setUser);
    const setPassword = useAuthStore((state) => state.setPassword);

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    function onSubmit() {
        setUser(form.getValues("email"));
        navigate("/home");
    }

    // Save form data to localStorage when fields change
    const onValueChange = (field, value) => {
        if(field === "email") {
            setUser(value);
        }else{
            setPassword(value);
        }
        setError();
    };

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Log In</CardTitle>
                        <CardDescription>Get your credentials to start sesion</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name={"email"}
                            rules={{ 
                                required: "Email is required",
                                validate: () => {
                                    if(!error){
                                        return "Invalid credentials";
                                    }
                                }
                             }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="someone@example.com"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                onValueChange(field.name, e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"password"}
                            rules={{ 
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                },
                                validate: {
                                    hasNumber: (value) => 
                                        /\d/.test(value) || "Password must contain a number",
                                    hasUpperCase: (value) => 
                                        /[A-Z]/.test(value) || "Password must contain an uppercase letter",
                                    ifError: () => {
                                        if(!error){
                                            return "Invalid credentials";
                                        }
                                }
                            }}}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="1234"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                onValueChange(field.name, e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between flex-col space-y-3">
                        <Button className="w-full" type="submit">Log In</Button>
                        <p>Don't have an account?<Link to='/register' className="m-2 hover:text-blue-700 hover:underline">Register</Link></p>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}

export default LogInCard;