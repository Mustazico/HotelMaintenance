using backend.Context;
using backend.Models;
using System.Linq;

using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [Route("/api/[controller]")]
    [ApiController]
    public class RoomController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RoomController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Room>> GetAll()
        {
            return _context.Room.ToList();
        }

        //[HttpGet]
        //public IActionResult Index()
        //{
        //    var rooms = _context.Room.ToList();
        //    return View(rooms);
        //}
    }
}
