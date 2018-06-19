using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GCSAPI.Models.PocoClasses;

namespace GCSAPI.Models.managers
{
    public class StudentManager
    {
        GCS ctx;
        public StudentManager()
        {
            ctx = new GCS();
        }

        public List<Student> GetStudents()
        {
            return ctx.Student.ToList();
        }

        public void Remove(int id)
        {
            Student student = ctx.Student.Find(id);
            student.isDeleted = true;
            ctx.SaveChanges();
        }

        internal void add(Student x, PocoStudent student)
        {
            if (student.CoursesId != null) 
            {
                foreach (int id in student.CoursesId)
                {
                    Student_Course sc = new Student_Course()
                    {
                        fk_courseid=id,
                        fk_studentid=x.id
                    };
                    ctx.Student_Course.Add(sc);
                    ctx.SaveChanges();
                }
                if (student.InstructorsId != null)
                {
                    foreach (int id in student.InstructorsId)
                    {
                        Student_Instructor si= new Student_Instructor()
                        {
                            fk_instructorid=id,
                            fk_studentid = x.id
                        };
                        ctx.Student_Instructor.Add(si);
                        ctx.SaveChanges();
                    }
                }
                }
        }
    }
}