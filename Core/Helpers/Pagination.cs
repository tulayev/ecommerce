namespace Core.Helpers
{
    public record Pagination<T>(int PageNumber, int PageSize, int Count, IReadOnlyList<T> Data) where T : class;
}
