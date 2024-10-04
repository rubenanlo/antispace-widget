import RootProviders from "@/providers/rootProviders";
import "@/styles/globals.css";

const App = ({ Component, pageProps }) => (
  <RootProviders>
    <Component {...pageProps} />
  </RootProviders>
);

export default App;
