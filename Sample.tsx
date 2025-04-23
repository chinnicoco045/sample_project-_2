import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddApplicationsGrid from '../Components/Applications/wizard/AddApplicationsGrid';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { RowContext } from '../App';

// Mock components
jest.mock('../Components/Applications/wizard/LinkedProducts', () => () => <div>LinkProducts Component</div>);
jest.mock('../Components/Applications/wizard/LinkCountry', () => () => <div>LinkCountry Component</div>);
jest.mock('../Components/Applications/wizard/LinkSection', () => () => <div>LinkSection Component</div>);

// Setup and cleanup
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Advanced testcases for AddApplicationsGrid", () => {
  const mockContext = {
    selectedRow: [],
    setIsAdded: jest.fn(),
    applicationIdentifier: {},
    setApplicationIdentifier: jest.fn(),
    setIsEdited: jest.fn(),
    activeRows: [],
    setChecked: jest.fn(),
    error: false,
  };

test("allows next step when product is selected", () => {
  const contextWithProduct = {
    ...mockContext,
    selectedRow: [{ id: 1, name: "Product 1" }],
    setRenderedTabs: jest.fn(), // Mock the setRenderedTabs function
  };

  render(
    <Router>
      <RowContext.Provider value={contextWithProduct}>
        <AddApplicationsGrid />
      </RowContext.Provider>
    </Router>
  );

  // Add assertions to verify the behavior
  expect(screen.getByText("LinkProducts Component")).toBeInTheDocument();
});
  
});
