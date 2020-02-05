import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';   //npm i --save date-fns@next @date-io/date-fns
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';   //npm i @material-ui/pickers

export default function TimePicker(props) {
  const nowTime = new Date ();
  const startTime = props.startTime || nowTime;
  const [selectedDate, setSelectedDate] = React.useState(startTime);

  React.useEffect( () => {
    if (props.startTime ) {
      setSelectedDate(startTime);
    }
}, [props.startTime, startTime])

  const handleDateChange = date => {
    setSelectedDate(date);
    props.onChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="center">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Chọn ngày"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Chọn giờ"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}