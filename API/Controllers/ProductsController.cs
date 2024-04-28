using API.Errors;
using Core.CQRS.Product.Queries;
using Core.CQRS.ProductBrand.Queries;
using Core.CQRS.ProductType.Queries;
using Core.Helpers;
using Entities;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController(IMediator mediator) : BaseApiController
    {
        private readonly IMediator _mediator = mediator;

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductDto>>> GetProducts([FromQuery] ProductQueryParams queryParams)
        {
            var totalItems = await _mediator.Send(new GetProductsCountQuery(queryParams));
            var data = await _mediator.Send(new GetProductsQuery(queryParams));

            return Ok(new Pagination<ProductDto>(queryParams.PageNumber, queryParams.PageSize, totalItems, data));
        }
        
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _mediator.Send(new GetProductQuery(id));
            
            if (product == null)
                return NotFound(new ApiResponse(404));
            
            return Ok(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _mediator.Send(new GetProductBrandsQuery()));
        }
        
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _mediator.Send(new GetProductTypesQuery()));
        }
    }
}
