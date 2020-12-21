//import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AddTutorial from "./components/crear-municipio.component";
import Tutorial from "./components/municipio.component";
import TutorialsList from "./components/listar-municipios.component";
import municipioService from "./services/municipio.service";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/departamento"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/departamento"]} component={listar-municipioService} />
          <Route exact path="/add" component={crear-municipio} />
          <Route path="/departamento/:municipio" component={municipio} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
