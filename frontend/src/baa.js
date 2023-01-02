import { useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./styles.css";

const Header = () => (
  <div>
    <Link to="/">Home</Link> <Link to="/contact">Contact</Link>
  </div>
);

const HomePage = () => {
  useEffect(() => {
    console.log("HomePage component mounted");
    return () => console.log("HomePage component unmounted");
  }, []);

  return <p>Home Page</p>;
};

const ContactPage = () => {
  useEffect(() => {
    console.log("ContactPage component mounted");
    return () => console.log("ContactPage component unmounted");
  }, []);

  return <p>Contact Page</p>;
};

export default function App() {
  // you can declare state here to persist across routes
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/contact" component={ContactPage} />
      </Switch>
    </BrowserRouter>
  );
}
