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

const LogInCard = () => {
    const navigate = useNavigate();
    const handleLogIn = () => {
        navigate('/home');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Log In</CardTitle>
                <CardDescription>Get your credentials to start sesion</CardDescription>
            </CardHeader>
            <CardContent>
                <Label>Email</Label>
                <Input type="email" placeholder="Email" />
                <Label>Password</Label>
                <Input type="password" placeholder="Password" />
            </CardContent>
            <CardFooter className="flex justify-between flex-col space-y-3">
                <Button className="w-full" onClick={handleLogIn}>Log In</Button>
                <p>Don't have an account?<Link to='/register' className="m-2 hover:text-blue-700 hover:underline">Register</Link></p>
            </CardFooter>
        </Card>
    );
}

export default LogInCard;