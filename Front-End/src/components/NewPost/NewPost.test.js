import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewPost from './NewPost'; // Make sure the path is correct
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for testing
import configureStore from 'redux-mock-store'; // Assuming you're using redux-mock-store
import Post from '../Posts/Post/Post';

// Create a mock store for your test cases
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

describe('NewPost', () => {

  it('navigates post when clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Posts />} />
            {/* Assuming UserProfile is a simple component that just renders "Posts" */}
            <Route path="/posts" element={<div>Posts</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Assuming the link to the user's profile has text "View Profile"
    await userEvent.click(screen.getByText(/Posts/i));

    // Check if navigation to profile page occurred
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });

});
