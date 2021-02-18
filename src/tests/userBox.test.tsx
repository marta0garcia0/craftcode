import Adapter from 'enzyme-adapter-react-16';
import UserBox from '../components/user-box/userBox';
import { mount, configure } from 'enzyme';
import { users } from './__mocks__/users';
configure({adapter: new Adapter()});

/** @test {UserBox Component} */
describe('UserBox Component', () => {

    it('should render without crashing a not friend user', () => {
        const wrapper = mount(<UserBox user={users[0]} loggedUser={users[1]} />);
        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.text()).toContain('You\'re not friends yet')
    });
    it('should render without crashing a friend user', () => {
        const wrapper = mount(<UserBox user={users[1]} loggedUser={users[2]} />);
        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.text()).toContain('Clementine Bauch is your friend')
    });
    it('should render without crashing a complete friend information', () => {
        const wrapper = mount(<UserBox user={users[1]} loggedUser={users[2]} complete={true}/>);
        expect(wrapper.text()).toContain('Website: ')
    });
});