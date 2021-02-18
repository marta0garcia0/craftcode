import Adapter from 'enzyme-adapter-react-16';
import { users } from './__mocks__/users';
import createTestStore from 'redux-test-store';
import React from 'react';
import { Provider } from 'react-redux';
import * as actionTypes from '../redux/actions/userLIstActions';
import { store } from '../redux/store';
import UserPage from '../pages/user/user';
import { mount, configure } from 'enzyme';

configure({adapter: new Adapter()});

/** @test {UserPage Component} */
describe('UserPage Component', () => {
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
                <UserPage />
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
                <UserPage />
            </Provider>
        );
        expect(require('next/router').useRouter().push).not.toBeCalled();
    });
    it('should add as friend', (done) => {
        const testStore = createTestStore(store, done);
        testStore.dispatch({
            type: actionTypes.SET_LOGGED_USER,
            payload: {user: users[0]}
        });
        spyOn(testStore, 'dispatch');
        const wrapper = mount(
            <Provider store={store} >
                <UserPage />
            </Provider>
        );
        expect(wrapper.text()).toContain('The user doesn\'t exist');
    });
});

