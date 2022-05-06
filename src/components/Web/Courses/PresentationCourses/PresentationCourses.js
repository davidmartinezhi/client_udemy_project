import React from "react";
import academyLogo from "../../../../assets/img/png/academy-logo.png";
import "./PresentationCourses.scss";

export default function PresentationCourses() {
  return (
    <div className="presentation-courses">
        <img src={academyLogo} alt="cursos de agustin navarro galdon" />
        <p>
          Cursos en udemy creado por Agustín Navarro Galdon, pagina web actual
          creada utilizando el curso de MERN Stack que incluye Mongodb, Express, React Js y Node Js.
        </p>
    </div>
  )
}
