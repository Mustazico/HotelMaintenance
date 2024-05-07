using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Context;

namespace backend.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class ReservationController : Controller
    {

        private readonly ApplicationDbContext _context;

        public ReservationController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("showAvailableRooms")]
        public IActionResult ShowAvailableRooms(DateTime reservationFrom, DateTime reservationTo)
        {
            try
            {
                var bookedRoomIds = _context.Reservation
                    .Where(r =>
                        (r.ReservationFrom <= reservationTo && r.ReservationTo >= reservationFrom))
                    .Select(r => r.RoomId)
                    .ToList();

                // Get all rooms that are not booked during the specified date range
                var availableRooms = _context.Room
                    .Where(room => !bookedRoomIds.Contains(room.RoomId))
                    .ToList();

                return Ok(availableRooms);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error getting available rooms: " + ex.Message);
            }
        }

        [HttpPost("reserveroom")]
        public IActionResult MakeReservation([FromBody] ReservationModel reservationModel)
        {
            //Check if user exists
            var user = _context.UserData.FirstOrDefault(u => u.Username == reservationModel.Username);
            if(user == null)
            {
                return BadRequest(new { message = "user does not exist" });
            }

            var newReservation = new Reservation
            {
                RoomId = reservationModel.RoomId,
                UserId = user.UserID,
                ReservationMade = DateTime.Now,
                ReservationFrom = reservationModel.ReservationFrom,
                ReservationTo = reservationModel.ReservationTo,
                CheckedIn = false,
                CheckedOut = false
            };

            _context.Reservation.Add(newReservation);
            _context.SaveChanges();

            return Ok(new { message = "Reservation created" });
        }
    }
}
