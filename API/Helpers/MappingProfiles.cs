using AutoMapper;
using Entities;
using Entities.DTOs;
using Entities.DTOs.Orders;
using Entities.DTOs.Product;
using Entities.Orders;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductDto>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.Photo.Url));
            
            CreateMap<Entities.Address, AddressDto>().ReverseMap();

            CreateMap<CustomerCartDto, CustomerCart>();
            
            CreateMap<Review, ReviewDto>()
                .ForMember(d => d.Author, o => o.MapFrom(s => s.Author.DisplayName));

            CreateMap<CartItemDto, CartItem>();

            CreateMap<AddressDto, Entities.Orders.Address>();
            
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
            
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl));
        }
    }
}
