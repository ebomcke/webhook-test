const mockAccountEditor = {
    account: {
        name: 'Unit Test',
        organisationName: 'unit-test-org-name'
    },
    onOrganisationNameChange: jest.fn(),
    save: jest.fn(() => Promise.resolve())
}

export { mockAccountEditor };