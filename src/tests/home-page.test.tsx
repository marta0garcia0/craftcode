import Adapter from 'enzyme-adapter-react-16';
import { users } from './__mocks__/users';
import createTestStore from 'redux-test-store';
import React from 'react';
import { Provider } from 'react-redux';
import * as actionTypes from '../redux/actions/userLIstActions';
import { store } from '../redux/store';
import HomePage from '../pages/home/home';
import { mount, configure } from 'enzyme';

configure({adapter: new Adapter()});

/** @test {HomePage Component} */
describe('HomePage Component', () => {
    let routerSpy;
    beforeEach(() => {
        routerSpy = spyOn(require('next/router'), 'useRouter').and.returnValue({
            push: () => {},
            reload: () => {}
        })
        const router = require('next/router').useRouter();
        routerSpy = spyOn(router, 'push')
        routerSpy = spyOn(router, 'reload')
    });
    it('should redirect without userlogged', () => {
        const wrapper = mount(
            <Provider store={store} >
                <HomePage users={users}/>
            </Provider>
        );
        expect(require('next/router').useRouter().push).toBeCalled();
        expect(require('next/router').useRouter().push).toBeCalledWith('/login');
    });
    it('should display home when userlogged and reload to get the user list', (done) => {
        const testStore = createTestStore(store, done);
        testStore.dispatch({
            type: actionTypes.SET_LOGGED_USER,
            payload: {user: users[0]}
        });
        const wrapper = mount(
            <Provider store={store} >
                <HomePage users={[]}/>
            </Provider>
        );
        expect(require('next/router').useRouter().push).not.toBeCalled();
        expect(require('next/router').useRouter().reload).toBeCalled();
    });
    it('should display home when userlogged and user list', (done) => {
        const testStore = createTestStore(store, done);
        testStore.dispatch({
            type: actionTypes.SET_LOGGED_USER,
            payload: {user: users[0]}
        });
        const wrapper = mount(
            <Provider store={store} >
                <HomePage users={users}/>
            </Provider>
        );
        expect(require('next/router').useRouter().push).not.toBeCalled()
        expect(require('next/router').useRouter().reload).not.toBeCalled()
        expect(wrapper.find('img')).toHaveLength(3 + 2);
        expect(wrapper.text()).toContain('You\'re not friends yet');
        expect(wrapper.text()).not.toContain('is your friend');
    });
    it('should click to see user', (done) => {
        const testStore = createTestStore(store, done);
        testStore.dispatch({
            type: actionTypes.SET_LOGGED_USER,
            payload: {user: users[0]}
        });
            const wrapper = mount(
            <Provider store={store} >
                <HomePage users={users}/>
            </Provider>
        );
        expect(wrapper.find('.user-item')).toHaveLength(6);
        wrapper.find('.user-item').at(0).simulate('click');
        expect(require('next/router').useRouter().push).toBeCalledWith({
            pathname: '/user',
			query: { id: users[2].id }
        });
    });
});

