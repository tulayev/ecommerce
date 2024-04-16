using API.Errors;
using Core.CQRS.Identity.Commands;
using Core.CQRS.Identity.Queries;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IMediator _mediator;

        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExists([FromQuery] string email)
        {
            return await _mediator.Send(new CheckEmailExistsQuery(email));
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _mediator.Send(new GetAuthorizedUserQuery(User));

            return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _mediator.Send(new LoginCommand(loginDto));

            if (user == null)
                return Unauthorized(new ApiResponse(401));

            return user;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExists(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(
                    new ApiValidationErrorResponse
                        { Errors = new[] { "Email адрес уже используется" } 
                    }
                );
            }

            var user = await _mediator.Send(new RegisterCommand(registerDto));

            if (user == null)
                return BadRequest(new ApiResponse(400));

            return user;
        }

        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            return await _mediator.Send(new GetUserAddressQuery(User));
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto addressDto)
        {
            var address = await _mediator.Send(new UpdateUserAddressCommand(User, addressDto));

            if (address == null)
                return BadRequest("Возникла ошибка при обновлении адреса");

            return Ok(address);
        }
    }
}
