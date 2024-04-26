import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewPost from './NewPost'; // Make sure the path is correct
import Notifications from './Notifications';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for testing
import configureStore from 'redux-mock-store'; // Assuming you're using redux-mock-store
import Post from '../Posts/Post/Post';


const mockStore = configureStore();
const initialState = {
  user: {
    userObj: {
      name: 'Test Name',
      email: 'testemail@example.com',
      username: 'testusername',
    },
  },
};

const store = mockStore(initialState);
describe(Notifications, () =>{
    it("Noti", async(done) => {
        render(
            <Provider store={store}>
              <MemoryRouter initialEntries={['/']}>
                <Routes>
                  <Route path="/" element={<Notifications />} />
                  {/* renders "Notifications" */}
                  <Route path="/Notifications" element={<div>Notifications</div>} />
                </Routes>
              </MemoryRouter>
            </Provider>
            );
            
        await userEvent.click(screen.getByText(/Notifications/i));
        expect(screen.getByText("Notifications")).toBeInTheDocument();
      });
});