namespace Entities
{
    public class Photo : BaseEntity
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
