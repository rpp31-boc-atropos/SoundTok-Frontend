//Create customized render to incorporate router and context providers

import React, { useState, useReducer } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import { PlayerProvider } from '../src/contexts/player/PlayerContext'
import playerReducer from '../src/contexts/player/playerReducer';
import dummy from '../src/components/Home/dummy';




// MemoryRouter wrapper that includes initialRoutes
const MemoryRouterWithInitialRoutes = ({ children, initialRoutes }) => {
  return <MemoryRouter initialEntries={initialRoutes}>{children}</MemoryRouter>;
};

// create a customRender that wraps the UI in a memory Router
// initialEntries array can be specified in options object
const customRender = (ui, options) => {
  const initialRoutes =
    options && options.initialRoutes ? options.initialRoutes : ["/"];
  return render(ui, {
    wrapper: (args) =>
      MemoryRouterWithInitialRoutes({
        ...args,
        initialRoutes,
      }),
    ...options,
  });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

















// //Create customized render to incorporate router and context providers

// import React, { useState, useReducer } from 'react'
// import { render } from '@testing-library/react'
// import { MemoryRouter } from "react-router-dom";
// import { AuthProvider } from '../src/contexts/AuthContext'
// import { PlayerProvider } from '../src/contexts/player/PlayerContext'
// import playerReducer from '../src/contexts/player/playerReducer';
// import dummy from '../src/components/Home/dummy';

// const Providers = ({ children }) => {


//   //   const authContextValue = { login, setLogin, user, setUser }



//   //only keep the react router provider, and comment out the optional providers

//   return (
//     // <PlayerProvider value={playerContextValue}>
//     // <AuthProvider value={authContextValue}>
//     < MemoryRouter >
//       {children}
//     </MemoryRouter >
//     // </AuthProvider>
//     // </PlayerProvider >
//   )

// }

// const customRender = (ui, options) =>
//   render(ui, { wrapper: Providers, ...options })

// // re-export everything
// export * from '@testing-library/react'

// // override render method
// export { customRender as render }




