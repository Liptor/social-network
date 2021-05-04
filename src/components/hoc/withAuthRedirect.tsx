import React from 'react'
import { Redirect } from 'react-router-dom'
import {connect } from 'react-redux'
import { AppStateType } from "../../redux/redux-store"

type HocPropsType = {
    isAuth: boolean
}

type HOC<PWrapped, PHoc> = React.ComponentClass<PWrapped & PHoc> | React.FC<PWrapped & PHoc>;

export const withAuthRedirect = <P, S>(Component: HOC<P, HocPropsType>) => {
    class RedirectComponent extends React.Component<P & HocPropsType, S> {
        public render(): JSX.Element {
            const {isAuth, ...props} = this.props as any
            return !isAuth ? <Redirect to="/login"/> : <Component {...props} />
        }
    }

    const mapStateToPropsForRedirect = (state: AppStateType): HocPropsType => ({
        isAuth: state.auth.isAuth,
    })

    // @ts-ignore
    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}