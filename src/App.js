import logo from './logo.svg';
import './App.css';
import UserList from './components/user/UserList';
import PostList from './components/post/PostList';

function App() {
    return (
        <div className="App">
            <UserList/>
            <PostList/>
        </div>
    );
}

export default App;
