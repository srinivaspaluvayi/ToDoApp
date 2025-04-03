import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState("");
  const [authLoading, setAuthLoading] = useState(true); // auth loading flag
  const backendUrl = "http://localhost:5000";
  // const [tasks, setTasks] = useState([]);
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/getuserData", {
        withCredentials: true,
      });
      if (data.success) {
        // console.log("Fetched userData:", data.userData);
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };
  const getAuthState = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/auth/isAuth");
      if (data.success) {
        setIsLogged(true);
        getUserData();
      } else {
        setIsLogged(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch user AuthStatus."
      );
    } finally {
      setAuthLoading(false); // done checking
    }
  };

  // const fetchTasks = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${backendUrl}/task/tasks`,

  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setTasks(data.tasks);
  //   } catch (error) {
  //     toast.error("Failed to load tasks");
  //   }
  // };
  useEffect(() => {
    getAuthState();
  }, []);

  // useEffect(() => {
  //   if (isLogged) {
  //     fetchTasks();
  //   }
  // }, [isLogged]);

  const value = {
    backendUrl,
    isLogged,
    setIsLogged,
    userData,
    setUserData,
    getUserData,
    authLoading,
    // tasks,
    // setTasks,
    // fetchTasks,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
