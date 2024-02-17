"use client";
import { Grid, Typography, Button } from '@mui/material';
import Question from './components/Question';
import { Context } from './context';
import { useContext } from 'react';

export default function Home() {
  const { user } = useContext(Context);
  return (
    <Grid container spacing={2} paddingY={2}>
      <Grid item xs={12}>
        <Typography variant='h3'>
          Demo Project
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Question />
      </Grid>


      <Grid item xs={12}>
        <Button variant='contained' fullWidth disabled={user == null}>NEXT</Button>
      </Grid>
    </Grid>
  );
}
