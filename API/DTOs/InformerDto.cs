using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class InformerDto
    {
        public int Id { get; set; }
        public int Age { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}