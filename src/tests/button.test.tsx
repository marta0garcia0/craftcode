import Adapter from 'enzyme-adapter-react-16';
import Button from '../components/button/button';
import { mount, configure } from 'enzyme';

configure({adapter: new Adapter()});

/** @test {Button Component} */
describe('Button Component', () => {
    it('should render without crashing', () => {
        const wrapper = mount(<Button handleAction={() => {}} text="test" />);
        expect(wrapper.find('button')).toHaveLength(1);
        expect(wrapper.find('button').text()).toBe('test');
    });
});