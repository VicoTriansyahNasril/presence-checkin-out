import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import CustomLoader from "./components/Elements/CustomLoader"; // Loader untuk ditampilkan saat suspense

const Pages = React.lazy(() => import("./pages"));

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<CustomLoader loading={true} />}>
          <Pages />
        </Suspense>
      </AuthProvider>
    </Router>
  );
}
