import React, { useState } from 'react';
import { Switch, List, Avatar, Button, Icon} from 'antd';

import NoAvatar from '../../../../assets/img/png/no-avatar.png';

import './ListUsers.scss';

export default function ListUsers(props){

    const { usersActive, usersInactive } = props;

    return(
        <div>
            <h1>List Users</h1>
        </div>
    );
}