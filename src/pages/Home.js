import React from "react";
import { Helmet } from "react-helmet";
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
import HowMyCoursesWork from "../components/Web/HowMyCoursesWork";
import ReviewsCourses from "../components/Web/ReviewsCourses";

export default function Home(){
    return(
        <>
        <Helmet>
            <title>Home | David Gerardo Martínez</title>
        </Helmet>
            <MainBanner />
            <HomeCourses />
            <HowMyCoursesWork />
            <ReviewsCourses />
        </>
    );
}