test("handles duplicate records and updates state", async () => {
    const setdupcountriesMock = jest.fn();
    const setalertMessageMock = jest.fn();
    const setOpenCancelDialogMock = jest.fn();
    const setbyPassAddDupRecordMock = jest.fn();

    const contextValue = {
      selectedRow: [{ id: "prod-1", productName: "Test Product" }],
      setdupcountries: setdupcountriesMock,
      setalertMessage: setalertMessageMock,
      setOpenCancelDialog: setOpenCancelDialogMock,
      setbyPassAddDupRecord: setbyPassAddDupRecordMock,
    };

    await act(async () => {
      render(
        <RowContext.Provider value={contextValue}>
          <AddApplicationsGrid />
        </RowContext.Provider>
      );
    });

    // Simulate clicking the "next" button to trigger validation
    fireEvent.click(screen.getByText("next"));

    await waitFor(() => {
      expect(setOpenCancelDialogMock).toHaveBeenCalledWith(true);
    });
  });
