namespace GCSAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Instructor_Course
    {
        public int id { get; set; }

        public int? fk_courseid { get; set; }

        public int? fk_instructorid { get; set; }

        public virtual Course Course { get; set; }

        public virtual Instructor Instructor { get; set; }
    }
}
