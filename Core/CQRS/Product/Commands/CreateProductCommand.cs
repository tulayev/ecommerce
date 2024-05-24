using Entities.DTOs.Product;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Core.CQRS.Product.Commands
{
    public record CreateProductCommand(CreateProductDto CreateProductDto, IFormFile Image) : IRequest<ProductDto>;
}
