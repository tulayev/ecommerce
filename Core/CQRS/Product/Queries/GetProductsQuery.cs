﻿using Entities.DTOs;
using MediatR;

namespace Core.CQRS.Product.Queries
{
    public record GetProductsQuery() : IRequest<IReadOnlyList<ProductDto>>;
}
