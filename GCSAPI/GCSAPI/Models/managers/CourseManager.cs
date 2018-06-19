using GCSAPI.Models.PocoClasses;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace GCSAPI.Models.managers
{
    public class CourseManager
    {
        GCS ctx;
        public CourseManager()
        {
            ctx = new GCS();
        }

        public List<Course> GetCourses()
        {
            return ctx.Course.ToList();
        }

        public void Remove(int id)
        {
            Course course= ctx.Course.Find(id);
             course.isDeleted = true;
            ctx.SaveChanges();
        }

        public void Add(Course newCourse, PocoCourse course)
        {
            if (course.InstructorsId != null)
            {
            foreach (int id in course.InstructorsId)
            {

                Instructor_Course ic = new Instructor_Course()
                {
                    fk_instructorid = id,
                    fk_courseid = newCourse.id
                };
                ctx.Instructor_Course.Add(ic);
                ctx.SaveChanges();
            }
            }
            if (course.StudentsId != null)
            {
                foreach (int id in course.StudentsId)
                {

                    Student_Course sc = new Student_Course()
                    {
                        fk_studentid = id,
                        fk_courseid = newCourse.id
                    };
                    ctx.Student_Course.Add(sc);
                    ctx.SaveChanges();
                }
            }
        }

        public void Edit(PocoCourse course)
        {
            if (course.InstructorsId.Count > 0)
            {
               var obj= ctx.Instructor_Course.Find(course.Id);
                foreach (int id in course.InstructorsId)
                {

                    Instructor_Course ic = new Instructor_Course()
                    {
                        id = obj.id,
                        fk_instructorid = id,
                    

                    };

                    ctx.Instructor_Course.Attach(ic);
                    ctx.Entry(ic).State = EntityState.Modified;
                    ctx.SaveChanges();
                }
            }
            if (course.StudentsId.Count > 0)
            {
                var obj = ctx.Student_Course.Find(course.Id);
                foreach (int id in course.StudentsId)
                {

                    Student_Course sc = new Student_Course()
                    {
                        id = obj.id,
                        fk_studentid = id,
                        fk_courseid = course.Id
                    };
                    ctx.Entry(sc).State = EntityState.Modified;

                    ctx.SaveChanges();
                }
            }
        }

    }
}