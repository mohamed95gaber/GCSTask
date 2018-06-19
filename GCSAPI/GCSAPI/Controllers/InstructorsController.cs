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

namespace GCSAPI.Controllers
{
    public class InstructorsController : ApiController
    {
        private GCS db = new GCS();
        InstractorManager ctx = new InstractorManager();
        // GET: api/Instructors
        public List<PocoInstructor> GetInstructor()
        {  
          return ctx.GetInstructors().Where(a=>a.isDeleted == false).Select(a => new PocoInstructor {Name=a.name,Id=a.Id ,Dept=a.dept,Mail=a.mail,Phone=a.phone }).ToList();
        }

        // GET: api/Instructors/5
        [ResponseType(typeof(Instructor))]
        public PocoInstructor GetInstructor(int id)
        {
            return ctx.GetInstructors().Where(a => a.isDeleted == false).Select(a => new PocoInstructor {
                Name = a.name,
                Id = a.Id,
                Dept = a.dept,
                Mail = a.mail,
                Phone = a.phone,
                StudentsName = a.Student_Instructor.Where(b => b.fk_instructorid == a.Id && b.Student.isDeleted == false).Select(b => b.Student.name).ToList(),
                CoursesName = a.Instructor_Course.Where(b => b.fk_instructorid == a.Id && b.Course.isDeleted == false).Select(b => b.Course.name).ToList() })
                .FirstOrDefault(a => a.Id == id);

        }

        // PUT: api/Instructors/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInstructor(int id, Instructor instructor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != instructor.Id)
            {
                return BadRequest();
            }

            db.Entry(instructor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstructorExists(id))
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

        // POST: api/Instructors
        [ResponseType(typeof(Instructor))]
        public IHttpActionResult PostInstructor(PocoInstructor instructor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (instructor.CoursesId != null )
            {
                Instructor newInstructor = new Instructor()
                {
                    name=instructor.Name,
                    phone=instructor.Phone,
                    mail=instructor.Mail,
                    dept=instructor.Dept,
                    isDeleted = false,

                };
                Instructor x = db.Instructor.Add(newInstructor);
                db.SaveChanges();
                ctx.Add(x, instructor);

                return CreatedAtRoute("DefaultApi", new { id = x.Id }, newInstructor);

            }
            else
            {
                Instructor newInstructor = new Instructor()
                {
                    name = instructor.Name,
                    phone = instructor.Phone,
                    mail = instructor.Mail,
                    dept = instructor.Dept,
                    isDeleted = false,

                };
                Instructor x = db.Instructor.Add(newInstructor);
                db.SaveChanges();


                return CreatedAtRoute("DefaultApi", new { id = x.Id }, newInstructor);

            }
        }

        // DELETE: api/Instructors/5
        [ResponseType(typeof(Instructor))]
        public void DeleteInstructor(int id)
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

        private bool InstructorExists(int id)
        {
            return db.Instructor.Count(e => e.Id == id) > 0;
        }
    }
}