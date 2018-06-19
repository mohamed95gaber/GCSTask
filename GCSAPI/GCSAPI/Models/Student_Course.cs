namespace GCSAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Student_Course
    {
        public int id { get; set; }

        public int? fk_studentid { get; set; }

        public int? fk_courseid { get; set; }

        public virtual Course Course { get; set; }

        public virtual Student Student { get; set; }
    }
}
