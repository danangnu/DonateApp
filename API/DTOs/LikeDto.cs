namespace API.DTOs
{
    public class LikeDto
    {
        public int Id { get; set; }
        public string LikeUsername { get; set; }
        public string LikeByUsername { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public int Age { get; set; }
        public string PhotoUrl { get; set; }
    }
}