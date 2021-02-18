import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { users } from './__mocks__/users';
import Header from '../containers/header/header';
configure({adapter: new Adapter()});

/** @test {Header Component} */
describe('Header Component', () => {

    it('should render the header', () => {
        const chat = users[1].friends.find(friend => friend.user.id === users[2].id).chat;
        const wrapper = mount(
            <Header user={users[1]} />
        );
        expect(wrapper.text()).toContain('Clementine Bauch');
    });
    it('should render the login as a different user option and home button', () => {
        const chat = users[1].friends.find(friend => friend.user.id === users[2].id).chat;
        const wrapper = mount(
            <Header user={users[1]} />
        );
        expect(wrapper.text()).toContain('Log as a different user');
        expect(wrapper.find('button')).toHaveLength(1);
        expect(wrapper.find('button').text()).toBe('Home');
    });
});