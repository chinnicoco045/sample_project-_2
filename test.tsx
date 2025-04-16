describe("Advanced testcases for AddApplicationsGrid", () => {
test("blocks next step when no product is selected",  () => {
    const mockContext1 = {
     selectedRow: [], // No products selected
    setIsAdded: jest.fn(),
    applicationIdentifier: {},
    setApplicationIdentifier: jest.fn(),
    setIsEdited: jest.fn(),
    activeRows: [],
    setChecked: jest.fn(),
    error: false,
    };

    render(
      <Router>
        <RowContext.Provider value={{selectedRow:[], setIsAdded: jest.fn(), setApplicationIdentifier: jest.fn(), setIsEdited: jest.fn(), activeRows: [], setChecked: jest.fn(), error: false}}>
          <AddApplicationsGrid />
        </RowContext.Provider>
      </Router>
    );

    // const nextButton = screen.getByRole("button", { name: /next/i });

    // expect(nextButton).toBeDisabled();
    expect(screen.getByText("Please select a product")).toBeInTheDocument();
  });
});
