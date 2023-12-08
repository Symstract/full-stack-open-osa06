import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
    case "CLEAR_MESSAGE":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  const setNotification = async (notification) => {
    notificationDispatch({ type: "SET_MESSAGE", payload: notification });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    notificationDispatch({ type: "CLEAR_MESSAGE" });
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);

export default NotificationContext;
