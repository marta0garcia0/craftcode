import Adapter from 'enzyme-adapter-react-16';
import { users } from './__mocks__/users';
import createTestStore from 'redux-test-store';
import React from 'react';
import { Provider } from 'react-redux';
import * as actionTypes from '../redux/actions/userLIstActions';
import { store } from '../redux/store';
import LoginPage from '../pages/login/login';
import { mount, configure } from 'enzyme';

configure({adapter: new Adapter()});

/** @test {LoginPage Component} */
describe('LoginPage Component', () => {
    let routerSpy;
    beforeEach(() => {
        routerSpy = spyOn(require('next/router'), 'useRouter').and.returnValue({
            push: () => {},
            reload: () => {}
        })
        const router = require('next/router').useRouter();
        routerSpy = spyOn(router, 'push');
        routerSpy = spyOn(router, 'reload');
    });
    it('should reload to get init props', () => {
        const wrapper = mount(
            <Provider store={store} >
                <LoginPage users={[]}/>
            </Provider>
        );
        expect(require('next/router').useRouter().reload).toBeCalled();
    });
    it('should not reload when users props are set', () => {
        const wrapper = mount(
            <Provider store={store} >
                <LoginPage users={users}/>
            </Provider>
        );
        expect(require('next/router').useRouter().reload).not.toBeCalled();
    });
    it('should click to see user', (done) => {
        const testStore = createTestStore(store, done);
        routerSpy = spyOn(testStore, 'dispatch');
        testStore.dispatch({
            type: actionTypes.SET_LOGGED_USER,
            payload: {user: users[0]}
        });
            const wrapper = mount(
            <Provider store={store} >
                <LoginPage users={users}/>
            </Provider>
        );
        expect(wrapper.find('.user-item')).toHaveLength(6);
        wrapper.find('.user-item').at(0).simulate('click');
        expect(require('next/router').useRouter().push).toBeCalledWith('/home');
        expect(testStore.dispatch).toBeCalledWith(
            {type: actionTypes.SET_LOGGED_USER, payload: {user: users[2]}}
        );
    });

});

