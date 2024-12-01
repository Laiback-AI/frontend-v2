import { setupWorker } from 'msw';
import { handlers } from './handlers';  

// Set up the MSW worker
export const worker = setupWorker(...handlers);
