using System;

namespace API.DTOs
{
    public class MissingUpdateDto
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Gender { get; set; }
        public string Relations { get; set; }
    }
}