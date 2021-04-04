import React, {useEffect} from "react"
import {follow, unfollow, requestUsers} from "../../redux/users-reducer"
import {connect} from "react-redux"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {compose} from "redux"
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../redux/users-selector"
import {UsersType} from "../../redux/type/type"
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    totalUsersCount: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    users: Array<UsersType>,
}
type MapDispatchPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    getUsers: (currentPage: number, pageSize: number) => void,
}
type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const UsersContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    })

    const onPageChanged = (pageNumber: number) => {
        props.getUsers(pageNumber, props.pageSize)
    }

    return (
        <>
            {/*<h2>{props.pageTitle}</h2>*/}
            {props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={onPageChanged}
                users={props.users}
                follow={props.follow}
                unfollow={props.unfollow}
                followingInProgress={props.followingInProgress}
            />
        </>
    );
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
    (mapStateToProps,
        {
            follow,
            unfollow,
            getUsers: requestUsers,
        }),
    // withAuthRedirect
)(UsersContainer)