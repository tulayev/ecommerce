using Entities.DTOs;
using MediatR;
using System.Security.Claims;

namespace Core.CQRS.Review.Commands
{
    public record CreateReviewCommand(ReviewDto ReviewDto, ClaimsPrincipal User) : IRequest<ReviewDto>;
}
