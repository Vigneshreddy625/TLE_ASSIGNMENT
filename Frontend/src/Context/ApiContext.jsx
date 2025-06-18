import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import axios from "axios";

const ApiContext = createContext();
const API_URL = "https://api.tle.com";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export const ApiProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyRatings, setHistoryRatings] = useState([]);
  const [problemStats, setProblemStats] = useState([]);
  const [emailSettings, setEmailSettings] = useState(null);
  const [cronSchedule, setCronSchedule] = useState(null);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error) => {
    setError(error);
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access, redirecting to login");
    }
  }, []);

  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      const response = await api.get("/api/users");
      setUsers(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const fetchUser = useCallback(async (userId) => {
    setLoading(true);
    clearError();
    try {
      const response = await api.get(`/api/users/${userId}`);
      setUser(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const addUser = useCallback(async (userData) => {
    setLoading(true);
    clearError();
    try {
      const response = await api.post("/api/users", userData);
      await fetchAllUsers();
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const updateUser = useCallback(async (userId, userData) => {
    setLoading(true);
    clearError();
    try {
      const response = await api.put(`/api/users/${userId}`, userData);
      if (user && user.id === userId) {
        setUser(response.data);
      }
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [user, clearError, handleError]);

  const deleteUser = useCallback(async (userId) => {
    setLoading(true);
    clearError();
    try {
      const response = await api.delete(`/api/users/${userId}`);
      if (user && user.id === userId) {
        setUser(null);
      }
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [user, clearError, handleError]);

  const fetchHistory = useCallback(async (userId, days) => {
    setLoading(true);
    clearError();
    try {
      const response = await api.get(`/api/history/user/${userId}`, {
        params: { days }
      });
      setHistory(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const fetchHistoryRatings = useCallback(async (userId, days) => {
    setLoading(true);
    clearError();
    try {
      const response = await api.get(`/api/history/user/${userId}/rating`, {
        params: { days }
      });
      setHistoryRatings(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const fetchProblemStats = useCallback(async (userId, days) => {
    setLoading(true);
    clearError();
    try {
      const response = await api.get(`/api/problem-stats/user/${userId}`, {
        params: { days }
      });
      setProblemStats(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const fetchToggleEmailNotifications = useCallback(async (userId, enabled) => {
    setLoading(true);
    clearError();
    try {
      const response = await api.post(`/api/email/${userId}/toggle-email`, { enabled });
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const fetchEmailSettings = useCallback(async (userId) => {
    setLoading(true);
    clearError();
    try {
      const response = await api.get(`/api/email/${userId}/settings`);
      setEmailSettings(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const fetchCronSchedule = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      const response = await api.get("/api/cron/schedule");
      setCronSchedule(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const updateCronSchedule = useCallback(async (schedule) => {
    setLoading(true);
    clearError();
    try {
      const response = await api.post("/api/cron/schedule", { schedule });
      setCronSchedule(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      handleError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const value = {
    // State
    users,
    user,
    loading,
    history,
    historyRatings,
    problemStats,
    emailSettings,
    cronSchedule,
    error,
    
    // Actions
    fetchAllUsers,
    fetchUser,
    addUser,
    updateUser,
    deleteUser,
    fetchHistory,
    fetchHistoryRatings,
    fetchProblemStats,
    fetchToggleEmailNotifications,
    fetchEmailSettings,
    fetchCronSchedule,
    updateCronSchedule,
    clearError,
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;