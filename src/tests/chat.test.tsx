import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { users } from './__mocks__/users';
import Chat from '../containers/chat/chat';
configure({adapter: new Adapter()});

/** @test {Chat Component} */
describe('Chat Component', () => {

    it('should render the chat between the two users', () => {
        const chat = users[1].friends.find(friend => friend.user.id === users[2].id).chat;
        const wrapper = mount(
            <Chat text={'hola'} friend={users[2]} chat={chat} handleSubmit={()=>{}}
                handleAddFriend={()=>{}} handleBackSelection={()=>{}} setText={()=>{}}
                user={users[1]} loggedUser={users[1]}/>
        );
        expect(wrapper.text()).toContain('asdfasdf');
    });
    it('should render an empty chat', () => {
        const chat = users[1].friends.find(friend => friend.user.id === users[2].id).chat;
        const wrapper = mount(
            <Chat text={'hola'} friend={users[2]} chat={[]} handleSubmit={()=>{}}
                handleAddFriend={()=>{}} handleBackSelection={()=>{}} setText={()=>{}}
                user={users[1]} loggedUser={users[1]}/>
        );
        expect(wrapper.text()).toContain('This is the very first time you chat');
    });
});