import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPosts, postsSelectors} from '../../store/reducers/postSlice';
import {store} from '../../store/store';

export default function UserList() {
    const postSlice = useSelector(state => state.posts);
    const posts = postsSelectors.selectAll(store.getState());
    const {loading, error} = postSlice;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [store]);

    return (
        <div>
            <h1>Posts:</h1>
            {loading === 'pending' && <h1>loading ...</h1>}
            {error && <h1>error</h1>}
            <ul>
                {posts.map((item, index) => (
                    <li key={index}>{item.id} - {item.title}</li>
                ))}
            </ul>
        </div>
    );
}
