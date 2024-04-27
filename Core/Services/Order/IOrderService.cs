using Entities.Orders;

namespace Core.Services.Order
{
    public interface IOrderService
    {
        Task<Entities.Orders.Order> CreateOrderAsync(string buyerEmail, int delieveryMethod, string basketId, Address shippingAddress);
        Task<IReadOnlyList<Entities.Orders.Order>> GetOrdersForUserAsync(string buyerEmail);
        Task<Entities.Orders.Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}
