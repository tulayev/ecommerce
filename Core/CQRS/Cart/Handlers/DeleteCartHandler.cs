using Core.CQRS.Cart.Commands;
using MediatR;
using StackExchange.Redis;

namespace Core.CQRS.Cart.Handlers
{
    public class DeleteCartHandler : IRequestHandler<DeleteCartCommand, bool>
    {
        private readonly IDatabase _database;

        public DeleteCartHandler(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> Handle(DeleteCartCommand command, CancellationToken cancellationToken)
        {
            return await _database.KeyDeleteAsync(command.CartId);
        }
    }
}
