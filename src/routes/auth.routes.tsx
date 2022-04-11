import React from "react";
import { Switch, Route } from 'react-router-dom';

import Signin from "../pages/SignIn";

const AuthRoutes: React.FC = () => (
    <Switch>
        <Route component={Signin} />
    </Switch>
);

export default AuthRoutes;