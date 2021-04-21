import React, {useEffect} from "react"
import { observer } from "mobx-react-lite"
import AppState from './mobX/app'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import {Route, BrowserRouter, withRouter} from "react-router-dom"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import UsersContainer from "./components/Users/UsersContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import LoginPage from "./components/Login/LoginContainer"
import Preloader from "./components/common/Preloader/Preloader"
import {initializeApp} from "./redux/app-reducer"
import {AppStateType} from "./redux/redux-store"
import NavbarContainer from "./components/Navbar/NavbarContainer"

type AddType = {
    initializeApp: () => void
    initialized: boolean
    store: AppStateType
    pageTitle: string
}

const App: React.FC<AddType> = observer(({initializeApp, initialized}) => {
    useEffect(() => {
        AppState.initializeApp()
    }, [initializeApp])

    if (!AppState.initialized) {
        return <Preloader/>
    }


    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavbarContainer/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" component={DialogsContainer}/>
                    <Route path="/profile/:userId?" component={ProfileContainer}/>
                    <Route path="/news" component={News}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/users" component={UsersContainer}/>
                </div>
            </div>
        </BrowserRouter>
    )
})

export default compose(
    withRouter,
    connect(, {initializeApp})
)(App)
