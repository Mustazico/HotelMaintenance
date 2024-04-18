using backend.Context;
using backend.Models;
using System.Linq;

using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class RoomController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RoomController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var rooms = _context.Room.ToList();
            return View(rooms);
        }
    }
}
