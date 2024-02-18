"use client";
import { Grid, Typography, Button } from '@mui/material';
import Question from './components/Question';
import { Context } from './context';
import { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from './firebase';

export default function Home() {
  const { user } = useContext(Context);
  const [modules, setModules] = useState([]);

  useEffect(  () => {
   getDocs(collection(firestoreDb, "modules")).then(docs => {
    let list = [];
    docs.forEach(doc => {
      list.push({id: doc.id, ...doc.data()});
    });
    setModules(list);
  })

  }, []);


  return (
    <Grid container spacing={4} padding={2}>
      <Grid item xs={12}>
        <Typography variant='h3'>
          Demo Project
        </Typography>
      </Grid>
      {
        modules.map(module => {
          return <Grid item xs={12} md={4} key={module.id}>
              <Typography variant='h6'>{module.title}</Typography>
              <Button variant='outlined' fullWidth href={`/questions/${module.id}`}>START</Button>
            </Grid>
        })
      }
    </Grid>
  );
}
