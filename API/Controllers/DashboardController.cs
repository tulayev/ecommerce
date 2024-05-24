using API.Errors;
using Core.CQRS.Product.Commands;
using Core.CQRS.Product.Queries;
using Core.Helpers;
using Data;
using Entities.DTOs.Product;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Policy = Constants.AdminPolicy)]
    public class DashboardController : BaseApiController
    {
        private readonly IMediator _mediator;

        public DashboardController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("products")]
        public async Task<ActionResult<IReadOnlyList<ProductDto>>> GetProducts()
        {
            var products = await _mediator.Send(new GetProductsQuery(null));

            return Ok(products);
        }

        [HttpPost("products")]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromForm] CreateProductDto createProductDto, [FromForm] IFormFile image)
        {
            var product = await _mediator.Send(new CreateProductCommand(createProductDto, image));

            if (product is null)
                return BadRequest(new ApiResponse(400, "Что-то пошло не так."));

            return Ok(product);
        }
        
        [HttpDelete("products/{id}")]
        public async Task<ActionResult<ProductDto>> DeleteProduct(int id)
        {
            await _mediator.Send(new DeleteProductCommand(id));

            return NoContent();
        }
    }
}
