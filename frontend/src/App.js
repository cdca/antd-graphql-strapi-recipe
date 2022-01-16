import { Layout } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import HomePage from "./pages/homePage/HomePage";
import Category from "./pages/category/Category";
import SideMenu from "./components/sideMenu/SideMenu";
import Details from "./pages/details/Details";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger, faLaptopCode } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

function App() {
  const { Header, Footer, Sider, Content } = Layout;
  const client = new ApolloClient({
    uri: "https://safe-scrubland-46591.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <Router>
      <ApolloProvider client={client}>
        <Layout>
          <Header className="header">
            <Link className="link" to="/">
              <FontAwesomeIcon icon={faHamburger} className="fa" />
              My recipes
            </Link>
          </Header>
          <Layout>
            <Sider>
              <div className="menu">
                <Link to="/" className="side-link">
                  Home
                </Link>
                <SideMenu />
              </div>
            </Sider>
            <Content className="content">
              <div className="page">
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route path="/category/:id" element={<Category />} />
                  <Route path="/details/:id" element={<Details />} />
                </Routes>
              </div>
            </Content>
          </Layout>
          <Footer className="footer">
            <FontAwesomeIcon icon={faLaptopCode} />
            <Link
              to="https://github.com/cdca"
              style={{ fontSize: 14, color: "white", marginLeft: 4 }}
            >
              CDCA Git
            </Link>
          </Footer>
        </Layout>
      </ApolloProvider>
    </Router>
  );
}

export default App;
