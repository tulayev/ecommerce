namespace Entities.DTOs.Product
{
    public class CreateProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int ProductType { get; set; }
        public int ProductBrand { get; set; }
    }
}
