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

        public UpdateCartHandler(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<CustomerCart> Handle(UpdateCartCommand command, CancellationToken cancellationToken)
        {
            var created = await _database.StringSetAsync(
                command.Cart.Id, 
                JsonSerializer.Serialize(command.Cart),
                TimeSpan.FromDays(30)
            );

            if (!created)
                return null;

            var data = await _database.StringGetAsync(command.Cart.Id);

            return data.IsNullOrEmpty
                ? null
                : JsonSerializer.Deserialize<CustomerCart>(data);
        }
    }
}
