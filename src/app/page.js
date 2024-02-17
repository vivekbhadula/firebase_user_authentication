import { Grid, Typography, Button } from '@mui/material';
import Question from './components/Question';

export default function Home() {
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
        <Button variant='contained' fullWidth>NEXT</Button>
      </Grid>
    </Grid>
  );
}
