import React, { useState } from 'react';
import { Switch, List, Avatar, Button, Icon} from 'antd';

import NoAvatar from '../../../../assets/img/png/no-avatar.png';

import './ListUsers.scss';

export default function ListUsers(props){

    const { usersActive, usersInactive } = props;
    const [viewUsersActive, setViewUsersActive] = useState(true);

    return(
        <div className='list-users'>
            <div className='list-users__switch'>
                <Switch
                    defaultChecked
                    onChange={ () => setViewUsersActive(!viewUsersActive)}
                />
                <span>
                    {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
                </span>
            </div>
            {viewUsersActive ? <UsersActive/> : <UsersInactive/>}
        </div>
    );
}

function UsersActive(){
    return (<h3>Lista de Usuarios Activos</h3>);
}

function UsersInactive(){
    return (<h3>Lista de Usuarios Inactivos</h3>);
}