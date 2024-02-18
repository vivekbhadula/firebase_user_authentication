"use client";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { firestoreDb } from '@/app/firebase';
import * as React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Context } from '@/app/context';

import {
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  CircularProgress
} from "@mui/material";
 export default function QuestionModules({ params }) {
  const { moduleid } = params;
  const [module, setModule] = useState(null);

  const [steps, setSteps] = React.useState([]);
  const [submitAnswerDialog, setSubmitAnswerDialog] = useState(false);
  const { user } = useContext(Context);

  
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  function handleRadioSelect(event){
    const { value } = event.target;
    let stepTemp = [...steps];
    stepTemp[activeStep].userAnswer = value;
    setSteps(stepTemp);
  }

  useEffect( () => {
    const fetchData = async () => {
      const mdoc = await getDoc(doc(firestoreDb, "modules", moduleid));
      if (mdoc.exists()) {
        const moduledata = mdoc.data();
        const stepsUpdate = [];
        await Promise.all(moduledata.questions.map(async q => {
          const qdoc = await getDoc(doc(firestoreDb, "questions", q));
          if (qdoc.exists()) {
            const qdata = qdoc.data();
            stepsUpdate.push({ id: qdoc.id, ...qdata });
          }
        }));
        setSteps(stepsUpdate);
      }
    };
  
    fetchData();
  }, [moduleid]);

  function submitAnswer() {
    getDoc(doc(firestoreDb, "questions", steps[activeStep].id)).then(doccheck => {
      if (doccheck.exists()) {
        let data = doccheck.data();
        let check = data.usersAnswer.filter(d => d.user == user.email);
        if (check.length > 0) {
          alert("You cannot answer multiple time!");
        }
        else {
          updateDoc(doc(firestoreDb, "questions", steps[activeStep].id), { usersAnswer: arrayUnion({
            user: user.email,
            answer: steps[activeStep].userAnswer
          }) })
          .then(ok => {
            if (activeStep + 1 == steps.length) {
              alert("Congrats! Quiz completed");
              window.location.href = "/"
            }
            setActiveStep(activeStep + 1);
          })
        }
      }
    })
    setSubmitAnswerDialog(false)
  }

  return (
    <>
    <Dialog
        open={submitAnswerDialog}
        onClose={() => setSubmitAnswerDialog(false)}
      >
        <DialogTitle>Submit Anser</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to submit this answer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitAnswerDialog(false)}>Cancel</Button>
          <Button onClick={submitAnswer}>Send Answer</Button>
        </DialogActions>
      </Dialog>
    <Box sx={{ width: '100%', marginY: 2 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((question, index) => {
          return (
            <Step key={question.id}>
              <StepLabel>Question {index + 1}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {
        steps[activeStep] ? 
        <React.Fragment>

        <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep].title}</Typography>
        <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep].descr}</Typography>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Answer</FormLabel>
          <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
          >
            {
              steps[activeStep].answer.map((answ, answIndex) => {
                return(
                  <FormControlLabel onChange={handleRadioSelect} key={`answer-${answIndex}`} value={answ} control={<Radio onSelect={handleRadioSelect} />} label={answ} />
                );
              })
            }
          </RadioGroup>
          </FormControl>
        <Button variant="contained" disabled={(steps[activeStep] && !steps[activeStep].userAnswer) || !user} fullWidth onClick={() => setSubmitAnswerDialog(true)}>NEXT</Button>
      </React.Fragment>
        :
        <CircularProgress />
      }
    </Box>
    </>
  );
}