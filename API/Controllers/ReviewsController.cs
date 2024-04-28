using API.Errors;
using Core.CQRS.Review.Commands;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ReviewsController : BaseApiController
    {
        private readonly IMediator _mediator;

        public ReviewsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<ReviewDto>> PostReview(ReviewDto reviewDto)
        {
            var review = await _mediator.Send(new CreateReviewCommand(reviewDto, User));

            if (review is null)
                return BadRequest(new ApiResponse(400, "Что-то пошло не так."));

            return Ok(review);
        }
    }
}
