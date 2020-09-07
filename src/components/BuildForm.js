import React from "react";
import { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
// import InsertImage from './InsertImage'
import UploadButton from "./UploadButton";
import RadioButtons from "./RadioButtons";
import DetailsEntry from "./DetailsEntry";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Suman Michael
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Upload Image", "Quiz Details", "Filling the key"];

export default function BuildForm() {
  const [displayUrl, setDisplayUrl] = useState("None2");

  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [mcqs, setMcqs] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [quizCount, setQuizCount] = React.useState(5);

  function getStepContent(step, handleQuizCount, quizCount) {
    switch (step) {
      case 0:
        return <UploadButton handleInputImage={(image) => setImage(image)} />;
      case 1:
        return (
          <DetailsEntry onChange={handleQuizCount} quizCount={quizCount} />
        );
      case 2:
        return (
          <RadioButtons
            number={quizCount}
            image={image}
            handleMcqsChange={(mcqs) => setMcqs(mcqs)}
          ></RadioButtons>
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleSendData = React.useCallback(() => {
    if (image && !(Object.keys(mcqs).length === 0)) {
      console.log("Ready to Go");

      const formData = new FormData();
      formData.append("image", image);
      formData.append("length",Object.keys(mcqs).length);
      for(var key in mcqs) {
        formData.append(key, mcqs[key]);
      }

      axios
        .post("http://localhost:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          setDisplayUrl("URL");
        })
        .catch((err) => console.log(err));
    }
  },[image,mcqs]);

  const handleQuizCount = (e) => {
    setQuizCount(e.target.value);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  React.useEffect(() => {
    console.log(activeStep);
    if (activeStep === steps.length ){
      handleSendData();
    }
  }, [activeStep,handleSendData]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Quiz Form Builder
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Build A Form
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Created Quiz Form successfully.
                </Typography>
                <Typography variant="subtitle1">
            Please use this link ___{displayUrl}___ to start the quiz.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, handleQuizCount, quizCount)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Create Form" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
