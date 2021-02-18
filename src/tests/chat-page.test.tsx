import Adapter from 'enzyme-adapter-react-16';
import { users } from './__mocks__/users';
import createTestStore from 'redux-test-store';
import React from 'react';
import { Provider } from 'react-redux';
import * as actionTypes from '../redux/actions/userLIstActions';
import { store } from '../redux/store';
import ChatPage from '../pages/chat/chat';
import { mount, configure } from 'enzyme';

configure({adapter: new Adapter()});

/** @test {ChatPage Component} */
describe('ChatPage Component', () => {
    let routerSpy;
    beforeEach(() => {
        routerSpy = spyOn(require('next/router'), 'useRouter').and.returnValue({
            push: () => {},
            reload: () => {},
            query: {id: 3}
        });
        const router = require('next/router').useRouter();
        routerSpy = spyOn(router, 'push')
        routerSpy = spyOn(router, 'reload')
    });
    it('should redirect without userlogged', () => {
        const wrapper = mount(
            <Provider store={store} >
                <ChatPage />
            </Provider>
        );
        expect(require('next/router').useRouter().push).toBeCalled();
        expect(require('next/router').useRouter().push).toBeCalledWith('/login');
    });
    it('should display user when userlogged', (done) => {
        const testStore = createTestStore(store, done);
        testStore.dispatch({
            type: actionTypes.SET_LOGGED_USER,
            payload: {user: users[0]}
        });
        const wrapper = mount(
            <Provider store={store} >
                <ChatPage />
            </Provider>
        );
        expect(require('next/router').useRouter().push).not.toBeCalled();
    });
});

