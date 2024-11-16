import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Pages from "./pages/Pages";
import PostPage from "./pages/PostPage";
import { useState, useEffect } from "react";
import { AuthContext } from "./components/context";

export default function App() {
  const storedAuth = localStorage.getItem("auth") === "true";

  const [auth, setAuth] = useState(storedAuth);

  useEffect(() => {
    localStorage.setItem("auth", auth);
  }, [auth]);


  console.log(typeof null)
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <Routes>
          {auth ? (
            <>
              <Route path="/posts" element={<Pages />} />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route path="*" element={<Navigate to="/posts" replace />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={
                  <>
                    <input type="text" />
                    <input type="password" />
                    <button onClick={() => setAuth(true)}>Submit</button>
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
