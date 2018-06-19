using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GCSAPI.Models.PocoClasses
{
    public class PocoCourse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public  int? Code { get; set; }
        public int? Hours { get; set; }
        public List<int> InstructorsId { get; set; }
        public List<int> StudentsId { get; set; }
        public List<string> InstructorsName { get; set; }
        public List<string> StudentsName { get; set; }
    }
}