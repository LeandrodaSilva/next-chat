import React from 'react';
import styles from "../../styles/Chat.module.css";
import {useRecoilState} from "recoil";
import {userState} from "../../recoil/atoms/userState";

interface Props {
  message: ISocketMessage
}

function Message(props: Props) {
  const { message } = props;
  const {
    type,
    data,
    metadata = {
      user: {
        name: "Anonymous",
      },
    },
  } = message;
  const [user] = useRecoilState<IUser>(userState);

  switch (type) {
    case "audio": {
      let decoded = atob(data);
      let array = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        array[i] = decoded.charCodeAt(i);
      }
      const blob = new Blob([array], { type: "audio/webm" });
      return (
        <li className={styles.listItem}>
          <audio controls src={URL.createObjectURL(blob)} />
        </li>
      );
    }
    case 'text':
    default:
      return (
        <li className={`${styles.listItem} ${user.name === metadata?.user?.name ? styles.listItemME : ""}`}>
          <p>{metadata?.user?.name}</p>
          {data}
        </li>
      )
  }
}

export default Message;
