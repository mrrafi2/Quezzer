// Quizzes.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Quizzes from './Quizzes';

// Mock Firebase functions
jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  get: jest.fn()
}));
import { ref, get } from 'firebase/database';

// Mock react-router-dom hooks
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockedUsedNavigate,
    useParams: () => ({ category: 'History', label: 'World War II' })
  };
});

describe('Quizzes Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  test('shows loading state initially', () => {
    // Make the get() call return a pending promise so that the component remains in the loading state.
    get.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter>
        <Quizzes />
      </MemoryRouter>
    );

    // The loading spinner should be present.
    expect(screen.getByText(/spinner/i)).toBeInTheDocument();
  });

  test('renders quiz after Firebase data is loaded', async () => {
    // Define dummy quiz data
    const dummyQuizzes = [
      {
        question: "What year did WW2 end?",
        options: ["1945", "1939", "1941", "1950"],
        answer: "1945"
      }
    ];

    // Create a fake snapshot that the Firebase get() method would return.
    const fakeSnapshot = {
      exists: () => true,
      val: () => dummyQuizzes
    };

    // Make get() resolve with our fake snapshot.
    get.mockResolvedValue(fakeSnapshot);

    render(
      <MemoryRouter>
        <Quizzes />
      </MemoryRouter>
    );

    // Wait for the question to appear in the document.
    await waitFor(() => {
      expect(screen.getByText(/what year did ww2 end/i)).toBeInTheDocument();
    });
  });

  test('handles answer click and navigates when quiz is finished', async () => {
    const dummyQuizzes = [
      {
        question: "What year did WW2 end?",
        options: ["1945", "1939", "1941", "1950"],
        answer: "1945"
      }
    ];

    const fakeSnapshot = {
      exists: () => true,
      val: () => dummyQuizzes
    };

    get.mockResolvedValue(fakeSnapshot);

    render(
      <MemoryRouter>
        <Quizzes />
      </MemoryRouter>
    );

    // Wait for the quiz to render.
    await waitFor(() => {
      expect(screen.getByText(/what year did ww2 end/i)).toBeInTheDocument();
    });

    // Click on the correct answer.
    fireEvent.click(screen.getByText("1945"));

    // Since there is only one quiz in dummy data, it should trigger navigation.
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        "/result",
        expect.objectContaining({
          state: expect.objectContaining({
            results: expect.any(Array),
            score: expect.any(Number),
            label: "World War II",
            category: "History"
          })
        })
      );
    });
  });
});
