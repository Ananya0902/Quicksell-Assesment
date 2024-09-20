import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import { GET_TICKETS_URL } from './constants';
import { loadGrid, mapUsersByUserId } from './utils';
import { Ticket, User } from './interfaces';
import Loader from './components/Loader';
import './App.css'
import CustomCursor from './components/CustomCursor';
/**
 * App Component
 * 
 * The main component that fetches ticket and user data from an API,
 * manages application state, and renders the user interface.
 * It includes a custom cursor effect, header, loading state, 
 * error handling, and displays tickets in a grid format.
 * 
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  // State to hold tickets, user data, grid data, grouping, ordering, loading status, and error message
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userData, setUserData] = useState<Record<string, User>>({});
  const [gridData, setGridData] = useState<Record<string, Ticket[]>>({});
  const [grouping, setGrouping] = useState<string>("status");
  const [ordering, setOrdering] = useState<string>("priority");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tickets and users from API
  useEffect(() => {
    loadSettings();
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        const resp = await fetch(GET_TICKETS_URL);
        
        // Check if the response is not ok (handle non-200 status codes)
        if (!resp.ok) {
          throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        }

        const res = await resp.json();
        const { tickets, users } = res;
        setTickets(tickets);
        setUserData(mapUsersByUserId(users));
      } catch (err: any) {
        setError(err.message || "Something went wrong. 😢");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Update grid data when tickets, grouping, or ordering changes
  useEffect(() => {
    if (!tickets.length) return;
    setGridData(loadGrid(tickets, grouping, ordering));
    setLoading(false);
  }, [grouping, ordering, tickets]);

  // Handle grouping changes
  const onSetGrouping = useCallback((value: string) => {
    setLoading(true);
    setGrouping(value);
    saveSettings({ grouping: value });
  }, []);

  // Handle ordering changes
  const onSetOrdering = useCallback((value: string) => {
    setLoading(true);
    setOrdering(value);
    saveSettings({ ordering: value });
  }, []);

  // Save settings to local storage
  const saveSettings = useCallback((data: Record<string, string>) => {
    for (let key in data) localStorage.setItem(key, data[key]);
  }, []);

  // Load settings from local storage
  const loadSettings = useCallback(() => {
    setGrouping(localStorage.getItem("grouping") || "status");
    setOrdering(localStorage.getItem("ordering") || "priority");
  }, []);

  return (
    <div className="App">
      <Header grouping={grouping} setGrouping={onSetGrouping} ordering={ordering} setOrdering={onSetOrdering} />
      
      <CustomCursor />

      {loading && !error && <Loader />}
      {error && (
        <div className="error-message">
          <span className="emoji">😓</span>
          <h2>Oops! Something went wrong.</h2>
          <p>{error}</p>
          <p>Don't worry, we are on it, try refreshing the page! 🚀</p>
        </div>
      )}
      {!loading && !error && <Grid gridData={gridData} grouping={grouping} userIdToData={userData} />}
    </div>
  );
}

export default App;
