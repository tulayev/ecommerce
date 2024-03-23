namespace Core.Repositories
{
    public interface IUnitOfWork
    {
        IQueryable<TEntity> GetQueryable<TEntity>() where TEntity : class;

        Task AddAsync<TEntity>(TEntity entity) where TEntity : class;
        
        Task AddRangeAsync<TEntity>(IEnumerable<TEntity> entities) where TEntity : class;

        void Delete<TEntity>(TEntity entity) where TEntity : class;

        void DeleteRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class;

        void DeleteRange<TEntity>(Func<TEntity, bool> predicate) where TEntity : class;

        Task SaveChangesAsync();
    }
}
