import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { useStore } from "./store";
import appRoutes from "routes";
import Layout from "components/common/Layout";

import "react-loading-skeleton/dist/skeleton.css";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

function App() {
  const { store } = useStore();
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <AlertProvider template={AlertTemplate} {...options}>
            {appRoutes.map((item, idx) => (
              <Route
                exact
                key={`${item.path}-${idx}`}
                path={item.path}
                component={item.component}
              />
            ))}
          </AlertProvider>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
