namespace Entities.DTOs
{
    public class ElasticProductDto
    {
        public int Id { get; set; }
        public ProductDto Product { get; set; }
        public IReadOnlyList<ReviewDto> Reviews { get; set; }
    }
}
