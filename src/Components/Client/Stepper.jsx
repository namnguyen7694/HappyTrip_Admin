import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SelectSeats from "./SelectSeats";
import InformationForm from "./informationForm";
import { createTicket, cancelBooking } from "./../../Actions/ticket";
import NumberFormat from "react-number-format";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ["Chọn ghế trống", "Điền thông tin cá nhân", "Xác nhận thanh toán"];
}

function getStepContent(stepIndex, props) {
  switch (stepIndex) {
    case 0:
      return (
        <SelectSeats
          trip={props.trip}
          backgroundSeat={props.backgroundSeat}
          seatCodes={props.seatCodes}
          seatDisable={props.seatDisable}
          selectSeat={props.selectSeat}
        />
      );
    case 1:
      return <InformationForm info={props.info} setInfo={props.setInfo} />;
    case 2:
      const totalPrice = props.seatCodes.length * props.trip.price;
      return (
        <div>
          <Typography>
            Vui lòng kiểm tra thông tin ghế và tổng số tiền trước khi xác nhận
            thanh toán!
          </Typography>
          <Typography variant="h6">
            Mã số ghế: {props.seatCodes.join(", ")}
          </Typography>
          <Typography variant="h6">
            Tổng số tiền:
            <NumberFormat
              value={totalPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" VND"}
            />
          </Typography>
        </div>
      );
    default:
      return "Unknown stepIndex";
  }
}

const HorizontalStepper = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Đặt vé thành công, vui lòng kiểm tra thông tin trong email
            </Typography>
            <Button onClick={handleReset}>Đặt vé khác</Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              {getStepContent(activeStep, props)}
            </div>
            <div>
              {activeStep === 0 ? (
                <Button
                  onClick={() => props.cancelBooking()}
                  className={classes.backButton}
                >
                  HỦY
                </Button>
              ) : (
                <Button onClick={handleBack} className={classes.backButton}>
                  TRỞ VỀ
                </Button>
              )}
              {activeStep === 2 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    props.bookingTickets();
                    handleNext();
                  }}
                >
                  HOÀN TẤT
                </Button>
              ) : (
                <Button
                  disabled={props.seatCodes.length === 0}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  TIẾP TỤC
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default connect(null, {
  createTicket,
  cancelBooking
})(HorizontalStepper);
