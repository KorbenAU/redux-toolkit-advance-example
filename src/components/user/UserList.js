import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUsers} from '../../store/reducers/UserSlice';

export default function UserList() {
    const {users, loading, error} = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div>
            <h1>Users:</h1>
            {loading === 'pending' && <h1>loading ...</h1>}
            {error && <h1>error</h1>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.id} - {user.name} . . {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
