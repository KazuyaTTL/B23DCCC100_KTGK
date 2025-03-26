import { useState } from "react";
import { Course } from "../models/Course";
import { Instructor } from "../models/Instructor";
import { v4 as uuidv4 } from "uuid"; // Tạo ID duy nhất
import { getCourses, saveCourses, getInstructors } from "../services/localStorageService";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>(getCourses());
  const [instructors] = useState<Instructor[]>(getInstructors());

  const addCourse = (course: Omit<Course, "id">) => {
    const newCourse = { ...course, id: uuidv4(), enrolledStudents: 0 };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    saveCourses(updatedCourses);
  };

  const updateCourse = (id: string, updatedCourse: Omit<Course, "id">) => {
    const updatedCourses = courses.map((course) =>
      course.id === id ? { ...course, ...updatedCourse } : course
    );
    setCourses(updatedCourses);
    saveCourses(updatedCourses);
  };

  const deleteCourse = (id: string) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
    saveCourses(updatedCourses);
  };

  return { courses, instructors, addCourse, updateCourse, deleteCourse };
};