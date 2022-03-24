import React, {useState, useEffect} from 'react';


export default function MenuWebList(props){
    const { menu, setReloadMenus } = props;
    console.log(menu);

    return(
        <div>
            <h1>Menu web list...</h1>
            {menu.map(item => {
                return <p key={item._id}>{item.title}</p>
            })}
        </div>
    );
}