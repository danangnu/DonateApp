using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class MissingDto
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public string Gender { get; set; }
        public string Relations { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}