using Data;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Repositories
{
    public class UnitOfWork(DataContext dataContext) : IUnitOfWork
    {
        private readonly DataContext _dataContext = dataContext;

        public IQueryable<TEntity> GetQueryable<TEntity>() where TEntity : BaseEntity
        {
            return _dataContext.Set<TEntity>();
        }

        public async Task AddAsync<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            await _dataContext.Set<TEntity>().AddAsync(entity);
        }

        public async Task AddRangeAsync<TEntity>(IEnumerable<TEntity> entities) where TEntity : BaseEntity
        {
            await _dataContext.Set<TEntity>().AddRangeAsync(entities);
        }

        public void Update<TEntity>(TEntity entity) where TEntity : BaseEntity 
        {
            _dataContext.Set<TEntity>().Attach(entity);
            _dataContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            _dataContext.Set<TEntity>().Remove(entity);
        }

        public void DeleteRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : BaseEntity
        {
            _dataContext.Set<TEntity>().RemoveRange(entities);
        }

        public void DeleteRange<TEntity>(Func<TEntity, bool> predicate) where TEntity : BaseEntity
        {
            _dataContext.Set<TEntity>().RemoveRange(_dataContext.Set<TEntity>().Where(predicate));
        }

        public async Task SaveChangesAsync()
        {
            await _dataContext.SaveChangesAsync();
        }
    }
}
