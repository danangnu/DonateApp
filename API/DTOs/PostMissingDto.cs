using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class PostMissingDto
    {
        [Required] public string LastName { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public DateTime DateOfBirth { get; set; }
        [Required] public int AppUserId { get; set; }
        [Required] public string Gender { get; set; }
        [Required] public string Relations { get; set; }
    }
}