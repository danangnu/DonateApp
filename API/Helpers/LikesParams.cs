namespace API.Helpers
{
    public class LikesParams : PaginationParams
    {
        public int Id { get; set; }
        public string Predicate { get; set; }
    }
}