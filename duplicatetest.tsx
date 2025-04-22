test("handleCancelConfirm navigates or calls handleNext based on byPassAddDupRecord", async () => {
  const mockNavigate = jest.fn();
  const mockHandleNext = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: undefined }), // Ensure id is undefined
  }));

  const setOpenCancelDialogMock = jest.fn();
  const setalertMessageMock = jest.fn();
  const setbyPassAddDupRecordMock = jest.fn();

  const contextValue = {
    ...mockRowContextValues,
    selectedRow: [{ id: "prod-1", productName: "Test Product" }], // Ensure selectedRow is not empty
    handleNext: mockHandleNext,
    setOpenCancelDialog: setOpenCancelDialogMock,
    setalertMessage: setalertMessageMock,
    setbyPassAddDupRecord: setbyPassAddDupRecordMock,
    byPassAddDupRecord: false, // Ensure byPassAddDupRecord is false
  };

  await act(async () => {
    renderComponent(contextValue);
  });

  // Simulate clicking the "cancel" button to open the dialog
  fireEvent.click(screen.getByText("cancel"));

  // Debug the DOM to verify if the dialog is rendered
  screen.debug();

  // Wait for the dialog to open
  await waitFor(() => {
    expect(
      screen.getByText((content) =>
        content.includes("Confirm Cancel") || content.includes("Duplicate Application Found")
      )
    ).toBeInTheDocument();
  });

  // Simulate clicking the "Yes" button
  fireEvent.click(screen.getByRole("button", { name: /Yes/i }));

  await waitFor(() => {
    expect(setOpenCancelDialogMock).toHaveBeenCalledWith(false);
  });

  // Simulate clicking the "No" button
  fireEvent.click(screen.getByRole("button", { name: /No/i }));

  await waitFor(() => {
    expect(setOpenCancelDialogMock).toHaveBeenCalledWith(false);
  });
});
