import React from 'react';
import styles from "../../styles/Chat.module.css";
import {useRecoilState} from "recoil";
import {userState} from "../../recoil/atoms/userState";
import Audio from "../Audio/Audio";
import { motion } from 'framer-motion';

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
        <motion.li
          className={`${styles.listItem} ${user.name === metadata?.user?.name ? styles.listItemME : ""}`}
          animate={{ x: user.name === metadata?.user?.name ? -100 : 100 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Audio
            src={URL.createObjectURL(blob)}
          />
        </motion.li>
      );
    }
    case 'text':
    default:
      return (
        <motion.li
          className={`${styles.listItem} ${user.name === metadata?.user?.name ? styles.listItemME : ""}`}
          animate={{ x: user.name === metadata?.user?.name ? -100 : 100 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <p>{metadata?.user?.name}</p>
          {data}
        </motion.li>
      )
  }
}

export default Message;
