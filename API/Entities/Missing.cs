using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entities
{
    public class Missing
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public string Gender { get; set; }
        public string Relations { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }
    }
}