namespace backend.Models
{
    public class Reservation
    {
        public int ReservationId { get; set; }
        public int RoomId { get; set; }
        public int UserId { get; set; }

        public DateTime ReservationMade { get; set; }
        public DateTime ReservationFrom { get; set;}
        public DateTime ReservationTo { get; set;}

        public bool CheckedIn { get; set; }
        public bool CheckedOut { get; set; }

    }
}
