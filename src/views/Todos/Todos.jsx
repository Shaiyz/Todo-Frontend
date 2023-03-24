import { useEffect, useState } from "react";
import {
  Hidden,
  makeStyles,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { Menu, ExpandLess, ExpandMore } from "@material-ui/icons";
import TodosTable from "./TodosTable/TodosTable";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "../../redux-store";

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: "30px",
  },
  tabBtn: {
    color: "black",
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left",
    padding: "10px",
    fontWeight: 500,
    fontSize: 14,

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  activeTabBtn: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  subscreen: {
    border: "1px solid black",
    borderRadius: 10,
    padding: 15,
    marginTop: 25,
  },
}));

function Todos() {
  const [openTab, setOpenTab] = useState(false);
  const { todos } = useSelector((state) => state.todos);
  const classes = useStyles();
  const toggleTabView = () => {
    setOpenTab((prev) => !prev);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoAction.listTodos());
  }, []);

  return (
    <Container maxWidth="lg">
      <Hidden only={["lg", "xl", "md"]}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onClick={toggleTabView}
        >
          <Typography variant="h6">
            <Menu />
            Menu
          </Typography>
          {openTab ? <ExpandLess /> : <ExpandMore />}
        </div>
      </Hidden>
      <Grid container spacing={4}>
        <Grid item xs={12} md={9} lg={10}>
          <div className={classes.subscreen}>
            <TodosTable todos={todos} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Todos;
