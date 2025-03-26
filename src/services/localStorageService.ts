import { Course } from "../models/Course";
import { Instructor } from "../models/Instructor";

export const getCourses = (): Course[] => {
  const courses = localStorage.getItem("courses");
  return courses ? JSON.parse(courses) : [];
};

export const saveCourses = (courses: Course[]) => {
  localStorage.setItem("courses", JSON.stringify(courses));
};

export const getInstructors = (): Instructor[] => {
  const instructors = localStorage.getItem("instructors");
  return instructors ? JSON.parse(instructors) : [
    { id: "1", name: "Giảng viên A" },
    { id: "2", name: "Giảng viên B" },
  ]; // Dữ liệu mặc định
};