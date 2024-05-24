using Core.CQRS.Product.Commands;
using Core.Repositories;
using Core.Services.ImageUpload;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Core.CQRS.Product.Handlers
{
    public class DeleteProductHandler : IRequestHandler<DeleteProductCommand, Unit>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IImageService _imageService;

        public DeleteProductHandler(IUnitOfWork unitOfWork, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
        }

        public async Task<Unit> Handle(DeleteProductCommand command, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.GetQueryable<Entities.Product>()
                .Include(x => x.Photo)
                .FirstOrDefaultAsync(x => x.Id == command.Id);

            _unitOfWork.Delete(product.Photo);

            if (!string.IsNullOrWhiteSpace(product.Photo.PublicId))
                await _imageService.DeleteImage(product.Photo.PublicId);

            _unitOfWork.Delete(product);
            
            await _unitOfWork.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
