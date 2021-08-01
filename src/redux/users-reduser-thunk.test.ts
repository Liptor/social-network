import { follow } from './users-reducer';
import {userAPI, APIResponseType, ResultCodesEnum} from '../api/api'

jest.mock('../api/api')
const userAPIMock = userAPI

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    message: [],
    data: {}
}

//@ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result))

test('', async () => {
    const thunk = follow(1)

    const dispatchMock = jest.fn()
    
    // @ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)


})