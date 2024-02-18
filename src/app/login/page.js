"use client";
import {
    Grid,
    Typography,
    Button
} from "@mui/material";
import { Context } from '@/app/context';
import { useContext } from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/app/firebase";

export default function Login() {
    const { user, setUser } = useContext(Context);

    function handleGmailLogin() {
        signInWithPopup(auth, googleProvider)
        .then(result => {
            setUser(result.user)
            localStorage.setItem("user", result.user);
        })
        .catch(err => {
            setUser(null)
            localStorage.setItem("user", null)
        });

    }

    return(
        <Grid container spacing={2} padding={2}>
            <Grid item xs={12}>
                {
                    user ?
                    <Typography variant="h6">
                        You are already logged.
                    </Typography>
                    :
                    <Button variant="contained" fullWidth onClick={handleGmailLogin}>Login with GMAIL</Button>
                }
            </Grid>
        </Grid>
    );
}