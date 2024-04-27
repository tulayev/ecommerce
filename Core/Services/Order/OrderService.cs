using Core.Repositories;
using Entities.Orders;
using MediatR;
using Core.CQRS.Cart.Queries;
using Core.CQRS.Product.Queries;
using Core.CQRS.Cart.Commands;
using Microsoft.EntityFrameworkCore;

namespace Core.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly IMediator _mediator;
        private readonly IUnitOfWork _unitOfWork;
        
        public OrderService(IMediator mediator, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mediator = mediator;
        }

        public async Task<Entities.Orders.Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string cartId, Address shippingAddress)
        {
            var cart = await _mediator.Send(new GetCartQuery(cartId));

            var items = new List<OrderItem>();
            
            foreach (var item in cart.Items)
            {
                var productItem = await _mediator.Send(new GetProductQuery(item.Id));
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            var deliveryMethod = await _unitOfWork.GetQueryable<DeliveryMethod>()
                .FirstOrDefaultAsync(x => x.Id == deliveryMethodId);

            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // create order
            var order = new Entities.Orders.Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);
            await _unitOfWork.AddAsync(order);

            // save to db
            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch
            {
                return null;
            }

            // delete cart
            await _mediator.Send(new DeleteCartCommand(cartId));

            // return order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.GetQueryable<DeliveryMethod>().ToListAsync();
        }

        public async Task<Entities.Orders.Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            return await _unitOfWork.GetQueryable<Entities.Orders.Order>()
                .Include(x => x.OrderItems)
                .Include(x => x.DeliveryMethod)
                .FirstOrDefaultAsync(x => x.Id == id && x.BuyerEmail == buyerEmail);
        }

        public async Task<IReadOnlyList<Entities.Orders.Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            return await _unitOfWork.GetQueryable<Entities.Orders.Order>()
                .Where(x => x.BuyerEmail == buyerEmail)
                .Include(x => x.OrderItems)
                .Include(x => x.DeliveryMethod)
                .OrderByDescending(x => x.OrderDate)
                .ToListAsync();
        }
    }
}
