import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageLayout from "./Pages/PageLayout";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Suspense fallback="">
          <PageLayout />
        </Suspense>
      </Provider>
    </Router>
  );
}

export default App;
