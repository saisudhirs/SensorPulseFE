import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {Box, Button} from "@mui/material"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import login from "./hooks/useLogin";
import * as CryptoJS from 'crypto-js';

const hashString = (str: string): string => {
    return CryptoJS.SHA512(str).toString();
};


export default function Login() {
    const [state, setState] = useState({username: "", password: ""})
    const navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const onSubmit = () => {
        const hashedString = hashString(state.password)
        const LoginRequest = {username: state.username as string, pwd: hashedString as string}
        login(LoginRequest).then(r => {
            if (r) {
                navigate("/dashboard")
            }
        })
    }


    return <Box p={2}>
        <Paper>
            <Grid container direction={"column"} alignItems={"center"} gap={2} p={2}>
                <Grid>
                    <Typography variant={"h3"}> SensorPulse </Typography>
                </Grid>
                <Grid>
                    <TextField label={"Username"} name={"username"} onChange={onChange}/>
                </Grid>
                <Grid>
                    <TextField label={"Password"} type={"password"} name={"password"} onChange={onChange}/>
                </Grid>
                <Grid>
                    <Button onClick={onSubmit}>Login</Button>
                </Grid>
            </Grid>
        </Paper>
    </Box>
}