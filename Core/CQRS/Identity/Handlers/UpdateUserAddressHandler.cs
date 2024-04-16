using AutoMapper;
using Core.CQRS.Identity.Commands;
using Core.Extensions;
using Entities;
using Entities.DTOs;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Core.CQRS.Identity.Handlers
{
    public class UpdateUserAddressHandler : IRequestHandler<UpdateUserAddressCommand, AddressDto>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public UpdateUserAddressHandler(UserManager<AppUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<AddressDto> Handle(UpdateUserAddressCommand command, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddress(command.User);

            user.Address = _mapper.Map<AddressDto, Address>(command.AddressDto);

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return null;

            return _mapper.Map<AddressDto>(user.Address);
        }
    }
}
