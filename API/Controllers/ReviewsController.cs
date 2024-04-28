using API.Errors;
using Core.CQRS.Review.Commands;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReviewsController : BaseApiController
    {
        private readonly IMediator _mediator;

        public ReviewsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult> PostReview(ReviewDto reviewDto)
        {
            var result = await _mediator.Send(new CreateReviewCommand(reviewDto, User));

            if (!result)
                return BadRequest(new ApiResponse(400, "Что-то пошло не так."));

            return Ok();
        }
    }
}
