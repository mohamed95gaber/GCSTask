namespace GCSAPI.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class GCS : DbContext
    {
        public GCS()
            : base("name=GCS")
        {
        }

        public virtual DbSet<Course> Course { get; set; }
        public virtual DbSet<Instructor> Instructor { get; set; }
        public virtual DbSet<Instructor_Course> Instructor_Course { get; set; }
        public virtual DbSet<Student> Student { get; set; }
        public virtual DbSet<Student_Course> Student_Course { get; set; }
        public virtual DbSet<Student_Instructor> Student_Instructor { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .HasMany(e => e.Instructor_Course)
                .WithOptional(e => e.Course)
                .HasForeignKey(e => e.fk_courseid);

            modelBuilder.Entity<Course>()
                .HasMany(e => e.Student_Course)
                .WithOptional(e => e.Course)
                .HasForeignKey(e => e.fk_courseid);

            modelBuilder.Entity<Instructor>()
                .HasMany(e => e.Instructor_Course)
                .WithOptional(e => e.Instructor)
                .HasForeignKey(e => e.fk_instructorid);

            modelBuilder.Entity<Instructor>()
                .HasMany(e => e.Student_Instructor)
                .WithOptional(e => e.Instructor)
                .HasForeignKey(e => e.fk_instructorid);

            modelBuilder.Entity<Student>()
                .HasMany(e => e.Student_Course)
                .WithOptional(e => e.Student)
                .HasForeignKey(e => e.fk_studentid);

            modelBuilder.Entity<Student>()
                .HasMany(e => e.Student_Instructor)
                .WithOptional(e => e.Student)
                .HasForeignKey(e => e.fk_studentid);
        }
    }
}
