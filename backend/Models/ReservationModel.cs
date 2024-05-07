namespace backend.Models
{
    public class ReservationModel
    {

            public int RoomId { get; set; }
            public string Username { get; set; } // Add this property to pass username
            public DateTime ReservationFrom { get; set; }
            public DateTime ReservationTo { get; set; }

            public bool CheckedOut { get; set;}
            public bool CheckedIn { get; set;}

        }
    }
