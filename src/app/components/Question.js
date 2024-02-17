import {
    Typography,
    Grid,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@mui/material";
export default function Question() {
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Question 1
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    Question 1 text
                </Typography>
            </Grid>

            <Grid item xs={12}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Answer</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="a1" control={<Radio />} label="Answer 1" />
                    <FormControlLabel value="a2" control={<Radio />} label="Answer 2" />
                    <FormControlLabel value="a3" control={<Radio />} label="Answer 3" />
                </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
}