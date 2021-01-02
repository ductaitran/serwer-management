import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
  },
}));

export default function Schedule(props) {
  const classes = useStyles();
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    // console.log(dateTime);
    props.value(dateTime);
  }, [dateTime]);

  function handleChange(e) {  
    // console.log(e.target.value)
    setDateTime(e.target.value)    
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Next action"
        type="datetime-local"
        defaultValue=""
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
    </form>
  );
}
