using Entities;

namespace Core.Repositories
{
    public interface IUnitOfWork
    {
        IQueryable<TEntity> GetQueryable<TEntity>() where TEntity : BaseEntity;

        Task AddAsync<TEntity>(TEntity entity) where TEntity : BaseEntity;
        
        Task AddRangeAsync<TEntity>(IEnumerable<TEntity> entities) where TEntity : BaseEntity;

        void Update<TEntity>(TEntity entity) where TEntity : BaseEntity;
        
        void Delete<TEntity>(TEntity entity) where TEntity : BaseEntity;

        void DeleteRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : BaseEntity;

        void DeleteRange<TEntity>(Func<TEntity, bool> predicate) where TEntity : BaseEntity;

        Task SaveChangesAsync();
    }
}
