using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GCSAPI.Models.PocoClasses
{
    public class PocoStudent
    {
       public int Id { get; set; }
       public string Name { get; set; }
       public int? Phone { get; set; }
       public string Mail { get; set; }
       public DateTime? Birthdate { get; set; }
       public List<int> CoursesId { get; set; }
       public List<int> InstructorsId { get; set; }
        public List<string> CoursesName { get; set; }
        public List<string> InstructorsName { get; set; }
    }
}