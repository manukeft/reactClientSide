import React from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Header from "./Header";
import useFetch from "./useFetch";

const Libros = () => {
  const libros = useFetch("http://localhost:8080/");

  return (
    <ul>
      {libros.map((libro, i) => (
        <li key={i}>
          <Link to={"/libro/" + libro.titulo}>{libro.titulo}</Link>
        </li>
      ))}
    </ul>
  );
};

const Libro = () => {
  // Parámetros de la url
  const { titulo } = useParams();
  const libros = useFetch("http://localhost:8080/");

  return (
    <>
      {libros
        .filter((libro) => libro.titulo === titulo)
        .map((libro, i) => (
          <section key={i}>
            <h1>{libro.titulo}</h1>
            <article>
              <p>ISBN: {libro.isbn}</p>
              <p>Autor: <Link to={"/autor/" + libro.autor}>{libro.autor}</Link></p>
              <p>Año: <Link to={"/year/" + libro.year}>{libro.year}</Link></p>
              <p>Idioma: {libro.idioma}</p>
              <p>Editorial: <Link to={"/editorial/" + libro.editorial}>{libro.editorial}</Link></p>
              <p>Precio: {libro.precio}</p>
            </article>
          </section>
        ))}
      <p>
        <Link to="/">Regresar a la home</Link>
      </p>
    </>
  );
};

const Autor = () => {
  const { autor } = useParams();
  const libros = useFetch("http://localhost:8080/");

  return (
    <>
      <ul>
        {libros
          .filter((libro) => libro.autor === autor)
          .map((libro) => (
            <li key={libro.autor}>
              <h2>Libros del autor/a: {libro.autor}</h2>
              <Link to={"/libro/"+libro.titulo}>{libro.titulo}</Link>
            </li>
          ))}
      </ul>
      <p>
        <Link to="/">Regresar a la home</Link>
      </p>
    </>
  );
};

const Editorial = () => {
  const { editorial } = useParams();
  const libros = useFetch("http://localhost:8080/");

  return (
    <>
      <ul>
        {libros
          .filter((libro) => libro.editorial === editorial)
          .map((libro) => (
            <li key={libro.editorial}>
              <h2>Libros de la editorial: {libro.editorial}</h2>
              <Link to={"/libro/" + libro.titulo}>{libro.titulo}</Link>
            </li>
          ))}
      </ul>
      <p>
        <Link to="/">Regresar a la home</Link>
      </p>
    </>
  );
};

const Year = () => {
  const { year } = useParams();
  const libros = useFetch("http://localhost:8080/");

  return (
    <>
      <ul>
        {libros
          .filter((libro) => libro.year === year)
          .map((libro, i) => (
            <li key={i}>
              <h2>Libros del año: {libro.year}</h2>
              <Link to={"/libro/" + libro.titulo}>{libro.titulo}</Link>
            </li>
          ))}
      </ul>
      <p>
        <Link to="/">Regresar a la home</Link>
      </p>
    </>
  );
};

const App = () => (
  <>
    <Header />
    <Routes>
      <Route exact path="/" element={<Libros />} />
      <Route path="/libro/:titulo" element={<Libro />} />
      <Route path="/autor/:autor" element={<Autor />} />
      <Route path="/editorial/:editorial" element={<Editorial />} />
      <Route path="/year/:year" element={<Year />} />
    </Routes>
  </>
);
export default App;
