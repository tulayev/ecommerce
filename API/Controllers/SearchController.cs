using Core.Services.ElasticSearch;
using Entities.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SearchController : BaseApiController
    {
        private readonly IElasticClientService _client;

        public SearchController(IElasticClientService client)
        {
            _client = client;
        }

        [HttpGet]
        public async Task<ActionResult> Search(string keyword)
        {
            var results = await _client.SearchAsync<ElasticProductDto>(keyword);

            return Ok(results.Documents.ToList());
        }
    }
}
