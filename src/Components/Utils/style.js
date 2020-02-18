import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    card: {
      minWidth: 275,
      margin: 20
    },
  
    title: {
      color: "#c9620f",
      textDecoration: "none",
      fontSize : "24px"
    },
    link: {
      color: "#0b6077d6",
      textDecoration: "none",
      fontSize : "16px"
    },
    image: {
      width: 200,
      height: 160
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }
  });

  export default useStyles