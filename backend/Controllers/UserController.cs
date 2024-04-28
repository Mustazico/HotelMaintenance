using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace backend.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpPost("registeruser")]
        public IActionResult RegisterUser([FromBody] LoginModel createUser)
        {
            var user = _context.UserData.FirstOrDefault(u => u.Username == createUser.Username);
            if(user != null)
            {
                return BadRequest(new { message = "This user already exists" });
            }

            var newUser = new UserData
            {
                Username = createUser.Username,
                Password = createUser.Password,
            };

            _context.UserData.Add(newUser);
            _context.SaveChanges();

            return Ok(new { username = newUser.Username });
        }

        [HttpPost("loginuser")]
        public IActionResult LoginUser([FromBody] LoginModel login)
        {
            if(ModelState.IsValid)
            {
                var user = _context.UserData.FirstOrDefault(u => u.Username == login.Username && u.Password == login.Password);

                if(user != null) {
                    return Ok(new { username = user.Username });
                }

                else
                {
                    return Unauthorized(new { message = "Username or password is incorrect" });
                }

            }
            return BadRequest();
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
