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
    public class StudentsController : ApiController
    {
        private GCS db = new GCS();
        StudentManager ctx = new StudentManager();
        // GET: api/Students
        public List<PocoStudent> GetStudent()
        {
            return ctx.GetStudents().Where(a => a.isDeleted == false).Select(a => new PocoStudent { Name = a.name, Id = a.id, Birthdate=a.birthdate, Mail = a.mail, Phone = a.phone }).ToList();
        }

        // GET: api/Students/5
        [ResponseType(typeof(Student))]
        public PocoStudent GetStudent(int id)
        {
            return ctx.GetStudents().Where(a => a.isDeleted == false).Select(a => new PocoStudent {
                Name = a.name,
                Id = a.id,
                Birthdate = a.birthdate,
                Mail = a.mail,
                Phone = a.phone,
                InstructorsName = a.Student_Instructor.Where(b => b.fk_studentid == a.id && b.Instructor.isDeleted == false).Select(b => b.Instructor.name).ToList(),
                CoursesName = a.Student_Course.Where(b => b.Student.id == a.id && b.Course.isDeleted == false).Select(b => b.Course.name).ToList() })
                .FirstOrDefault(a=>a.Id == id);

        }

        // PUT: api/Students/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStudent(int id, Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.id)
            {
                return BadRequest();
            }

            db.Entry(student).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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

        // POST: api/Students
        [ResponseType(typeof(Student))]
        public IHttpActionResult PostStudent(PocoStudent student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Student newStudent = new Student()
            {
                name=student.Name,
                phone=student.Phone,
                birthdate=student.Birthdate,
                mail=student.Mail,
                isDeleted=false,
            };
            Student x=db.Student.Add(newStudent);
            db.SaveChanges();
            if (student.InstructorsId !=null || student.CoursesId !=null)
            {
                ctx.add(x, student);
            }

            return CreatedAtRoute("DefaultApi", new { id = x.id }, newStudent);
        }

        // DELETE: api/Students/5
        [ResponseType(typeof(Student))]
        public void DeleteStudent(int id)
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

        private bool StudentExists(int id)
        {
            return db.Student.Count(e => e.id == id) > 0;
        }
    }
}