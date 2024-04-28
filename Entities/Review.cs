namespace Entities
{
    public class Review : BaseEntity
    {
        public string Body {  get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string AuthorId { get; set; }
        public AppUser Author { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
