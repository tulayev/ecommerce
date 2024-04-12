using Core.CQRS.Cart.Queries;
using Entities;
using MediatR;
using StackExchange.Redis;
using System.Text.Json;

namespace Core.CQRS.Cart.Handlers
{
    public class GetCartHandler : IRequestHandler<GetCartQuery, CustomerCart>
    {
        private readonly IDatabase _database;

        public GetCartHandler(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<CustomerCart> Handle(GetCartQuery request, CancellationToken cancellationToken)
        {
            var data = await _database.StringGetAsync(request.CartId);

            return data.IsNullOrEmpty 
                ? null 
                : JsonSerializer.Deserialize<CustomerCart>(data);
        }
    }
}
