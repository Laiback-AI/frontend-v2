import { create } from 'zustand'; // Zustand for state management
import { fetchTenders } from '../../services/tender/tenderService'; // API function for fetching tenders
import { Tender } from '../../types/tenderTypes'; // Type definition for Tender

// Define the state interface for the store
interface TenderState {
  tenders: Tender[]; // Array to store fetched tenders
  loading: boolean;  // Loading state to track API request status
  error: string | null; // Error state to track any errors during the fetch
  fetchTenders: () => Promise<void>; // Function to fetch tenders
}

// Create the Zustand store
export const useTenderStore = create<TenderState>((set) => ({
  // Initial state values
  tenders: [],
  loading: true,
  error: null,

  // Async function to fetch tenders
  fetchTenders: async () => {
    // Set loading to true and reset any previous error
    set({ loading: true, error: null });
    
    try {
      // Fetch tenders using the service
      const fetchedTenders = await fetchTenders();
      
      // Update state with fetched tenders and set loading to false
      set({ tenders: fetchedTenders, loading: false });
    } catch (error) {
      // Handle any errors by setting the error message and stopping the loading state
      set({ error: 'Failed to fetch tenders', loading: false });
    }
  },
}));
