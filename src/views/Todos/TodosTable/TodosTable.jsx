import { useState } from "react";
import { Box, ButtonGroup, IconButton, useTheme } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import Table from "../../../components/Table/Table";
import DialogForm from "../../../components/DialogForm/DialogForm";
import { TodoformConfig } from "./formData";
import { todoAction } from "../../../redux-store";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const TodosTable = ({ todos }) => {
  const theme = useTheme();
  const { loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [todoEditModal, setTodoEditModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const toggleDialog = (openDialog, todo) => {
    setTodoToEdit(todo);
    setTodoEditModal(openDialog);
  };

  const editTodo = (e, todo) => {
    e.stopPropagation();
    setTodoToEdit(todo);
    setTodoEditModal(true);
  };
  const deleteTodo = (e, todo) => {
    e.stopPropagation();
    dispatch(todoAction.deleteTodo(todo));

  };

  const edit = async (val) => {
    if (todoToEdit !== null) {
      let editObj = {
        id: todoToEdit._id,
        status: val.status.value,
        description: val.description.value,
        task: val.task.value,
      };
      dispatch(todoAction.editTodo(editObj));
    } else {
      let addObj = {
        task: val.task.value,
        description: val.description.value,
        status: val.status.value,
      };
      dispatch(todoAction.addTodo(addObj));
    }
  };
  console.log(todos)
  return loading ? (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        marginTop: 70,
      }}
    >
      <ClipLoader color={"#000000"} loading={loading} size={40} />
    </div>
  ) : (
    <div>
      <Box display="flex" justifyContent="space-between">
        <IconButton
          title="Add New Todo"
          onClick={() => {
            setTodoToEdit(null);
            setTodoEditModal(true);
          }}
        >
          <Add />
        </IconButton>
      </Box>
      <br />
      <Table
        columns={[
          { title: "Name", field: "task" },
          { title: "Status", field: "status" },
          { title: "Description", field: "description" },
          { title: "Actions", field: "actions", filtering: false },
        ]}
        options={{
          toolbar: false,
          headerStyle: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.white,
            fontWeight: 500,
            fontSize: 14,
          },
          rowStyle: {
            alignItems: "center",
          },
          search: false,
          filtering: true,
          title: false,
          grouping: true,
        }}
        data={todos?.map((todo) => ({
          task: todo.task,
          description:todo.description,
          status: todo.status===true?'Completed':'Pending',

          actions: (
            <ButtonGroup>
              {
                <>
                  <IconButton
                    title="Edit Todo"
                    onClick={(e) => {
                      editTodo(e, todo);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    title="Delete Todo"
                    onClick={(e) => {
                      deleteTodo(e, todo);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
            </ButtonGroup>
          ),
        }))}
      ></Table>
      <DialogForm
        open={todoEditModal}
        onClose={() => toggleDialog(false, null)}
        formData={todoToEdit ? { ...todoToEdit } : null}
        formConfig={TodoformConfig}
        onSubmit={(formState) => edit(formState)}
        title={todoToEdit ? "Edit Todo" : "Add Todo"}
      />
    </div>
  );
};

export default TodosTable;
