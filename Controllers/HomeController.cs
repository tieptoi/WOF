using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WOF.Services;
using WOF.Models;
using Microsoft.Extensions.Logging;

namespace WOF.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _iLogger;
        private readonly IPrizeRepository _prizeRepository;

        public HomeController(IPrizeRepository prizeRepository, ILogger<HomeController> iLogger)
        {
            _prizeRepository = prizeRepository;
            _iLogger = iLogger;
        }

        // GET: Home
        public ActionResult Index()
        {
            //
            _iLogger.LogDebug("Testing NLogger");

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

    }
}