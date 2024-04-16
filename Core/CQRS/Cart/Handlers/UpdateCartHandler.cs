using AutoMapper;
using Core.CQRS.Cart.Commands;
using Entities;
using MediatR;
using StackExchange.Redis;
using System.Text.Json;

namespace Core.CQRS.Cart.Handlers
{
    public class UpdateCartHandler : IRequestHandler<UpdateCartCommand, CustomerCart>
    {
        private readonly IDatabase _database;
        private readonly IMapper _mapper;

        public UpdateCartHandler(IConnectionMultiplexer redis, IMapper mapper)
        {
            _database = redis.GetDatabase();
            _mapper = mapper;
        }

        public async Task<CustomerCart> Handle(UpdateCartCommand command, CancellationToken cancellationToken)
        {
            var customerCart = _mapper.Map<CustomerCart>(command.CartDto);

            var created = await _database.StringSetAsync(
                customerCart.Id, 
                JsonSerializer.Serialize(customerCart),
                TimeSpan.FromDays(30)
            );

            if (!created)
                return null;

            var data = await _database.StringGetAsync(customerCart.Id);

            return data.IsNullOrEmpty
                ? null
                : JsonSerializer.Deserialize<CustomerCart>(data);
        }
    }
}
