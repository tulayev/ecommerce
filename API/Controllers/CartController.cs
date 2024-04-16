using Core.CQRS.Cart.Commands;
using Core.CQRS.Cart.Queries;
using Entities;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly IMediator _mediator;

        public CartController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerCart>> GetCartById(string id)
        {
            var cart = await _mediator.Send(new GetCartQuery(id));

            return Ok(cart ?? new CustomerCart(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerCart>> UpdateCart(CustomerCartDto cart)
        {
            var updatedCart = await _mediator.Send(new UpdateCartCommand(cart));

            return Ok(updatedCart);
        }

        [HttpDelete]
        public async Task DeleteCart(string id)
        {
            await _mediator.Send(new DeleteCartCommand(id));
        }
    }
}
