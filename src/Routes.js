import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {
   TodosScreen,
} from "./views";

const Routes = () => {
  let routes = (
    <>
      <Route path="/" exact component={TodosScreen} />
      <Redirect from="*" to="/" />
    </>
  );

  return (
    <BrowserRouter basename="/">
      <Switch>{routes}</Switch>
    </BrowserRouter>
  );
};

export default Routes;
