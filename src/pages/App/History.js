import { createBrowserHistory } from 'history';
import { useHistory } from 'react-router-dom';

export default createBrowserHistory({basename: process.env.PUBLIC_URL});