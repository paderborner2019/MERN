import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { LinksPage } from "./pages/linksPage";
import { CreatePage } from "./pages/createPage";
import { DetailPage } from "./pages/detailPage";
import { AuthPage } from "./pages/authPage";

export const useRoutes = isAuthenication => {
    if (isAuthenication) {
        return(
            <Switch>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>
                <Route>
                    <Redirect to="/create"/>
                </Route>
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Route>
                <Redirect to="/"/>
            </Route>
        </Switch>
    )
}