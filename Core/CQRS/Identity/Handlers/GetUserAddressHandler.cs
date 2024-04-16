using AutoMapper;
using Core.CQRS.Identity.Queries;
using Core.Extensions;
using Entities;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Core.CQRS.Identity.Handlers
{
    public class GetUserAddressHandler : IRequestHandler<GetUserAddressQuery, AddressDto>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public GetUserAddressHandler(UserManager<AppUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<AddressDto> Handle(GetUserAddressQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddress(request.User);

            return _mapper.Map<Address, AddressDto>(user.Address);
        }
    }
}
