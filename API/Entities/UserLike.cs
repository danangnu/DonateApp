namespace API.Entities
{
    public class UserLike
    {
        public AppUser SourceUser { get; set; }
        public int SourceUserId { get; set; }
        public Missing LikedMissing { get; set; }
        public int LikedMissingId { get; set; }
    }
}