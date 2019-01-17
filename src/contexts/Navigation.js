import React from 'react';

const NavigationContext = React.createContext({});

export const NavigationProvider = ({ children, router, response }) => (
  <NavigationContext.Provider
    value={{
      navigate: router.navigate,
      hnavigate: router.history.navigate,
      params: response.params,
      location: response.location,
      responseName: response.name
    }}
  >
    {children}
  </NavigationContext.Provider>
);

export const withNavigation = Component => props => (
  <NavigationContext.Consumer>
    {({ navigate, hnavigate, params, location, responseName }) => (
      <Component
        {...props}
        navigate={navigate}
        hnavigate={hnavigate}
        params={params}
        location={location}
        responseName={responseName}
      />
    )}
  </NavigationContext.Consumer>
);
