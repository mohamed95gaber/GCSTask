using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GCSAPI.Models.PocoClasses;

namespace GCSAPI.Models.managers
{
    public class InstractorManager
    {
        GCS ctx;
        public InstractorManager()
        {
            ctx = new GCS();
        }

        public List<Instructor> GetInstructors()
        {
            return ctx.Instructor.ToList();
        }

        public void Remove(int id)
        {
            Instructor Instructor = ctx.Instructor.Find(id);
            Instructor.isDeleted = true;
            ctx.SaveChanges();
        }

        public void Add(Instructor x, PocoInstructor instructor)
        {

            foreach (int id in instructor.CoursesId) 
            {
                Instructor_Course ic = new Instructor_Course()
                {
                    fk_courseid = id,
                    fk_instructorid=x.Id,
                    
                };
                ctx.Instructor_Course.Add(ic);
                ctx.SaveChanges();
            }
        }
    }
}