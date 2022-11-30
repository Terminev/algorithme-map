import React, {useEffect, useState} from 'react'

export const ListUser = (room) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if(room.room.length > 0) {
      setUsers(room.room[0]["users"])
    }

  }, [room.room])

  return(
    <div className={"list-user"}>
      <h3>Liste des utilisateurs</h3>
      <ul>
        {
          users.map((user,index) => (<li key={index}>{user.name}</li>))
        }
      </ul>
    </div>
    )
}

export default ListUser;