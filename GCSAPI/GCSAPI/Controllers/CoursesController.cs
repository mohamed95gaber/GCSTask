using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using GCSAPI.Models;
using GCSAPI.Models.managers;
using GCSAPI.Models.PocoClasses;
using System.IO;

namespace GCSAPI.Controllers
{
    public class CoursesController : ApiController
    {
        private GCS db = new GCS();
        CourseManager ctx = new CourseManager();
     
        
        // GET: api/Courses
        public List<PocoCourse> GetCourse()
        {
            return ctx.GetCourses().Where(a=>a.isDeleted == false).Select(a => new PocoCourse {Name=a.name,Id=a.id ,Code=a.code ,Hours=a.hours }).ToList();
        }

        // GET: api/Courses/5
        [ResponseType(typeof(Course))]
        public PocoCourse GetCourse (int id)
        {
            return ctx.GetCourses().Where(a => a.isDeleted == false)
                .Select(a => new PocoCourse {
                Name = a.name,
                Id = a.id,
                Code = a.code,
                Hours = a.hours,
                InstructorsName = a.Instructor_Course.Where(b => b.fk_courseid == a.id && b.Instructor.isDeleted == false).Select(b => b.Instructor.name).ToList(),
                StudentsName = a.Student_Course.Where(b => b.fk_courseid == a.id && b.Student.isDeleted == false).Select(b => b.Student.name).ToList()
                }).FirstOrDefault(a=>a.Id == id);
         
        }

        // PUT: api/Courses/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCourse(int id, Course course)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            if (id != course.id)
            {
                return BadRequest();
            }

            db.Entry(course).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Courses
        [ResponseType(typeof(Course))]
        public IHttpActionResult PostCourse(PocoCourse course)
        {

             if (course.InstructorsId != null || course.StudentsId !=null)
            {
                Course newCourse = new Course()
                {
                    code = course.Code,
                    name = course.Name,
                    hours = course.Hours,
                    isDeleted = false,

                };
                Course x = db.Course.Add(newCourse);
                db.SaveChanges();
                ctx.Add(x, course);
        
                return CreatedAtRoute("DefaultApi", new { id = x.id }, newCourse);

            }
            else
            {
                Course newCourse = new Course()
                {
                    code = course.Code,
                    name = course.Name,
                    hours = course.Hours,
                    isDeleted = false,

                };
                Course x = db.Course.Add(newCourse);
                db.SaveChanges();
                ctx.Add(x, course);

                return CreatedAtRoute("DefaultApi", new { id = x.id }, newCourse);

            }

        }

        // DELETE: api/Courses/5
        [ResponseType(typeof(Course))]
        public void DeleteCourse(int id)
        {
            ctx.Remove(id);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CourseExists(int id)
        {
            return db.Course.Count(e => e.id == id) > 0;
        }
    }
}