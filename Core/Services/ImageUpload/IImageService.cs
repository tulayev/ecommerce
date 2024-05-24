using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Core.Services.ImageUpload
{
    public interface IImageService
    {
        Task<ImageUploadResult> UploadImage(IFormFile file);
        Task<DeletionResult> DeleteImage(string publicId);
    }
}
