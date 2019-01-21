const mockEndpointEditor = {
    endpoint: {
        path: 'unit-test-path',
        defaultResponse: {
            statusCode: 200,
            body: JSON.stringify({status:'OK'})
        }
    },
    onResponseBodyChange: jest.fn(),
    onUrlChange: jest.fn(),
    onStatusCodeChange: jest.fn(),
    save: jest.fn(() => Promise.resolve())
}

export { mockEndpointEditor };