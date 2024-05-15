using Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Policy = Constants.AdminPolicy)]
    public class DashboardController : BaseApiController
    {
        public ActionResult Test()
        {
            return Ok();
        }
    }
}
